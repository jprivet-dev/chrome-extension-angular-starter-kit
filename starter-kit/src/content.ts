console.log('content works!');

chrome.storage.sync.get('borderColor', ({ borderColor }) => {
  console.log('apply borderColor', borderColor);
  document.body.style.border = borderColor ? `5px solid ${borderColor}` : '';
});
