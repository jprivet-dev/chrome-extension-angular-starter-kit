import { STORAGE_COLORS } from './app/shared/storage.constant';
import { setDocumentBorderColorByHost } from './app/shared/utils';

console.info('content executed!');

chrome.storage.sync.get(STORAGE_COLORS, ({ colors }) => {
  setDocumentBorderColorByHost(colors, window.location.host);
});
