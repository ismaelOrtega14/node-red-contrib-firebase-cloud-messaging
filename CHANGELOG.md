# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0]

### Added

-   Posibility to add a data object as indicated in [firebase documentation](https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages?hl=es-419#Message)
-   Now you can define in `msg.firebaseMessage` the message to send to firebase overriding the custom node attributes in the edit dialog.

### Changed

-   Greatly improvement of edit dialog format
    -   Reorganiced form in groups that can be hidden. Everithing is prepared to add more easily in the future if needed.
    -   Added more help tests
-   Improvements of the properties value usage to be more dinamical being able to add more in the future easily.

## [1.0.5]

### Added

-   Error output and improved error management

## [1.0.4]

### Fixed

-   Documentation due to node id change

## [1.0.3]

### Fixed

-   Error log when firebase responds with other status code than 200

## [1.0.2]

### Added

-   Checked with node v14 and updated workflow to test in that version

### Fixed

-   Examples error due to node id change

## [1.0.1]

### Changed

-   Moved custom node to Network section
-   Updated custom node id

### Fixed

-   Proxy working error

## [1.0.0]

### Added

-   Inital version
