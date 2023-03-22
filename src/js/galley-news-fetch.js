const axios = require('axios').default;
//https://api.nytimes.com/svc/search/v2/articlesearch.json?q=panther&api-key=r45Ed0pk3C31WWBJaP0BSBDVSCCTnWUR

const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=';
const KEY = 'r45Ed0pk3C31WWBJaP0BSBDVSCCTnWUR';
let PER_PAGE = 40;

export async function galleryFetch(queryLine, currentPage) { 

    try {
        let response = await axios.get(`${BASE_URL}${queryLine}&api-key=${KEY}`);
        /*axios.get(
            `${BASE_URL}${KEY}`, {
                params: {
                    q: `${queryLine}`,
                    //orientation: `horizontal`,
                    //image_type: `photo`,                    
                    //page: currentPage,
                    //per_page: PER_PAGE,
                    //safesearch: `true`,
                }
            }
        ); */
        return response.data;
    }
    catch (e) { 
        console.log(e.message);
    }

}