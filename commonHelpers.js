import{i as f,a as y,S as b}from"./assets/vendor-64b55ca9.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const n={formEl:document.querySelector(".js-search-form"),imgEl:document.querySelector(".js-image-container"),loaderEl:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more-btn"),loaderBottom:document.querySelector(".loadMore")};let a=1,d="";n.formEl&&n.formEl.addEventListener("submit",E);n.loadMoreBtn&&n.loadMoreBtn.addEventListener("click",L);async function E(e){if(e.preventDefault(),a=1,d=e.target.elements.text.value.trim(),!d){f.error({position:"topRight",message:"Please enter a search query!"});return}c(!0);try{const o=await g(d,a);h(o),o.hits.length===0?(c(!1),l(!1)):(l(!0),c(!1),a++)}catch(o){console.error("Error fetching images:",o),c(!1),l(!1),p(),f.error({position:"topRight",message:"Failed to fetch images. Please try again later."})}finally{e.target.elements.text.value=""}}async function L(){try{l(!1),u(!0);const e=await g(d,a);h(e),e.hits.length===0?(u(!1),w()):(l(!0),a++)}catch(e){console.error("Error fetching more images:",e)}}function w(){const e=document.createElement("p");e.textContent="We're sorry, but you've reached the end of search results.",n.imgEl.insertAdjacentElement("beforebegin",e)}async function g(e,o=1){const s="https://pixabay.com/api/",i="42378231-2cbfe344b77ee99383ee8e657";try{return(await y.get(s,{params:{key:i,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15}})).data}catch{throw new Error("Failed to fetch images")}}function S(e){return`
        <a href="${e.largeImageURL}" class="photo-container" data-lightbox="photos">
            <img
                src="${e.webformatURL}"
                alt="${e.tags}"
                class="photo"
            />
            
            <div class="photo-body">
                <p class="photo-name">Likes ${e.likes}</p>
                <p class="photo-name">Views ${e.views}</p>
                <p class="photo-name">Comments ${e.comments}</p>
                <p class="photo-name">Downloads ${e.downloads}</p>
            </div>
        </a>
    `}function h(e){a===1&&p(),n.imgEl.innerHTML+=e.hits.map(s=>S(s)).join(""),new b('[data-lightbox="photos"]').refresh(),l(!0),u(!1),M()}function M(){const e=document.querySelector(".photo-container");if(e){const s=e.getBoundingClientRect().height*2;window.scrollBy({top:s,behavior:"smooth"})}}function p(){n.imgEl.innerHTML=""}function c(e){n.loaderEl.style.display=e?"inline-block":"none",n.loaderEl.style.bottom="50%"}function l(e){n.loadMoreBtn.style.display=e?"block":"none"}function u(e){n.loaderBottom.style.display=e?"block":"none"}
//# sourceMappingURL=commonHelpers.js.map
