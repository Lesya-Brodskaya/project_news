import { galleryFetch } from './galley-news-fetch';
import { galleryFetchPopular } from './galley-news-fetch';
import { startWeatherWidget } from './weather-widget';

const searchForm = document.querySelector('.search-form');
const newsGalleryLnk = document.querySelector('.news-gallery');

let imageURL =
  'https://www.nytimes.com/images/2015/03/14/arts/16iht-rartsquare-2/16iht-rartsquare-2-watch308.jpg';
const nytURL = 'https://www.nytimes.com/';

let currentPage = 1;
let currentHits = 0;
let globalSearchQuery = '';

searchForm.addEventListener('submit', onSearchBtn);
newsGalleryLnk.innerHTML = '';

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
  } catch (e) {
    console.log(e.message);
  }
}

async function renderData(articles) {
  newsGalleryLnk.innerHTML = '';
  if (articles.length === 0) return;
  try {
    const galleryMurkup = await readDataArrayToMarcup(articles);
    newsGalleryLnk.insertAdjacentHTML('beforeend', galleryMurkup);
  } catch (e) {
    console.log(e.message);
  }
}

async function readDataArrayToMarcup(articlesArray) {
  //abstract, headline, keywords, multimedia, pub_date, snippet, web_url
  //      <!--p class="news-gallery__snippet">${snippet}</p-->
  return await articlesArray
    .map(({ abstract, headline, keywords, multimedia, pub_date, web_url }) => {
      const keywordsMap = keywords
        .map(({ value }) => {
          return value;
        })
        .join(', ');

      const firstImageUrl = multimedia.map(url => {
        return url;
      });
      if (firstImageUrl.length !== 0) imageURL = nytURL + firstImageUrl[0].url;

      return newsCardMarkup(
        web_url,
        imageURL,
        keywordsMap,
        headline.main,
        abstract,
        pub_date
      );
    })
    .join('');
}

//headline.main
function newsCardMarkup(
  web_url,
  imageURL,
  keywordsMap,
  headline,
  abstract,
  pub_date
) {
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

async function onLoadNewsPage() {
  newsGalleryLnk.innerHTML = '';
  try {
    await startWeatherWidget();
  } catch (e) {
    console.log(e.message);
  }
  try {
    const dataResponse = await galleryFetchPopular(currentPage);
    console.log('dataResponse ', dataResponse);
    newsGalleryLnk.insertAdjacentHTML(
      'beforeend',
      popularArticlesMarkup(dataResponse)
    );
  } catch (e) {
    console.log(e.message);
  }
}

function popularArticlesMarkup(dataResponse) {
  return dataResponse
    .map(
      ({
        abstract,
        adx_keywords,
        media,
        title,
        url,
        published_date,
        updated,
      }) => {
        console.log();

        let imgUrl = '';
        try {
          imgUrl = String(Object(media[0])['media-metadata'][2].url);
        } catch (e) {
          console.log(e.message);
        }

        return newsCardMarkup(
          url,
          imgUrl,
          adx_keywords,
          title,
          abstract,
          updated
        );
      }
    )
    .join('');
}
