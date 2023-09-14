import { galleryItems } from "./gallery-items.js";
// Change code below this line

const refs = {
  gallery: document.body.querySelector(`.gallery`),
};
const renderGallery = () => {
  insertGalleryMarkup(refs.gallery, createGalleryMarkup(galleryItems));
};
const onGalleryItemClick = (event) => {
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  event.preventDefault();

  const modal = basicLightbox.create(`
    <div class="modal">
        <img src="${event.target.dataset.source}" width="900px"></img>
    </div>
`);
  const onModalEscape = (event) => {
    if (event.code === `Escape`) {
      modal.close();
      document.removeEventListener("keydown", onModalEscape);
    }
  };

  document.addEventListener("keydown", onModalEscape);
  modal.show();
};

renderGallery();
refs.gallery.addEventListener("click", onGalleryItemClick);

function createGalleryMarkup(galleryItems) {
  const galleryMarkup = galleryItems.reduce(
    (acc, { preview, original, description }) => {
      const itemMarkup = `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
      `;
      return (acc += itemMarkup);
    },
    ``
  );

  return galleryMarkup;
}
function insertGalleryMarkup(gallery, markup) {
  gallery.innerHTML = markup;
}
