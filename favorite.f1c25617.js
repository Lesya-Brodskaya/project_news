!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){r[e]=n},e.parcelRequired7c6=t);var o=t("2bcf7"),i=document.querySelector("#search-field__input");document.querySelector("#form-field").addEventListener("submit",(function(e){e.preventDefault();var n=i.value.toLowerCase().trim(),r=JSON.parse(localStorage.getItem("newsSection"));if(null!==r){var t=function(e,n){return e.reduce((function(e,r){return(r.title.toLowerCase().includes(n)||r.description.toLowerCase().includes(n)||r.category.toLowerCase().includes(n))&&e.push(r),e}),[])}(r,n);if(0===t.length)return o.block.innerHTML="",void document.querySelector(".underfined").classList.remove("underfined-hidden");var d=(0,o.createMarkup)(t);o.block.innerHTML=d,document.querySelector(".underfined").classList.add("underfined-hidden")}}))}();
//# sourceMappingURL=favorite.f1c25617.js.map
