import { isEscapeKey } from './util.js';

const COMMENTS_TO_SHOW = 5;

const body = document.querySelector('body');
const preview = document.querySelector('.big-picture');
const previewImage = preview.querySelector('.big-picture__img').querySelector('img');
const commentsCountBlock = preview.querySelector('.social__comment-count');
const commentsCount = commentsCountBlock.querySelector('.comments-count');
const previewCaption = preview.querySelector('.social__caption');
const previewLikes = preview.querySelector('.likes-count');
const previewComments = preview.querySelector('.social__comments');
const commentTemplate = preview.querySelector('.social__comment');
const commentsLoaderButton = preview.querySelector('.comments-loader');
const commentsCounted = preview.querySelector('.social__comment-count');
// const commentsLoaded = preview.querySelector('.social__comment-loaded');
const previewCloseButton = preview.querySelector('.cancel');

let commentCounter = 0;

// наполняетDOM-элемент 'Полноэкранный показ изображения' данными из pictures

const fillPreview =(photo)=> {
  previewImage.src = photo.url;
  previewLikes.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  previewCaption.textContent = photo.description;
  previewComments.innerHTML = '';
  photo.comments.forEach((comments)=> {
    const {avatar, name, message} = comments;
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('img').src = avatar;
    commentElement.querySelector('img').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    previewComments.append(commentElement);
  });
};


//закрывает полноразмерное изображение

const closePreview = () => {
  preview.classList.add('hidden');
  body.classList.remove('modal-open');
  previewCloseButton.removeEventListener('click', onPreviewClose);
  document.removeEventListener('keydown', onPopupEscKeydown);
};

function onPreviewClose () {
  closePreview();
}

function onPopupEscKeydown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    onPreviewClose();
  }
}

//открывает полноразмерное изображение
const openPreview = (photo) => {
  preview.classList.remove('hidden');
  body.classList.add('modal-open');
  fillPreview(photo);
  previewCloseButton.addEventListener('click', onPreviewClose);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const showCommentsLoaderButton =()=> {
  commentsLoaderButton.classList.remove('hidden');
};

const hideCommentsLoaderButton = () => {
  commentsLoaderButton.classList.add('hidden');
}

export {openPreview};
