export const applyPageBackgroundColorFromStorage = () => {
  chrome.storage.sync.get('color', ({ color }) => {
    if (color) {
      document.body.style.backgroundColor = color;
    }
  });
};
