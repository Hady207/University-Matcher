// side nav buttons
const universities = document.getElementById('universities');
const reviews = document.getElementById('reviews');
const users = document.getElementById('users');

// nav active lis
const active = 'side-nav__item--active';
const buttonActive = `addAcitveButtonStyle`;

const universityli = document.querySelector('#menu_university');
const reviewli = document.querySelector('#menu_review');
const userli = document.querySelector('#menu_user');

const lis = document.querySelectorAll('.side-nav__item');

// main body elements
const universities__main = document.querySelector('#universities__main');
const university__main = document.querySelector('#university__main');
const review__main = document.querySelector('#review__main');
const user__main = document.querySelector('#user__main');
const model = document.querySelector('#edit__modal');

// university buttons
// const details = document.querySelectorAll('.details__buttons');
const editButton = document.querySelector('#edit_button');
const exitButton = document.querySelector('#exit');
const elem = document.querySelector('.dashboard-view');
const child = document.querySelector('#universityContainer');

// Side Navs listeners
if (universities)
  universities.addEventListener('click', e => {
    universities__main.style.display = 'block';
    university__main.style.display = 'none';
    review__main.style.display = 'none';
    user__main.style.display = 'none';
    for (let i = 0; i < lis.length; i++) {
      lis[i].classList.remove(active);
    }
    if (!universityli.classList.contains(active)) {
      universityli.classList.add(active);
    }

    if (university__main.childNodes) {
      console.log(elem.firstChild);
      elem.firstChild.remove();
    }
  });

if (reviews)
  reviews.addEventListener('click', e => {
    universities__main.style.display = 'none';
    university__main.style.display = 'none';
    review__main.style.display = 'block';
    user__main.style.display = 'none';

    for (let i = 0; i < lis.length; i++) {
      lis[i].classList.remove(active);
    }

    if (!reviewli.classList.contains(active)) {
      reviewli.classList.add(active);
    }
  });

if (users)
  users.addEventListener('click', e => {
    universities__main.style.display = 'none';
    university__main.style.display = 'none';
    review__main.style.display = 'none';
    user__main.style.display = 'block';
    for (let i = 0; i < lis.length; i++) {
      lis[i].classList.remove(active);
    }
    if (!userli.classList.contains(active)) {
      userli.classList.add(active);
    }
  });

// university button listenrs

if (editButton && exitButton) {
  editButton.addEventListener('click', e => {
    console.log(e);
    model.classList.toggle('edit__modal-show');
  });

  exitButton.addEventListener('click', e => {
    model.classList.toggle('edit__modal-show');
  });
}
const bookmark = document.querySelector('#bookmark');
const notification = document.querySelector('#notification');
const bookmarkDrop = document.querySelector('#bookmarksDrop');
const notificationDrop = document.querySelector('#notificationDrop');

bookmark.addEventListener('click', e => {
  // bookmark.classList.toggle(buttonActive);
  bookmarkDrop.style.display =
    bookmarkDrop.style.display === 'none' ? 'block' : 'none';
  // dropbox.style.display = dropbox.style.display === "none" ? "block" : "none";
});

notification.addEventListener('click', e => {
  notificationDrop.style.display =
    notificationDrop.style.display === 'none' ? 'block' : 'none';
});

// if (details)
//   details.forEach((detail, i) => {
//     detail.addEventListener('click', e => {
//       const unID = detail.dataset.finduni;
//       console.log(unID);
//       universities__main.style.display = 'none';
//       university__main.style.display = 'block';
//     });
//   });

// details.addEventListener('click', e => {
//   const unID = details.dataset.finduni;
//   console.log(unID);
//   universities__main.style.display = 'none';
//   university__main.style.display = 'block';
// });
