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
    const dataToSave = JSON.stringify(value);
    localStorage.setItem(key, dataToSave);
  } catch (error) {
    console.error(`Error setting ${key} in local storage: ${error}`);
  }
    localStorage.setItem('readingNews');
};


function getReadingNewsFromStorage() {
  return JSON.parse(localStorage.getItem('readingNews'));
}

function addReadingNewsToStorage(item) {
  const addNews = item;
  addNews.date = new Date().toLocaleDateString();
  let readingNews = getReadingNewsFromStorage();

  if (readingNews === null) {
    readingNews = [addNews];
  } else {
    readingNews.push(addNews);
  }
  setLocalStorageItem('readingNews', readingNews);
}

function getReadingNewsDates() {
  let readingNews = getReadingNewsFromStorage();
  let arrDate = [];

  for (let news of readingNews) {
    if (!arrDate.includes(news.date)) {
      arrDate.push(news.date);
    }
  }
  return arrDate;
}

function getNewsByDate(date) {
  let readingNews = getReadingNewsFromStorage();
  return readingNews.filter((news) => news.date === date);
}

export { getNewsByDate , getReadingNewsFromStorage, getReadingNewsDates, addReadingNewsToStorage}