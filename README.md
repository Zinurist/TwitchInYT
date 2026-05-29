# Twitch Chat for YouTube - Local

A local, unpacked Chrome extension that replaces YouTube live chat with a Twitch chat iframe when you click the extension icon.

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
3. If the YouTube channel is in the built-in mapping, Twitch chat loads automatically.
4. If no mapping exists, enter the Twitch username when prompted.
5. Click the icon twice within 2 seconds to change the saved Twitch username for that YouTube channel.

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

- `activeTab`: allows the extension to work only on the tab where you click the icon.
- `scripting`: injects the local content script after you click the icon.
- `storage`: saves Twitch usernames you choose for YouTube channels.

There are no broad host permissions, no cookie permission, and no remote code loading.
