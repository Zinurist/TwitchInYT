chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id || !tab.url) return;

  const url = new URL(tab.url);
  const isYoutube = url.hostname === 'youtube.com' || url.hostname.endsWith('.youtube.com');
  if (!isYoutube) return;

  await chrome.tabs.sendMessage(tab.id, {
    type: 'toggle-saved-chat',
  });
});
