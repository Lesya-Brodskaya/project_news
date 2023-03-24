import { galleryFetch } from './galley-news-fetch';
import { galleryFetchPopular } from './galley-news-fetch';
export { creatCardMarkup };
  
const searchForm = document.querySelector(".search-form");
const newsGalleryLnk = document.querySelector(".news-gallery");

let currentPage = 1;
let currentHits = 0;
let globalSearchQuery = '';

searchForm.addEventListener('submit', onSearchBtn);

function onSearchBtn(e) { 
    e.preventDefault();
    let currentPage = 1;
    //let currentHits = 0;
    newsGalleryLnk.innerHTML = '';
    
    const {
    elements: { search_input },
  } = e.currentTarget;

    globalSearchQuery = search_input.value.trim();
    
    if (globalSearchQuery.length === 0) return;
    //console.log(globalSearchQuery);

    operateDataBackEnd(globalSearchQuery, currentPage);
}

async function operateDataBackEnd(searchQuery, searchPage) { 
  try { 
    const data = await galleryFetch(searchQuery, searchPage);
    await renderData(data);
  }
  catch (e) { 
   console.log(e.message);
  }
}

async function renderData(dataResponse) { 
   console.log(dataResponse);  
  const articles = dataResponse.docs;
  await console.log(articles);
  newsGalleryLnk.innerHTML = '';
  if (articles.length === 0) return;
  try { 
    const galleryMurkup = await readDataArrayToMarcup(articles);
    newsGalleryLnk.insertAdjacentHTML('beforeend', galleryMurkup);
  }
  catch (e) { 
    console.log(e.message);
  }
}


// async function readDataArrayToMarcup(articlesArray) {
//   return await articlesArray.map(({ abstract, headline, keywords, multimedia, pub_date, snippet, web_url }) => {
//     const firstImageUrl = multimedia.map((url) => { return url; })[0];
//     console.log(firstImageUrl);
//     const imageURL = "./src/images/mob/not-found-m.png";//multimedia[0];
//     //if (multimedia.length !== 0) imagwURL = firstImageUrl;
//     console.log(keywords);
//     console.log(headline);
//     const keywordsMap = keywords.map(({ value }) => { return value; }).join(', ');
//     console.log(keywordsMap);
//     return `
//     <div class="news-gallery__item">
//     <a class="news-gallery__image" href="${web_url}">
//     <div class="news-gallery__img-container"><img src="${imageURL}"
//     alt="${keywordsMap}" loading="lazy"/></div>
//     </a>
//     <div class="news-gallery__info">
//       <p class="news-gallery__header">${headline.main}</p>
//       <p class="news-gallery__abstract">${abstract}</p>
//       <p class="news-gallery__pub_data">${pub_date}</p>
//       <!--p class="news-gallery__snippet">${snippet}</p-->
//     </div>
//     <a class="news-gallery__read-more" href="${web_url}">Read more...</a>
//     </div>
//     `;
//   }).join('');
// }


async function creatCardMarkup(el) {
  return await el.map(({ abstract, title, url, published_date, image_url, section, id }) => {
    const flags = checkRead(el);
    return `<li class="box-news__item ${
    flags.read ? 'show' : ''
  }" data-id="${id}"><p class="box-news__section">${section}</p>
          <div class="box-news___wrap-reading">
            <span class="box-news__reading">Alredy read</span>
            <svg class="icon" width="18" height="18">
              <use href="#icon-check"></use>
            </svg> 
          </div>
          <button class="box-news__favorite-btn ${flags.fav ? 'favorite' : ''}">
              <p class="box-news__favorite-p"> ${
                flags.fav ? 'Remove from Favorite' : 'Add to Favorite'
              }</p>
              <svg class="box-news__favorite-svg" width="16" height="16"">
                <use href="#icon-heart"></use>
              </svg>
            </button>
          <article>
            <div class="box-news__thumb">
              <img class="box-news__img" src="${image_url}" loading="lazy" alt="${section}" width='440'/>
            </div>
          <div class="box-news__wrap-title">
            <h2 class="box-news__titel">
              ${title}
            </h2>
          </div>
          <div class="box-news__wrap-text">
            <p class="box-news__text">
              ${
                abstract.length > 120
                  ? abstract.slice(0, 110) + '...'
                  : abstract
              }
            </p>
          </div>
          <div class="box-news__wrap">
            <p class="box-news__data">${published_date}</p>
            <a href="${url}" class="box-news__link" target="_blank" rel="noopener noreferrer nofollow">Read more</a>
          </div>
          </article>
          <div class="overlay"></div></li>`;
  }).join('');
};