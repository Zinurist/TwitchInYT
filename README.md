# Twitch Chat for YouTube - Local

> **About this version:** This extension was created with AI, using an existing published extension as a functional reference — most likely [Twitch Chat for YouTube™](https://chromewebstore.google.com/detail/twitch-chat-for-youtube/dclboeblcnmjpihibhhkmbbdkiaalofl), though I'm not certain which one it was. The goal was to have my own local copy where **I control the code and any updates**, rather than depending on a Web Store extension that can auto-update at any time. For security, I'd recommend anyone using a small utility extension like this do the same: keep a local, unpacked copy you can read and update yourself.

A local, unpacked Chrome extension that replaces YouTube live chat with a Twitch chat iframe for YouTube channels you save.

This version does not use the Chrome Web Store, does not include an `update_url`, and does not fetch channel mappings from GitHub at runtime.

## Install

1. Open Chrome.
2. Go to `chrome://extensions`.
3. Enable `Developer mode` in the top-right corner.
4. Click `Load unpacked`.
5. Select this folder: `/home/zinu/Projects/TwitchInYT`.

Chrome will load the local extension. Because it is unpacked and has no `update_url`, it will not auto-update from the Chrome Web Store.

## Use

1. Open a YouTube live page that has a chat panel.
2. Click the extension icon.
3. Enter the Twitch username for that YouTube channel.
4. The mapping is saved locally.
5. Future visits to that saved YouTube channel replace chat automatically.
6. Click the extension icon again on a saved channel to clear the saved mapping and reload the page.

## Edit Channel Mappings

Edit `DEFAULT_CHANNEL_MAP` in `src/content.js`.

Example:

```js
const DEFAULT_CHANNEL_MAP = {
  linustechtips: 'linustech',
  myyoutubehandle: 'mytwitchusername',
};
```

After editing, go to `chrome://extensions` and click the reload button on the extension card.

## Permissions

- `activeTab`: allows the extension icon click to affect the current tab.
- `storage`: saves Twitch usernames you choose for YouTube channels.

The content script runs on YouTube pages so saved mappings can load automatically. There is no cookie permission and no remote code loading.
