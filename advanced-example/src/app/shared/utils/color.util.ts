import { AppliedColor } from '../color.model';
import { getHostFromTab } from './tabs.util';
import Tab = chrome.tabs.Tab;

export const getAppliedColorHexByTab = (
  appliedColors: AppliedColor[] = [],
  tab: Tab
): string => {
  const appliedColor = getAppliedColorByHost(
    appliedColors,
    getHostFromTab(tab)
  );
  return appliedColor.length ? appliedColor[0].color : '';
};

export const getAppliedColorHexByHost = (
  appliedColors: AppliedColor[] = [],
  host: string
): string => {
  const appliedColor = getAppliedColorByHost(appliedColors, host);
  return appliedColor.length ? appliedColor[0].color : '';
};

export const getAppliedColorByHost = (
  appliedColors: AppliedColor[] = [],
  host: string
): AppliedColor[] => {
  return appliedColors.filter((c) => getHostFromTab(c.tab) === host);
};

export const addAppliedColorByHost = (
  appliedColor: AppliedColor[] = [],
  tab: Tab,
  color: string
): AppliedColor[] => {
  return [...appliedColor, { tab, color }];
};

export const updateAppliedColorByTab = (
  appliedColors: AppliedColor[] = [],
  tab: Tab,
  color: string
): AppliedColor[] => {
  return [
    ...appliedColors.filter(
      (c) => getHostFromTab(c.tab) !== getHostFromTab(tab)
    ),
    { tab, color },
  ];
};

export const setAppliedColorByTab = (
  appliedColors: AppliedColor[] = [],
  tab: Tab,
  color: string
): AppliedColor[] => {
  return getAppliedColorHexByTab(appliedColors, tab)
    ? updateAppliedColorByTab(appliedColors, tab, color)
    : addAppliedColorByHost(appliedColors, tab, color);
};

export const removeAppliedColorByTab = (
  appliedColors: AppliedColor[] = [],
  tab: Tab
): AppliedColor[] => {
  return [
    ...appliedColors.filter(
      (c) => getHostFromTab(c.tab) !== getHostFromTab(tab)
    ),
  ];
};
