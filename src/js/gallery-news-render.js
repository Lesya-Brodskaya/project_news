import { galleryFetch } from './galley-news-fetch';

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


async function readDataArrayToMarcup(articlesArray) {
  return await articlesArray.map(({ abstract, headline, keywords, multimedia, pub_date, snippet, web_url }) => { 
    const firstImageUrl = multimedia.map((url) => { return url; })[0];
    console.log(firstImageUrl);
    const imageURL = "./src/images/mob/not-found-m.png";//multimedia[0];     
    //if (multimedia.length !== 0) imagwURL = firstImageUrl;
    console.log(keywords);
    console.log(headline);
    const keywordsMap = keywords.map(({ value }) => { return value; }).join(', ');
    console.log(keywordsMap);
    return `
    <div class="news-gallery__item">
    <a class="news-gallery__image" href="${web_url}">
    <div class="news-gallery__img-container"><img src="${imageURL}" 
    alt="${keywordsMap}" loading="lazy"/></div>
    </a>
    <div class="news-gallery__info">
      <p class="news-gallery__header">${headline.main}</p>
      <p class="news-gallery__abstract">${abstract}</p>
      <p class="news-gallery__pub_data">${pub_date}</p>
      <!--p class="news-gallery__snippet">${snippet}</p-->
    </div>
    <a class="news-gallery__read-more" href="${web_url}">Read more...</a>
    </div>
    `; 
  }).join('');
}
/*
export async function readDataArrayToMarcup(hitsArray) {
  //previewURL
  return await hitsArray
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class="gallery__item" href="${largeImageURL}"><div class="photo-card">
  <div class="photo-container"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></div>
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div></a>`;
      }
    )
    .join('');
}

*/