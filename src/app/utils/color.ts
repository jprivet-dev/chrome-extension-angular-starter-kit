export const applyPageBackgroundColorFromStorage = () => {
  chrome.storage.sync.get('color', ({ color }) => {
    document.body.style.backgroundColor = color ?? '';
  });
};
