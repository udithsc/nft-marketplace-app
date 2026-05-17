# NFT Marketplace App

An Expo React Native demo app for browsing NFT marketplace listings, viewing item details, saving favorites, exploring creator profiles, and testing demo bid flows.

## Stack

- Expo SDK 55
- React 19.2.0
- React Native 0.83.6
- React Navigation 7
- Expo Updates / EAS Update
- React Native Web

## Requirements

- Node.js 20 or newer
- npm 10 or newer
- Expo Go 55 for device testing
- Android Studio / emulator or Xcode / simulator for local native testing
- Expo account for EAS Update publishing

## Setup

Install dependencies:

```bash
npm install
```

Start Expo with a clean Metro cache:

```bash
npm run start:clear
```

Then choose a target from the Expo terminal UI, or run one of these commands:

```bash
npm run web
npm run android
npm run ios
```

The web app usually opens at:

```txt
http://localhost:8081
```

## Available Scripts

- `npm start` starts the Expo development server
- `npm run start:clear` starts Expo and clears the Metro cache
- `npm run web` starts the app in a browser
- `npm run android` opens the app on Android
- `npm run ios` opens the app on iOS
- `npm run doctor` checks Expo SDK dependency compatibility
- `npm run prebuild` generates native Android/iOS project files when needed

## Recent Changes

- Fixed web mouse-wheel scrolling on the home screen by using a web-specific `ScrollView` path while keeping `FlatList` for native platforms.
- Aligned dependencies with Expo SDK 55 to fix Android bundling errors from incompatible React Native packages.
- Added EAS Update configuration in `app.json`, including `runtimeVersion`, updates URL, and EAS project ID.
- Added `eas.json` build profiles for `development`, `preview`, and `production` channels.

## Expo Go Notes

This project targets Expo SDK 55, so Expo Go 55 is recommended. If an emulator or device has an older Expo Go version, Expo may prompt to install the matching version before launching the app.

If Android bundling fails after dependency changes, restart Metro with:

```bash
npm run start:clear
```

## Publishing With EAS Update

Classic `expo publish` URLs are no longer the recommended flow for current Expo SDK projects. This app is configured for EAS Update.

Log in to Expo:

```bash
npx eas-cli@latest login
```

Check or initialize EAS config:

```bash
npx eas-cli@latest update:configure
```

Publish an update to the preview channel:

```bash
npx eas-cli@latest update --channel preview --message "Initial preview update" --environment preview
```

Publish to production:

```bash
npx eas-cli@latest update --channel production --message "Production update" --environment production
```

After publishing, Expo prints a dashboard link. Use that page to open the update, share a QR code, or test it in Expo Go.

## Build Profiles

The EAS profiles are defined in `eas.json`:

- `development` creates an internal development-client build on the `development` channel
- `preview` creates an internal preview build on the `preview` channel
- `production` creates a production build on the `production` channel and auto-increments the app version

Create a preview build:

```bash
npx eas-cli@latest build --profile preview --platform android
```

Create a production build:

```bash
npx eas-cli@latest build --profile production --platform all
```

## Verification

Run the Expo compatibility check:

```bash
npm run doctor
```

Expected result:

```txt
18/18 checks passed. No issues detected!
```

You can also verify the Android bundle through the running Metro server after starting Expo:

```bash
curl -L "http://localhost:8081/node_modules/expo/AppEntry.bundle?platform=android&dev=true&hot=false&lazy=true&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable" -o /tmp/nft-marketplace-android.bundle
```

## Troubleshooting

If scrolling does not work on web, hard refresh the browser after restarting Metro. The home screen uses a web-specific scroll container because Expo Web disables body scrolling by default.

If you see React Native codegen errors such as `Unable to determine event arguments for "onModeChange"`, check dependency compatibility:

```bash
npm run doctor
```

Then install SDK-compatible packages:

```bash
npx expo install --check
```

If Metro reports stale SHA-1 or missing file errors after changing dependencies, stop the Expo server and restart with:

```bash
npm run start:clear
```
