# Application Idea

We believe that the world is missing an application focusing on only doing things with friends, an application that excites people to start sustained, meaningful activities that can be developed into hobbies.

From high level point of view, the application enables everyone to:

- Discover casual & nearby activities
  - Map View helps user to browse the map and see nearby activities intuitively
  - Activity feed serves personalized activities organized by topics
  - Invitation to join an activity as a great way to break the ice
- Broadcast activities - a novel and meaningful way to interact
  - Engage friends in a meaningful way
  - Discover trends, activities happening right now
- Be part of a vibrant community built on trust. Trust elements:
  - Public chat room for an activity
  - User reviews
  - Private activity that product members data and member access (Request/Invite)

[DEMO](https://xd.adobe.com/view/862012d4-22c8-470c-55f2-2493c932db92-f011/?fullscreen)

[Publised Expo App](https://expo.io/@camcanh/actify)

## Architectures

This is a React Application written in Typescrypt. State management is managed using [Mobx library](https://mobx.js.org/). For navigation, [React Navigation](https://reactnavigation.org/docs/en/api-reference.html) is exploied. This app also leverage [Firebase](https://firebase.google.com) for NoSQL data storages, object storage, and authentication services.

This project was bootstrapped with [CRNA - Create React Native App](https://github.com/react-community/create-react-native-app). For a deepdive into the application set up and integration, please read the CRNA documentation and Expo [documentation](https://expo.io).

## Codebase structure

```
src
|-- `App.tsx` is the entry to the application where all code pieces are wired
|-- `assets` directory contains static resources: .e.g. images, font
|-- `components` directory contains reusable component across multiple screen
|-- `data` directory contains static data for the applicatio: .e.g. list of topics...
|-- `datastore` directory contains Mobx State Stores that produce observable entities
|-- `navigation` directory contains the core set up of the application navigation logics (stack, tab, switch,...) where all screens are wired
|-- `screens` directory contains all the screens of the application surfaced to user
|-- `services` directory contains code for external services like authentication, database, file upload...
|-- `theme.ts` defines the theme of the application .e.g. background color, primary color
|-- `types` directory contains custom typescript definition files
```

## Available Scripts

### `yarn start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

### `yarn lint`

Run linting and execute fix if possible based on linting rule.

### `yarn prettier`

Format the code base for consistency
