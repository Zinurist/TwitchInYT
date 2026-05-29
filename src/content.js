(() => {
  const DEFAULT_CHANNEL_MAP = {
    tockerslol: 'tockerslol',
    oquequehouve: 'brtt',
    rangerlol: 'rangerlol1',
    cblol: 'cblol',
    arthurlanches: 'arthur_lanches',
    baianotv1: 'baiano',
    cazetv: 'cazetv_',
    inteligencialtda: 'inteligencialimitada',
    linustechtips: 'linustech',
    eslcs: 'eslcs',
    blastpremier: 'blastpremier',
    pgl: 'pgl',
  };

  const TWITCH_USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,25}$/;
  const DOUBLE_CLICK_WINDOW_MS = 2000;

  function getYoutubeChannelName() {
    const selectors = [
      'ytd-video-owner-renderer a[href^="/@"]',
      'ytd-video-owner-renderer a[href*="youtube.com/@"]',
      'ytd-watch-metadata a[href^="/@"]',
      'ytd-watch-metadata a[href*="youtube.com/@"]',
    ];

    for (const selector of selectors) {
      const anchor = document.querySelector(selector);
      if (!anchor) continue;

      const handle = anchor.getAttribute('href') || anchor.href;
      const match = handle.match(/\/@([^/?#]+)/);
      if (match) return match[1].toLowerCase();
    }

    return null;
  }

  function getChatContainer() {
    return document.querySelector('ytd-live-chat-frame');
  }

  function getVideoHeight() {
    return document.querySelector('video')?.clientHeight || 600;
  }

  function isDarkMode() {
    const rootElement = document.documentElement;
    const appElement = document.querySelector('ytd-app');

    return (
      rootElement.hasAttribute('dark') ||
      rootElement.getAttribute('system-icons') === 'true' ||
      appElement?.hasAttribute('dark') ||
      document.body.classList.contains('dark') ||
      window.matchMedia?.('(prefers-color-scheme: dark)').matches
    );
  }

  function getTwitchChatUrl(username) {
    const parent = encodeURIComponent(window.location.hostname);
    const theme = isDarkMode() ? 'darkpopout&' : '';

    return `https://www.twitch.tv/embed/${username}/chat?${theme}parent=${parent}`;
  }

  function storageGet(key) {
    return chrome.storage.local.get(key).then((result) => result[key]);
  }

  function storageSet(values) {
    return chrome.storage.local.set(values);
  }

  function promptForTwitchUsername(existingUsername) {
    const value = window.prompt(
      'Enter the Twitch username to show on this YouTube page:',
      existingUsername || ''
    );

    if (value === null) return null;

    const username = value.trim();
    if (!TWITCH_USERNAME_PATTERN.test(username)) {
      window.alert('Invalid Twitch username. Use 3-25 letters, numbers, or underscores.');
      return null;
    }

    return username;
  }

  function showTwitchChat(username) {
    const chatContainer = getChatContainer();
    if (!chatContainer) {
      window.alert('Could not find YouTube live chat on this page.');
      return;
    }

    const iframe = document.createElement('iframe');
    iframe.id = 'local-twitch-chat-for-youtube';
    iframe.src = getTwitchChatUrl(username);
    iframe.title = `Twitch chat for ${username}`;
    iframe.style.border = '0';
    iframe.style.flex = '1 1 auto';
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    chatContainer.replaceChildren(iframe);
    chatContainer.style.display = 'flex';
    chatContainer.style.flexDirection = 'row';
    chatContainer.style.height = `${getVideoHeight()}px`;
  }

  async function run() {
    const youtubeChannelName = getYoutubeChannelName();
    if (!youtubeChannelName) {
      window.alert('Could not detect the YouTube channel handle on this page.');
      return;
    }

    const now = Date.now();
    const lastClick = Number(await storageGet('__lastClickTimestamp')) || 0;
    await storageSet({ __lastClickTimestamp: now });

    const storedUsername = await storageGet(youtubeChannelName);
    const defaultUsername = DEFAULT_CHANNEL_MAP[youtubeChannelName];
    let username = storedUsername || defaultUsername;

    if (now - lastClick < DOUBLE_CLICK_WINDOW_MS || !username) {
      const promptedUsername = promptForTwitchUsername(username);
      if (!promptedUsername) return;

      username = promptedUsername;
      await storageSet({ [youtubeChannelName]: username });
    }

    showTwitchChat(username);
  }

  run().catch((error) => {
    console.error('Twitch Chat for YouTube - Local failed:', error);
    window.alert('Failed to load Twitch chat. Check the console for details.');
  });
})();
