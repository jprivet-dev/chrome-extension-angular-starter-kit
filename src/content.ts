import { setDocumentBackgroundColorByHost } from './app/shared/utils';

console.info('content executed!');

chrome.storage.sync.get('colors', ({ colors }) => {
  setDocumentBackgroundColorByHost(colors, window.location.host);
});
