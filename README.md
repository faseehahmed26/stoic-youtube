# Stoic YouTube

Stoic YouTube is a small browser extension for making YouTube more intentional. V1 removes Shorts and blanks the homepage feed so YouTube starts from search instead of recommendations.

## What V1 Does

- Redirects YouTube Shorts URLs away from `/shorts/...`.
- Hides Shorts shelves, navigation entries, chips, and video cards.
- Hides the YouTube homepage feed and shows a simple reminder to search intentionally.
- Re-runs automatically as YouTube changes pages without a full reload.
- Works without a build step or package install.

## Browser Support

Desktop browsers:

- Chrome
- Brave
- Edge
- Arc
- Firefox

Mobile web:

- Firefox Android is the best target because it supports extensions.
- Chrome Android and Brave Android generally do not support custom unpacked extensions.
- iPhone support is out of scope for v1 because Safari extensions use a different packaging and distribution flow.

The native YouTube mobile app is not supported.

## Install For Chromium Browsers

Use this for Chrome, Brave, Edge, or Arc on desktop.

1. Open `chrome://extensions`.
2. Enable `Developer mode`.
3. Click `Load unpacked`.
4. Select this project folder.
5. Open `https://www.youtube.com` and browse normally.

Brave, Edge, and Arc use similar extension pages:

- Brave: `brave://extensions`
- Edge: `edge://extensions`
- Arc: `arc://extensions`

## Install For Firefox Desktop

1. Open `about:debugging#/runtime/this-firefox`.
2. Click `Load Temporary Add-on`.
3. Select `manifest.json` from this project.
4. Open `https://www.youtube.com`.

Temporary Firefox add-ons are removed when Firefox restarts.

## Install For Firefox Android

Firefox Android extension development is more limited than desktop. For v1, treat Android as experimental.

The simplest path is to test on Firefox desktop first, then package/sign the extension through Mozilla if you want normal installation on Firefox Android later.

## Future Modes

The code is organized around filters so future versions can add:

- Education-only mode.
- Entertainment-content hiding.
- Settings to toggle each mode on or off.
