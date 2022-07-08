import { ColorData } from '../color.model';
import { getColorTextByHost } from './color.util';

export const setDocumentBorderColorByHost = (
  colors: ColorData[] = [],
  host: string
): void => {
  const color = getColorTextByHost(colors, host);
  document.body.style.border = color ? `5px solid ${color}` : '';
};
