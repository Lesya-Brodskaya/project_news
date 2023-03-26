const axios = require('axios').default;

const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=';
const KEY = 'r45Ed0pk3C31WWBJaP0BSBDVSCCTnWUR';
//https://api.nytimes.com/svc/search/v2/articlesearch.json?q=panther&api-key=r45Ed0pk3C31WWBJaP0BSBDVSCCTnWUR

const BASE_POPULAR_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${KEY}`;
//https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=r45Ed0pk3C31WWBJaP0BSBDVSCCTnWUR
//https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=r45Ed0pk3C31WWBJaP0BSBDVSCCTnWUR

const CATEGORIES = `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${KEY}`;


let PER_PAGE = 40;
// Доступ до бекенду за пошуком.
export async function galleryFetch(queryLine, currentPage) {
    let queryURL = `${BASE_URL}${queryLine}&api-key=${KEY}`;
    return (accessFetch(queryURL)).response;
}

// Доступ до бекенду "популярних"
export async function galleryFetchPopular(currentPage) {
    let queryURL = BASE_POPULAR_URL;
    return (accessFetch(queryURL)).results;
}

// Доступ до новин за категоріями
export async function galleryFetchCategories(currentPage) { 
    let queryURL = CATEGORIES;
    return accessFetch(queryURL);
}

// Доступ до бекенду як такий
async function accessFetch(queryURL) { 
      try {
    let response = await axios.get(queryURL);
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
}

/*
export async function galleryFetch(queryLine, currentPage) { 

    try {
        let response = await axios.get(`${BASE_URL}${queryLine}&api-key=${KEY}`);

        return response.data.response;
    }
    catch (e) { 
        console.log(e.message);
    }

}

export async function galleryFetchPopular(currentPage) { 

    try {
        let response = await axios.get(BASE_POPULAR_URL);
        return response.data.results;
    }
    catch (e) { 
        console.log(e.message);
    }

}
*/