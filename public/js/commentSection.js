const commentButtons = document.querySelectorAll('#commentButton');
// const commentSection = document.querySelector('#commentSection');
const likeButton = document.querySelector('#likeButton');
const dislikeButton = document.querySelector('#dislikeButton');
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

likeButton.addEventListener('click', e => {
  likeButton.style.display =
    likeButton.style.display === 'block' ? '' : 'block';
  dislikeButton.style.display =
    dislikeButton.style.display === '' ? 'block' : '';
});

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
