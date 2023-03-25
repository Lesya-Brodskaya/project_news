
import { getLocalStorageItem, setLocalStorageItem } from "./storage";
//import { newsCardMarkup } from "./gallery-news-render";
//const markup = newsCardMarkup(web_url, imageURL, keywordsMap, headline, abstract, pub_date, section);
//const gallery = document.querySelector('.news-gallery__read-more')
const NEW_KEY_READ = 'read';
const KEY_COLLECTION = 'collection';
//gallery.addEventListener('click', markAsRead)
export function markAsRead (e) {
  if (!e.target.matches('.news-gallery__read-more')) return;
  
    let card = e.target.closest('.news-gallery__item');
    if (!card) return;
  let id = card.web_url;;
  let readItems = getLocalStorageItem(NEW_KEY_READ) || [];
  let date = format(Date.now(), 'MM/dd/yyyy');

  if (readItems.some(obj => obj.date === date && obj.collection.some(card => card.id=== id))) {
    return;
  }

  const readCard = getLocalStorageItem(KEY_COLLECTION).find(obj => obj.id=== id);
  
  if (readItems.some(obj => obj.date === date)) {
    const obj = readItems.find(obj => obj.date === date);
    obj.collection.push(readCard); 
    setLocalStorageItem(NEW_KEY_READ, readItems.sort((objA,objB) => new Date(objB.date) - new Date(objA.date)));
  } else {
    readItems.push({date:date, collection: [readCard]});
    setLocalStorageItem(NEW_KEY_READ, readItems.sort((objA,objB) => new Date(objB.date) - new Date(objA.date)));
  }
};


