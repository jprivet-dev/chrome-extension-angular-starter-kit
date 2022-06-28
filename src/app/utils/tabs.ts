import Tab = chrome.tabs.Tab;

export const getHostFromTab = (tab: Tab): string => {
  if (!tab.url) {
    throw new Error('The tab has no URL.');
  }

  return new URL(tab.url).host;
};
