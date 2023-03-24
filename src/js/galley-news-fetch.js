const axios = require('axios').default;
//https://api.nytimes.com/svc/search/v2/articlesearch.json?q=panther&api-key=r45Ed0pk3C31WWBJaP0BSBDVSCCTnWUR

const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=';
const KEY = 'r45Ed0pk3C31WWBJaP0BSBDVSCCTnWUR';
const BASE_POPULAR_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${KEY}`;
//https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=r45Ed0pk3C31WWBJaP0BSBDVSCCTnWUR
//https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=r45Ed0pk3C31WWBJaP0BSBDVSCCTnWUR

let PER_PAGE = 40;

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