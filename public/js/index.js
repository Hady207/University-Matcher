import '@babel/polyfill';

import { login, logout, signUp } from './login';
import { postReview, deleteReview } from './reviewForm';
import { displayMap } from './mapbox';
import { sendPost, sendComment, deleteComment } from './campus';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginBtn = document.querySelector('#form__login');
const logoutBtn = document.getElementById('lgtBTN');
const formSignup = document.querySelector('.signUpForm');
const reviewForm = document.querySelector('.review__form');
const deleteBtn = document.querySelector('.symbol-delete');
const postForm = document.querySelector('#campusPost');
const commentForm = document.querySelectorAll('#commentPost');
const commentDeleteBtn = document.querySelector('.comment-delete');

// DELEGATION
if (loginBtn)
  loginBtn.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('#inputEmail').value;
    const password = document.querySelector('#inputPassword').value;
    login(email, password);
  });

if (logoutBtn)
  logoutBtn.addEventListener('click', e => {
    logout();
  });

if (formSignup)
  formSignup.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordconfirm').value;
    const program = document.getElementById('program').value;
    const major = document.getElementById('major').value;

    const newUser = { name, email, password, passwordConfirm, program, major };
    console.log(newUser);
    signUp(newUser);
  });

if (mapBox) {
  const place = JSON.parse(document.getElementById('map').dataset.location);
  displayMap(place);
}

if (reviewForm)
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
        // stars[i].value;
      }
    }
    postReview(id, review, rate);
    console.log(id, review, rate);
  });

if (deleteBtn)
  deleteBtn.addEventListener('click', e => {
    const uniid = deleteBtn.getAttribute('data-uniid');
    const reviewid = deleteBtn.getAttribute('data-reviewid');
    // console.log(uniid, reviewid);
    deleteReview(uniid, reviewid);
  });

if (postForm)
  postForm.addEventListener('submit', e => {
    e.preventDefault();
    const textArea = document.querySelector('.textArea').value;
    console.log(textArea);
    sendPost({ post: textArea });
  });

if (commentForm) {
  console.log(commentForm);

  commentForm.forEach((form, i) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const comment = document.querySelector(`#commentText-${i}`).value;
      console.log(`${comment}`, form.dataset.unique);
      sendComment(form.dataset.unique, comment);
    });
  });
}

if (commentDeleteBtn) {
  commentDeleteBtn.addEventListener('click', e => {
    const postId = commentDeleteBtn.dataset.postid;
    const commentId = commentDeleteBtn.dataset.commentid;

    console.log(postId, commentId);
    deleteComment(postId, commentId);
  });
}
