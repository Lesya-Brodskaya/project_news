
import { getLocalStorageItem, setLocalStorageItem } from "./storage";

const NEW_KEY_READ = 'read';
const KEY_COLLECTION = 'collection';

export function markAsRead (e) {
  if (!e.target.matches('.news-gallery__read-more')) return;
  
  let card = e.target.closest('.news-gallery__item');
  let id = card.dataset.id;
  let readItems = getLocalStorageItem(NEW_KEY_READ) || [];
  let date = format(Date.now(), 'MM/dd/yyyy');

  if (readItems.some(obj => obj.date === date && obj.collection.some(card => card.id === id))) {
    return;
  }

  const readCard = getLocalStorageItem(KEY_COLLECTION).find(obj => obj.id === id);
  
  if (readItems.some(obj => obj.date === date)) {
    const obj = readItems.find(obj => obj.date === date);
    obj.collection.push(readCard); 
    setLocalStorageItem(NEW_KEY_READ, readItems.sort((objA,objB) => new Date(objB.date) - new Date(objA.date)));
  } else {
    readItems.push({date:date, collection: [readCard]});
    setLocalStorageItem(NEW_KEY_READ, readItems.sort((objA,objB) => new Date(objB.date) - new Date(objA.date)));
  }
};
