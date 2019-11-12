import '@babel/polyfill';

import { login, logout, signUp } from './Forms/login';
import { postReview, deleteReview } from './Forms/reviewForm';
import { updateSettings } from './Forms/updateSettings';
import { sendPost, sendComment, deleteComment } from './Forms/campus';
import {
  deleteAdminUniversity,
  deleteAdminReview,
  deleteAdminUser
} from './Forms/adminCRUD';
import { renderUni } from './Forms/uniDash';
import { favorite } from './Forms/favoriteButton';
import { like, dislike } from './Forms/likes';
import { follow, unFollow } from './Forms/followers';
import { displayMap } from './UI/mapbox';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginBtn = document.querySelector('#form__login');
const logoutBtn = document.getElementById('lgtBTN');
const logoutBtnHome = document.getElementById('logoutHome');
const formSignup = document.querySelector('.signUpForm');
const reviewForm = document.querySelector('.review__form');
const deleteBtn = document.querySelector('.symbol-delete');
const postForm = document.querySelector('#campusPost');
const commentForm = document.querySelectorAll('#commentPost');
const commentDeleteBtn = document.querySelector('.comment-delete');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
// const dashboardDetail = document.querySelectorAll('.b1__edit');
// const details = document.querySelector('#details__button');
const favoriteBtn = document.querySelector('.favoriteButton');
const likeButton = document.querySelectorAll('.button--like');
const dislikeButton = document.querySelectorAll('.button--dislike');
const followButton = document.querySelector('.follow__button');
const unfollowButton = document.querySelector('.unfollow__button');
const unfollowList = document.querySelectorAll('.unfollowBtns');
const blockList = document.querySelector('.unfollowFBtns');
const details = document.querySelectorAll('.details__buttons');
const universities__main = document.querySelector('#universities__main');
const university__main = document.querySelector('#university__main');
const adminUniversityDelete = document.querySelectorAll(
  '.delete__universities'
);
const adminReviewDelete = document.querySelectorAll('.review__admin__delete');
const adminUserDelete = document.querySelectorAll('.user__admin__delete');

// DELEGATION
if (loginBtn) {
  loginBtn.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('#inputEmail').value;
    const password = document.querySelector('#inputPassword').value;
    login(email, password);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', e => {
    console.log('pushed');
    logout();
  });
}

if (logoutBtnHome) {
  logoutBtnHome.addEventListener('click', e => {
    console.log('pushedHome');
    logout();
  });
}

if (formSignup) {
  formSignup.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordconfirm').value;
    const program = document.getElementById('program').value;
    const major = document.getElementById('major').value;

    const newUser = { name, email, password, passwordConfirm, program, major };

    signUp(newUser);
  });
}

if (favoriteBtn) {
  favoriteBtn.addEventListener('click', e => {
    const id = favoriteBtn.dataset.universityid;
    favorite(id);
    favoriteBtn.classList.toggle('favoriteButtonActive');
  });
}

if (mapBox) {
  const place = JSON.parse(document.getElementById('map').dataset.location);
  displayMap(place);
}

if (reviewForm) {
  reviewForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = reviewForm.getAttribute('data-uniid');
    const slug = reviewForm.getAttribute('data-slug');
    const review = document.querySelector('.text__box').value;
    const stars = document.getElementsByName('rating');
    let rate;
    for (let i = 0; i < stars.length; i++) {
      if (stars[i].checked) {
        rate = stars[i].value;
        break;
      }
    }
    postReview(id, review, rate);
  });
}

if (deleteBtn) {
  deleteBtn.addEventListener('click', e => {
    const uniid = deleteBtn.getAttribute('data-uniid');
    const reviewid = deleteBtn.getAttribute('data-reviewid');

    deleteReview(uniid, reviewid);
  });
}

if (postForm) {
  postForm.addEventListener('submit', e => {
    e.preventDefault();
    const textArea = document.querySelector('.textArea').value;

    sendPost({ post: textArea });
  });
}

if (commentForm) {
  commentForm.forEach((form, i) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const comment = document.querySelector(`#commentText-${i}`).value;
      sendComment(form.dataset.unique, comment);
    });
  });
}

if (commentDeleteBtn) {
  commentDeleteBtn.addEventListener('click', e => {
    const postId = commentDeleteBtn.dataset.postid;
    const commentId = commentDeleteBtn.dataset.commentid;
    deleteComment(postId, commentId);
  });
}

if (userDataForm) {
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);

    updateSettings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('#btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordconfirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('#btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('passwordconfirm').value = '';
  });
}

if (likeButton) {
  likeButton.forEach((button, i) => {
    button.addEventListener('click', e => {
      button.style.display = 'none';
      const id = button.dataset.likeid;
      const dislikeButton2 = document.querySelector(`#dislikeButton-${i}`);
      dislikeButton2.style.display = 'block';
      like(id);
    });
  });
}

if (dislikeButton) {
  dislikeButton.forEach((button, i) => {
    button.addEventListener('click', e => {
      button.style.display = 'none';
      const id = button.dataset.unlikeid;
      const likeButton2 = document.querySelector(`#likeButton-${i}`);
      likeButton2.style.display = 'block';
      dislike(id);
    });
  });
}

if (followButton) {
  followButton.addEventListener('click', e => {
    const id = followButton.dataset.friend;
    follow(id);
  });
}

if (unfollowButton) {
  unfollowButton.addEventListener('click', e => {
    const id = unfollowButton.dataset.friend;
    unFollow(id);
  });
}

if (unfollowList) {
  unfollowList.forEach((unfollowed, i) => {
    unfollowed.addEventListener('click', e => {
      const id = unfollowed.dataset.idfollower;
      unFollow(id);
    });
    // const clicked = document.querySelector(`unfollowLink-${i}`);
    // const id = clicked.dataset.unfollow;
  });
}

if (details) {
  details.forEach((detail, i) => {
    detail.addEventListener('click', e => {
      const unID = detail.dataset.finduni;
      universities__main.style.display = 'none';
      university__main.style.display = 'block';
      renderUni(unID);
    });
  });
}
// Admin CRUD

if (adminUniversityDelete) {
  adminUniversityDelete.forEach((button, i) => {
    button.addEventListener('click', e => {
      const id = button.dataset.finduni;
      deleteAdminUniversity(id);
    });
  });
}

if (adminReviewDelete) {
  adminReviewDelete.forEach((button, i) => {
    button.addEventListener('click', e => {
      const id = button.dataset.reviewid;
      // console.log(id);
      deleteAdminReview(id);
    });
  });
}

if (adminUserDelete) {
  adminUserDelete.forEach((button, i) => {
    button.addEventListener('click', e => {
      const id = button.dataset.userid;
      // console.log(id);
      deleteAdminUser(id);
    });
  });
}
