import { STORAGE_COLORS } from './app/shared/storage.constant';
import { setDocumentBackgroundColorByHost } from './app/shared/utils';

console.info('content executed!');

chrome.storage.sync.get(STORAGE_COLORS, ({ colors }) => {
  setDocumentBackgroundColorByHost(colors, window.location.host);
});
