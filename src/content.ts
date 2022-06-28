import { setDocumentBackgroundColorByHost } from './app/utils';

console.info('content executed!');

chrome.storage.sync.get('colors', ({ colors }) => {
  setDocumentBackgroundColorByHost(colors, window.location.host);
});
