import { Capacitor } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";

const isNative = Capacitor.isNativePlatform();

// SET
export const setItem = async (key, value) => {
  if (isNative) {
    await Preferences.set({ key, value });
  } else {
    localStorage.setItem(key, value);
  }
};

// GET
export const getItem = async (key) => {
  if (isNative) {
    const { value } = await Preferences.get({ key });
    return value;
  } else {
    return localStorage.getItem(key);
  }
};

// REMOVE
export const removeItem = async (key) => {
  if (isNative) {
    await Preferences.remove({ key });
  } else {
    localStorage.removeItem(key);
  }
};

// CLEAR
export const clearStorage = async () => {
  if (isNative) {
    await Preferences.clear();
  } else {
    localStorage.clear();
  }
};
