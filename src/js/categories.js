const categories = [
  {
    "section": "admin",
    "display_name": "Admin"
  },
  {
    "section": "arts",
    "display_name": "Arts"
  },
  {
    "section": "automobiles",
    "display_name": "Automobiles"
  },
  {
    "section": "books",
    "display_name": "Books"
  },
  {
    "section": "briefing",
    "display_name": "Briefing"
  },
  {
    "section": "business",
    "display_name": "Business"
  },
  {
    "section": "climate",
    "display_name": "Climate"
  },
  {
    "section": "corrections",
    "display_name": "Corrections"
  },
  {
    "section": "crosswords & games",
    "display_name": "Crosswords & Games"
  },
  {
    "section": "education",
    "display_name": "Education"
  },
  {
    "section": "en español",
    "display_name": "En Español"
  },
  {
    "section": "fashion",
    "display_name": "Fashion"
  },
  {
    "section": "food",
    "display_name": "Food"
  },
  {
    "section": "guides",
    "display_name": "Guides"
  },
  {
    "section": "health",
    "display_name": "Health"
  },
  {
    "section": "home & garden",
    "display_name": "Home & Garden"
  },
  {
    "section": "home page",
    "display_name": "Home Page"
  },
  {
    "section": "job market",
    "display_name": "Job Market"
  },
  {
    "section": "lens",
    "display_name": "Lens"
  },
  {
    "section": "magazine",
    "display_name": "Magazine"
  },
  {
    "section": "movies",
    "display_name": "Movies"
  },
  {
    "section": "multimedia/photos",
    "display_name": "Multimedia/Photos"
  },
  {
    "section": "new york",
    "display_name": "New York"
  },
  {
    "section": "obituaries",
    "display_name": "Obituaries"
  },
  {
    "section": "opinion",
    "display_name": "Opinion"
  },
  {
    "section": "parenting",
    "display_name": "Parenting"
  },
  {
    "section": "podcasts",
    "display_name": "Podcasts"
  },
  {
    "section": "reader center",
    "display_name": "Reader Center"
  },
  {
    "section": "real estate",
    "display_name": "Real Estate"
  },
  {
    "section": "science",
    "display_name": "Science"
  },
  {
    "section": "smarter living",
    "display_name": "Smarter Living"
  },
  {
    "section": "sports",
    "display_name": "Sports"
  },
  {
    "section": "style",
    "display_name": "Style"
  },
  {
    "section": "sunday review",
    "display_name": "Sunday Review"
  },
  {
    "section": "t brand",
    "display_name": "T Brand"
  },
  {
    "section": "t magazine",
    "display_name": "T Magazine"
  },
  {
    "section": "technology",
    "display_name": "Technology"
  },
  {
    "section": "the learning network",
    "display_name": "The Learning Network"
  },
  {
    "section": "the upshot",
    "display_name": "The Upshot"
  },
  {
    "section": "the weekly",
    "display_name": "The Weekly"
  },
  {
    "section": "theater",
    "display_name": "Theater"
  },
  {
    "section": "times insider",
    "display_name": "Times Insider"
  },
  {
    "section": "today’s paper",
    "display_name": "Today’s Paper"
  },
  {
    "section": "travel",
    "display_name": "Travel"
  },
  {
    "section": "u.s.",
    "display_name": "U.S."
  },
  {
    "section": "universal",
    "display_name": "Universal"
  },
  {
    "section": "video",
    "display_name": "Video"
  },
  {
    "section": "well",
    "display_name": "Well"
  },
  {
    "section": "world",
    "display_name": "World"
  },
  {
    "section": "your money",
    "display_name": "Your Money"
  }
]

let categBtnNum = [];
let dropListCategNum = [];

const categBtnWrapper = document.querySelector(".categories-btn-wrapper");
const dropDownWrapper = document.querySelector('.drop-down-wrapper');
// const dropDownList = document.querySelector('.drop-down-list');
const otherSpan = document.querySelector('.others-span');

window.addEventListener('resize', onWindowSizeChange);

function onWindowSizeChange() {
  categBtnWrapper.innerHTML = "";
  if (window.innerWidth < 768) {
    otherSpan.textContent = "Categories";
    } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      otherSpan.textContent = "Others"
      categBtnNum = categories.slice(0, 4);
      let btnCategoryMarkup = [];
      for (let i = 0; i <= categBtnNum.length; i += 1) {
        btnCategoryMarkup = categBtnNum.map(category => {
          return `<div class = "btn-wrapper"><button class="filter-category__item-bt">${category.display_name}</button><div>`
        }).join('');
        categBtnWrapper.innerHTML = btnCategoryMarkup;
        console.log(categBtnWrapper);
      // categBtnNum.forEach(category => {
      //   const button = document.createElement('button');
      //   button.classList.add('filter-category__item-bt');
      //   button.textContent = category.display_name;
      //   console.log(button.textContent);
      //   categBtnWrapper.appendChild(button);
      //   console.log(categBtnWrapper);
      // });

      // dropListCategNum = categories.slice(4, 49);
      // dropListCategNum.forEach(category => {
      //   const dropDownListBtn = document.createElement('button');
      //   dropDownListBtn.classList.add('drop-down-list-btn');
      //   dropDownListBtn.textContent = category.display_name;
      //   dropDownWrapper.appendChild(dropDownListBtn);
      // });
      // return dropDownWrapper, categBtnWrapper;
      };
      return;
    } else if  (window.innerWidth >= 1280) {
      otherSpan.textContent = "Others"
      categBtnNum = categories.slice(0, 6);
      let btnCategoryMarkup = [];
      for (let i = 0; i <= categBtnNum.length; i += 1) {
        btnCategoryMarkup = categBtnNum.map(category => {
          return `<div class = "btn-wrapper"><button class="filter-category__item-bt">${category.display_name}</button><div>`
        }).join('');
        categBtnWrapper.innerHTML = btnCategoryMarkup;
        console.log(categBtnWrapper);
    };
    return;
  }

}

categBtnWrapper.addEventListener('click', onButtonCategClick);

function onButtonCategClick(e) {
  if(e.target.nodeName !== 'BUTTON') {
    return;
  }
  // console.log(e.target);
  const currentActBtn = document.querySelector('.filter-category__item-bt--active');
  console.log(currentActBtn);

  if(currentActBtn) {
    currentActBtn.classList.remove('filter-category__item-bt--active');
  };
  
  const nextActBtn = e.target;
  console.log(nextActBtn);
  nextActBtn.classList.add('filter-category__item-bt--active');
}
