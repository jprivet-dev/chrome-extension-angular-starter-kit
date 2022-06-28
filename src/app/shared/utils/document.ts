import { ColorData } from '../color.model';
import { getColorTextByHost } from './color';

export const setDocumentBackgroundColorByHost = (
  colors: ColorData[] = [],
  host: string
): void => {
  const color = getColorTextByHost(colors, host);

  color
    ? setDocumentBackgroundColor(color)
    : removeDocumentBackgroundColorIfAlreadyExist();
};

export const setDocumentBackgroundColor = (color: string): void => {
  document.body.style.backgroundColor = color;
};

export const removeDocumentBackgroundColorIfAlreadyExist = (): void => {
  if (document.body.style.backgroundColor) {
    document.body.style.backgroundColor = '';
  }
};
