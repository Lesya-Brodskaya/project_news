import { galleryFetch } from './galley-news-fetch';
import { galleryFetchPopular } from './galley-news-fetch';

const searchForm = document.querySelector(".search-form");
const newsGalleryLnk = document.querySelector(".news-gallery");

let imageURL = "https://www.nytimes.com/images/2015/03/14/arts/16iht-rartsquare-2/16iht-rartsquare-2-watch308.jpg";
const nytURL = "https://www.nytimes.com/";

let currentPage = 1;
let currentHits = 0;
let globalSearchQuery = '';

searchForm.addEventListener('submit', onSearchBtn);
onLoadNewsPage();

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
    operateDataBackEnd(globalSearchQuery, currentPage);
}

async function operateDataBackEnd(searchQuery, searchPage) { 
  try { 
    const data = await galleryFetch(searchQuery, searchPage);
    await renderData(data.docs);
  }
  catch (e) { 
   console.log(e.message);
  }
}

async function renderData(articles) { 

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
  //abstract, headline, keywords, multimedia, pub_date, snippet, web_url
  //      <!--p class="news-gallery__snippet">${snippet}</p-->
  return await articlesArray.map(({ abstract, headline, keywords, multimedia, pub_date, web_url }) =>
  { 
    const keywordsMap = keywords.map(({ value }) => { return value; }).join(', ');

    const firstImageUrl = multimedia.map((url) => { return url; });    
      if (firstImageUrl.length !== 0) imageURL = nytURL + firstImageUrl[0].url;
    
    return newsCardMarcup(web_url, imageURL, keywordsMap, headline.main, abstract, pub_date, web_url); 
  }).join('');
}

//headline.main
function newsCardMarcup(web_url, imageURL, keywordsMap, headline, abstract, pub_date, web_url) { 
  return `
    <div class="news-gallery__item">
    <a class="news-gallery__image" href="${web_url}">
    <div class="news-gallery__img-container"><img src="${imageURL}" 
    alt="${keywordsMap}" loading="lazy"/></div>
    </a>
    <div class="news-gallery__info">
      <p class="news-gallery__header">${headline}</p>
      <p class="news-gallery__abstract">${abstract}</p>
      <p class="news-gallery__pub_data">${pub_date}</p>
    </div>
    <a class="news-gallery__read-more" href="${web_url}">Read more...</a>
    </div>
    `;
}

/*
const cardNews = { img: null, title: null, description: null, id: null}
*/
/*
popularNews.map (news => { return {img: news.media[0], title: news.title }})
*/
async function onLoadNewsPage() { 
  try { 
    newsGalleryLnk.innerHTML = '';
    const dataResponse = await galleryFetchPopular(currentPage);
    console.log(dataResponse);
    //abstract, headline, keywords, multimedia, pub_date, web_url
    //headline.main
    /*
    abstract, adx_keywords, media, per_facet, 
      media[0].url
      per_facet.title,
      per_facet.url
    */
    const popularArticlesArr = dataResponse.map(({ abstract, adx_keywords, media, per_facet }) => {
      console.log();
      console.log("abstract", abstract);
      console.log("adx_keywords", adx_keywords);
      console.log("media", media);
      console.log("per_facet", per_facet);
      console.log();
      //console.log("media[0].url", media[0].url);
      //console.log("per_facet.title", per_facet.title);
      //console.log("per_facet.url", per_facet.url);
      return;
    });
  }
  catch (e) { 
    console.log(e.message);
  }
}