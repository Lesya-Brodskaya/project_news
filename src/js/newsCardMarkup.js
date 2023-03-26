//Уніфікована розмітка однієї картки новини
export function newsCardMarkup(
  web_url,
  imageURL,
  keywordsMap,
  headline,
  abstract,
  pub_date,
  section,
  published_date
) {
  if (!imageURL) {
    imageURL =
      'https://www.politico.com/dims4/default/b07a49c/2147483647/strip/true/crop/1160x773+0+0/resize/1290x860!/format/webp/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2F8c%2F18%2F7fb9b88e4e588a4cc84bb8da9bbf%2F200613-nyt-getty-773.jpg';
  }
  return `<div class="news-gallery__item">
    <div class="news-gallery__img-container"><img src="${imageURL}" 
    alt="${keywordsMap}" loading="lazy" /><p class="news-gallery__img-container-label">${section}</p><button class="news-gallery__favorite-btn" type="button">Add to favorite<svg width="12" height="12" viewBox="0 0 32 32">
<path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="1.7778" d="M27.787 6.146c-0.681-0.681-1.49-1.222-2.38-1.591s-1.844-0.559-2.807-0.559c-0.963 0-1.917 0.19-2.807 0.559s-1.698 0.909-2.38 1.591l-1.413 1.413-1.413-1.413c-1.376-1.376-3.241-2.148-5.187-2.148s-3.811 0.773-5.187 2.148c-1.376 1.376-2.148 3.241-2.148 5.187s0.773 3.811 2.148 5.187l11.787 11.787 11.787-11.787c0.681-0.681 1.222-1.49 1.591-2.38s0.559-1.844 0.559-2.807c0-0.963-0.19-1.917-0.559-2.807s-0.909-1.699-1.591-2.38v0z"></path>></svg></button></div>
    <div class="news-gallery__info">
      <h2 class="news-gallery__title">${headline}</h2>
      <div class ="wrapper">
      <p class="news-gallery__text">${abstract.substring(0, 110) + '...'}</p>
      </div>
      <div class="news-gallery__more">
      <p class="news-gallery__pub_date">${published_date}</p>
      <a class="news-gallery__read-more" href="${web_url}" target="_blank">Read more...</a>
      </div>
    </div>
    </div>
    </div>`;
}