import Tab = chrome.tabs.Tab;

export const getCurrentTab = async (): Promise<Tab> => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tab;
};

export const getUrlFromTab = (tab: Tab): URL => {
  if (!tab.url) {
    throw new Error('The tab has no URL.');
  }

  return new URL(tab.url);
};

export const getHostFromTab = (tab: Tab): string => {
  return getUrlFromTab(tab).host;
};
