import { ColorData } from '../color.model';

export const getColorTextByHost = (
  colors: ColorData[] = [],
  host: string
): string => {
  const colorData = getColorByHost(colors, host);
  return colorData.length ? colorData[0].color : '';
};

export const getColorByHost = (
  colors: ColorData[] = [],
  host: string
): ColorData[] => {
  return colors.filter((c) => c.host === host);
};

export const addColorByHost = (
  colors: ColorData[] = [],
  host: string,
  url: string,
  color: string
): ColorData[] => {
  return [...colors, { host, url, color }];
};

export const updateColorByHost = (
  colors: ColorData[] = [],
  host: string,
  url: string,
  color: string
): ColorData[] => {
  return [...colors.filter((c) => c.host !== host), { host, url, color }];
};

export const setColorByHost = (
  colors: ColorData[] = [],
  host: string,
  url: string,
  color: string
): ColorData[] => {
  return getColorByHost(colors, host)
    ? updateColorByHost(colors, host, url, color)
    : addColorByHost(colors, host, url, color);
};

export const removeColorByHost = (
  colors: ColorData[] = [],
  host: string
): ColorData[] => {
  return [...colors.filter((c) => c.host !== host)];
};
