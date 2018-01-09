import pubSub from '@google-cloud/pubsub';
import { isString } from 'lodash';
import { each } from 'bluebird';
import logger from 'lib/logger';

let pubsubClient = null;

const getPubsubClient = async () => {
  if (pubsubClient !== null) {
    return pubsubClient;
  }
  pubsubClient = await pubSub({
    keyFilename: process.env.GOOGLECLOUD_PUBSUB_KEY_FILENAME,
    projectId: process.env.GOOGLECLOUD_PROJECT
  });
  return pubsubClient;
};

const SUBSCRIPTION_NAME = 'll_subscription';

let pubsubSubscriptions = [];

export const publish = async ({
  queueName,
  payload
}, done) => {
  try {
    const client = await getPubsubClient();

    const topic = client.topic(queueName);
    if (!(await topic.exists())) {
      await topic.create();
    }
    const publisher = topic.publisher();

    await publisher.publish(Buffer.from(JSON.stringify(payload), 'utf8'));
  } catch (err) {
    done(err);
  }
  done(null);
};

const sendDeadLetter = ({ queueName, deadLetter }) => async (data) => {
  let deadLetterFullName;
  if (!deadLetter) {
    return;
  }

  if (isString(deadLetter)) {
    deadLetterFullName = deadLetter;
  } else {
    deadLetterFullName = `${queueName}_DEADLETTER`;
  }

  const client = await getPubsubClient();
  const topic = client.topic(deadLetterFullName);

  if (!(await topic.exists())) {
    await topic.create();
  }
  const publisher = topic.publisher();

  await publisher.publish(data);
};

export const subscribe = async ({
  queueName,
  handler,
  onProcessed = () => {},
  deadLetter
}, done) => {
  const client = await getPubsubClient();
  const topic = client.topic(queueName);
  if (!(await topic.exists())[0]) {
    await topic.create();
  }
  const subscription = topic.subscription(`${queueName}_${SUBSCRIPTION_NAME}`);
  if (!(await subscription.exists())[0]) {
    await subscription.create();
    pubsubSubscriptions.push(subscription);
  }

  subscription.on('error', (err, data) => {
    logger.error('PUBSUB subscription', err);
    sendDeadLetter({
      queueName,
      deadLetter
    })(data);
  });

  const handlerWithProccessed = (data, processedDone) => {
    const jsonData = JSON.parse(data.toString('utf8'));
    const res = handler(jsonData, processedDone);
    onProcessed({ // sqs-consumer format
      Body: JSON.stringify(jsonData)
    });
    return res;
  };

  const messageDone = message => async (err) => {
    if (err && deadLetter) {
      await sendDeadLetter({ queueName, deadLetter })(message.data);
      message.ack();
      return;
    } else if (err) {
      message.nack(err);
      return;
    }

    message.ack();
  };

  subscription.on('message', (message) => {
    handlerWithProccessed(message.data, messageDone(message));
  });
  return done(null);
};

// For testing
export const unsubscribeAll = async () => {
  await each(pubsubSubscriptions, subscription =>
    subscription.close()
  );
  pubsubSubscriptions = [];
};