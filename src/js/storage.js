//const setLocalStorageItem = (key, value) => {
//  try {
//   const dataToSave = {
//      date: new Date().toLocaleDateString(),
//      value: value,
//    };
//    localStorage.setItem(key, JSON.stringify(dataToSave));
//  } catch (error) {
//    console.error(`Error setting ${key} in local storage: ${error}`);
//  }
//};
// const getLocalStorageItem = (key, date = null) => {
// try {
//    const data = localStorage.getItem(key);
//    if (!data) {
//      return;
//    }
//    const parsedData = JSON.parse(data);
//    if (!parsedData.hasOwnProperty('value')) {
//      return;
//    }
//    if (date !== null) {
//      const filteredData = parsedData.value.filter((item) => item.date === date);
//      return filteredData;
//    }
//    return parsedData.value;
//  } catch (error) {
//    console.error(`Error getting ${key} from local storage: ${error}`);
//    return null;
//  }
//};
const setLocalStorageItem = (key, value) => {
  try {
    const datatoSave = JSON.stringify(value);
    if (key) {
      localStorage.setItem(key, datatoSave);
    }
  } catch (error) {
    console.error('Error setting ${key} in local storage: ${error}')
  }
};

const getLocalStorageItem = key => {
  try {
    if (key) {
      const datatoSave = localStorage.getItem(key);
      return datatoSave ? JSON.parse(datatoSave) : [];
    }
  } catch (error) {
    console.error('Error getting ${key} from local storage: ${error}');
  }
};

export {
  getLocalStorageItem,
  setLocalStorageItem
}