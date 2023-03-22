import { galleryFetch } from './galley-news-fetch';

const searchForm = document.querySelector(".search-form");
const newsGalleryLnk = document.querySelector(".news-gallery");

//news-gallery
/*
<form class="search-form">
      <input
        class="search-input"
        type="text"
        name="search_input"
        id="for_search"
        placeholder="Search |"
      />
      <button
        class="btn-reset search-btn-icon show-search-input-btn"
        type="button"
      ></button>
      <button
        class="btn-reset search-btn-icon search-btn hide"
        type="submit"
      ></button>
    </form>
*/

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
    await console.log(dataResponse);
}