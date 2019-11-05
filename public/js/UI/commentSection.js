const commentButtons = document.querySelectorAll('#commentButton');
// const commentSection = document.querySelector('#commentSection');
const likeButton = document.querySelectorAll('.button--like');
const dislikeButton = document.querySelectorAll('.button--dislike');
const commentForm = document.querySelectorAll('#commentPost');

// commentButton.addEventListener('click', e => {
//   console.log('hello');
//   commentSection.style.display =
//     commentSection.style.display === '' ? 'block' : '';
// });

commentButtons.forEach((button, i) => {
  button.addEventListener('click', e => {
    const commentSection = document.querySelector(`#commentSection-${i}`);
    commentSection.style.display =
      commentSection.style.display === '' ? 'block' : '';
  });
});

// likeButton.forEach((button, i) => {
//   button.addEventListener('click', e => {
//     button.style.display = 'none';
//     const id = button.dataset.likeid;
//     const dislikeButton2 = document.querySelector(`#dislikeButton-${i}`);
//     dislikeButton2.style.display = 'block';
//   });
// });

// dislikeButton.forEach((button, i) => {
//   button.addEventListener('click', e => {
//     button.style.display = 'none';
//     const id = button.dataset.likeid;
//     const likeButton2 = document.querySelector(`#likeButton-${i}`);
//     likeButton2.style.display = 'block';
//   });
// });
// likeButton.addEventListener('click', e => {
//   likeButton.style.display = 'none';
//   dislikeButton.style.display = 'block';
// });

// dislikeButton.addEventListener('click', e => {
//   dislikeButton.style.display = 'none';
//   likeButton.style.display = 'block';
// });

// if (commentForm) {
//   console.log(commentForm);

//   commentForm.forEach((form, i) => {
//     form.addEventListener('submit', e => {
//       e.preventDefault();
//       const comment = document.querySelector(`#commentText-${i}`);
//       console.log(comment.value);
//       console.log(form.dataset.unique);
//       // postComment(form.dataset.unique);
//     });
//   });
// }
