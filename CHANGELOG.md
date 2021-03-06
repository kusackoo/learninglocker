Format based on [Keep a Changelog](http://keepachangelog.com/)

## [unreleased]
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
### Migrations

## [2.1.3] - 2018-01-15
### Added
  - Ensures `timestamp` and `stored` are selected over `statement.timestamp` and `statement.stored` in parsed queries

## [2.1.2] - 2018-01-02
### Fixed
  - `GOOGLE_ENABLED` .env value no longer compiled into API build and can be updated in the .env, followed by a restart of the API
  - Better error handling in migrations
  - Missing icons in Safari and Edge

## [2.1.1] - 2017-12-19
### Fixed
  - Arrays in statement API response were being converted to keys

## [2.1.0] - 2017-11-23
### Added
  - Migration funcionality ([#LL-395](https://ht2labs.myjetbrains.com/youtrack/issue/LL-395))
  - Can now set the max times statement forwarding will retry.
  - Legend added to X vs Y charts ([#LL-322](https://ht2labs.myjetbrains.com/youtrack/issue/LL-322))
  - Prevents deleting a role if assigned to a user, added error alerts ([#LL-353](https://ht2labs.myjetbrains.com/youtrack/issue/LL-353))
  - User integration tests
### Fixed
 - Client auth not working with some APIs ([#LL-367](https://ht2labs.myjetbrains.com/youtrack/issue/LL-367))
### Changed
 - Only allow sensible combinations of roles

## [2.0.7] - 2017-11-08
### Fixes
 - Couldn't see some visualisations when printing


## [2.0.6] - 2017-10-26
### Security
  - Ensure all dashboards can load ([#LL-423](https://ht2labs.myjetbrains.com/youtrack/issue/LL-423))


## [2.0.5] - 2017-10-23
### Security
  - Non super admin users unable to create new organisation ([#LL-415](https://ht2labs.myjetbrains.com/youtrack/issue/LL-415))
  - Clients with appropriate scopes could not request certain models
  - Clients without appropriate scopes can no longer see certain models
  - Prevent admins of one organisation amending anothers


## [2.0.4] - 2017-10-12
### Added
### Changed
### Deprecated
### Removed
### Fixed
  - Statement forwarding queries not matching. ([#LL-414](https://ht2labs.myjetbrains.com/youtrack/issue/LL-414))
### Security
### Migrations

## [2.0.3] - 2017-10-11
### Added
### Changed
### Deprecated
### Removed
### Fixed
  - Repeating failed requests. ([#LL-411](https://ht2labs.myjetbrains.com/youtrack/issue/LL-411))
  - Not being able to delete the last model ([#LL-412](https://ht2labs.myjetbrains.com/youtrack/issue/LL-412))
  - 404 errors being displayed globally ([#LL-413](https://ht2labs.myjetbrains.com/youtrack/issue/LL-413))
  - Returning aggregations results as a string
### Security
### Migrations

## [2.0.2] - 2017-10-03
### Added
  - Legend added to X vs Y charts ([#LL-322](https://ht2labs.myjetbrains.com/youtrack/issue/LL-322))
  - Prevents deleting a role if assigned to a user, added error alerts ([#LL-353](https://ht2labs.myjetbrains.com/youtrack/issue/LL-353))
### Changed
 - Require submit to apply changes from advanced query editor
 - Tidy up unused variables in .env.example
### Deprecated
### Removed
### Fixed
 - Allowed statement forwarding to follow redirects
 - Statement forwarding menu item displaying incorrectly
 - Client auth not working with some APIs
### Security
 - If a request returns unauthorised the current user will be logged out
### Migrations

## [2.0.1] - 2017-09-25
### Added
### Changed
### Deprecated
### Removed
### Fixed
 - Adds VERSION file
### Security
### Migrations
