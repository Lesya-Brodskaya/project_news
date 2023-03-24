const setLocalStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting ${key} in local storage: ${error}`);
  }
};

const getLocalStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting ${key} from local storage: ${error}`);
    return defaultValue;
  }
};

export { setLocalStorageItem, getLocalStorageItem }