import { galleryFetch } from './galley-news-fetch';
import { galleryFetchPopular } from './galley-news-fetch';

const searchForm = document.querySelector(".search-form");
const newsGalleryLnk = document.querySelector(".news-gallery");

let currentPage = 1;
let currentHits = 0;
let globalSearchQuery = '';

searchForm.addEventListener('submit', onSearchBtn);
onLoadNewsPage();

async function onLoadNewsPage() { 
  try { 
    newsGalleryLnk.innerHTML = '';
    const dataResponse = await galleryFetchPopular(currentPage);
    console.log(dataResponse.data.results);
  }
  catch (e) { 
    console.log(e.message);
  }
}

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
   //console.log(dataResponse);  
  const articles = dataResponse.docs;
   //console.log(articles);

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
    const firstImageUrl = multimedia.map((url) => { return url; });
    //console.log("firstUrl", firstImageUrl[0].url);

    let imageURL = "https://www.nytimes.com/images/2015/03/14/arts/16iht-rartsquare-2/16iht-rartsquare-2-watch308.jpg"; //"./src/images/mob/not-found-m.png";
      if (multimedia.length !== 0) imageURL = "https://www.nytimes.com/" + firstImageUrl[0].url;//articlesArray[0].multimedia[0].url;//firstImageUrl;
    //console.log(web_url);
    //console.log(imageURL);
    const keywordsMap = keywords.map(({ value }) => { return value; }).join(', ');
    //console.log(keywordsMap);
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