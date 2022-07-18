import { AppliedColor } from '../color.model';
import { getAppliedColorHexByHost } from './color.util';

export const setDocumentBorderColorByHost = (
  appliedColors: AppliedColor[] = [],
  host: string
): void => {
  const color = getAppliedColorHexByHost(appliedColors, host);
  document.body.style.border = color ? `5px solid ${color}` : '';
};
