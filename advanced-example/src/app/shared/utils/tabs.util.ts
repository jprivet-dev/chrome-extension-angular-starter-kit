import Tab = chrome.tabs.Tab;

export const getCurrentTab = async (): Promise<Tab> => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tab;
};

export const getHostFromTabUrl = (tab: Tab): string => {
  if (!tab.url) {
    throw new Error('The tab has no URL.');
  }

  return new URL(tab.url).host;
};
