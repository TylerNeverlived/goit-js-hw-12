import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  formEl: document.querySelector('.js-search-form'),
  imgEl: document.querySelector('.js-image-container'),
  loaderEl: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  loaderBottom: document.querySelector('.loadMore'),
};

let currentPage = 1;
let currentQuery = '';

if (refs.formEl) {
  refs.formEl.addEventListener('submit', onFormSubmit);
}

if (refs.loadMoreBtn) {
  refs.loadMoreBtn.addEventListener('click', loadMoreImages);
}

async function onFormSubmit(e) {
  e.preventDefault();
  currentPage = 1;
  currentQuery = e.target.elements.text.value.trim();

  if (!currentQuery) {
    iziToast.error({
      position: 'topRight',
      message: 'Please enter a search query!',
    });
    return;
  }

  // toggleLoader(true);
  toggleLoadMore(true);

  try {
    const data = await getImg(currentQuery, currentPage);
    renderImg(data);
    if (data.hits.length === 0) {
      iziToast.info({
        position: 'topRight',
        message: 'No images found for the entered query.',
      });
      toggleLoader(false);
      toggleLoadMore(false);
      toggleLoadMoreButton(false);
    } else if (data.hits.length < 15) {
      toggleLoadMoreButton(false);
      toggleLoader(false);
    } else {
      toggleLoadMoreButton(true);
      toggleLoader(false);
      toggleLoadMore(false);
      currentPage++;
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      position: 'topRight',
      message: 'Failed to fetch images. Please try again later.',
    });
    toggleLoader(false);
    toggleLoadMoreButton(false);
    toggleLoadMore(false);
    clearGallery();
  } finally {
    e.target.elements.text.value = '';
  }
}

async function loadMoreImages() {
  try {
    toggleLoadMoreButton(false);
    toggleLoadMore(true);
    const data = await getImg(currentQuery, currentPage);
    renderImg(data);

    if (data.hits.length < 15) {
      toggleLoadMore(false);
      toggleLoadMoreButton(false);
      iziToast.show({
        title: '',
        message: "We're sorry, but you've reached the end of search results.",
        color: 'red',
        position: 'topRight',
      });
    } else {
      toggleLoadMoreButton(true);
      currentPage++;
    }
  } catch (error) {
    console.error('Error fetching more images:', error);
    iziToast.error({
      position: 'topRight',
      message: 'Failed to fetch more images. Please try again later.',
    });
  }
}

async function getImg(query, page = 1) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '42295751-6e09ed05d50a99192d667c3e9';

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
}

function imgTemplate(photo) {
  return `
        <a href="${photo.largeImageURL}" class="photo-container" data-lightbox="photos">
            <img
                src="${photo.webformatURL}"
                alt="${photo.tags}"
                class="photo"
            />
            
            <div class="photo-body">
                <p class="photo-name">Likes ${photo.likes}</p>
                <p class="photo-name">Views ${photo.views}</p>
                <p class="photo-name">Comments ${photo.comments}</p>
                <p class="photo-name">Downloads ${photo.downloads}</p>
            </div>
        </a>
    `;
}

function renderImg(data) {
  if (currentPage === 1) {
    clearGallery();
  }
  refs.imgEl.innerHTML += data.hits.map(img => imgTemplate(img)).join('');

  const lightbox = new SimpleLightbox('[data-lightbox="photos"]');
  lightbox.refresh();

  // toggleLoadMoreButton(true);
  toggleLoadMore(false);
  smoothScrollToNextImages();
}

function smoothScrollToNextImages() {
  const galleryItem = document.querySelector('.photo-container');
  if (galleryItem) {
    const cardHeight = galleryItem.getBoundingClientRect().height;
    const scrollAmount = cardHeight * 2;

    window.scrollBy({
      top: scrollAmount,
      behavior: 'smooth',
    });
  }
}

function clearGallery() {
  refs.imgEl.innerHTML = '';
}

function toggleLoader(isVisible) {
  refs.loaderEl.style.display = isVisible ? 'inline-block' : 'none';
}

function toggleLoadMoreButton(isVisible) {
  refs.loadMoreBtn.style.display = isVisible ? 'block' : 'none';
}

function toggleLoadMore(isVisible) {
  refs.loaderBottom.style.display = isVisible ? 'inline-block' : 'none';
}
