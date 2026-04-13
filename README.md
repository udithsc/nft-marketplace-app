# NFT Marketplace App

This is an Expo React Native app for browsing NFT marketplace listings.

## Requirements

- Node.js 20 or newer
- npm 10 or newer
- Expo Go on a device, or an Android/iOS simulator for local testing

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the Expo development server:

```bash
npm start
```

3. Run the app on a specific platform if needed:

```bash
npm run web
npm run android
npm run ios
```

## Available Scripts

- `npm start` starts the Expo dev server
- `npm run web` starts the app in the browser
- `npm run android` opens the app on Android
- `npm run ios` opens the app on iOS
- `npm run prebuild` generates native projects when needed

## Project Stack

- Expo SDK 55
- React 19
- React Native 0.83
- React Navigation 7

## Verification

The project was verified with:

```bash
npx expo-doctor
npx expo export --platform web
```

Both checks completed successfully after the dependency upgrade.

## Notes

- If port `8081` is already in use, Expo will prompt to use another port.
- If you change native dependencies later, run `npm run prebuild` before building native apps locally.
