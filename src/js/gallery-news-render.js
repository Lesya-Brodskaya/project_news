import { galleryFetch } from './galley-news-fetch';

const searchForm = document.querySelector(".news-search-form");
const newsGalleryLnk = document.querySelector(".news-gallery");

//news-gallery

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
    elements: { searchQuery },
  } = e.currentTarget;

    globalSearchQuery = searchQuery.value.trim();
    
    if (globalSearchQuery.length === 0) return;
    console.log(globalSearchQuery);

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
    await console.log(dataResponse);
}