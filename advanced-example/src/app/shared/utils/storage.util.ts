import { AppliedColor } from '../color.model';
import {
  STORAGE_APPLIED_COLORS,
  STORAGE_PRESET_COLORS,
} from '../storage.constant';

export const getPresetColorsFromStorage = async (): Promise<string[]> => {
  const { presetColors } = await chrome.storage.sync.get(STORAGE_PRESET_COLORS);
  return presetColors;
};

export const setPresetColorsInStorage = async (
  presetColors: string[]
): Promise<void> => {
  return chrome.storage.sync.set({ [STORAGE_PRESET_COLORS]: presetColors });
};

export const onChangedPresetColorsInStorage = async (callback: {
  (presetColors: string[]): void;
}): Promise<void> => {
  chrome.storage.onChanged.addListener((changes) => {
    if (STORAGE_PRESET_COLORS in changes) {
      callback(changes[STORAGE_PRESET_COLORS].newValue);
    }
  });
};

export const getAppliedColorsFromStorage = async (): Promise<
  AppliedColor[]
> => {
  const { appliedColors } = await chrome.storage.sync.get(
    STORAGE_APPLIED_COLORS
  );
  return appliedColors;
};

export const setAppliedColorsInStorage = async (
  appliedColors: AppliedColor[]
): Promise<void> => {
  return chrome.storage.sync.set({ [STORAGE_APPLIED_COLORS]: appliedColors });
};

export const onChangedAppliedColorsInStorage = async (callback: {
  (appliedColors: AppliedColor[]): void;
}): Promise<void> => {
  chrome.storage.onChanged.addListener((changes) => {
    if (STORAGE_APPLIED_COLORS in changes) {
      callback(changes[STORAGE_APPLIED_COLORS].newValue);
    }
  });
};
