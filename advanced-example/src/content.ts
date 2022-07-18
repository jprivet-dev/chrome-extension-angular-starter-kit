import {
  getAppliedColorsFromStorage,
  onChangedAppliedColorsInStorage,
  setDocumentBorderColorByHost,
} from './app/shared/utils';

console.info('content works!');

const host = window.location.host;

getAppliedColorsFromStorage().then((appliedColors) => {
  setDocumentBorderColorByHost(appliedColors, host);
});

onChangedAppliedColorsInStorage((appliedColors) => {
  setDocumentBorderColorByHost(appliedColors, host);
});
