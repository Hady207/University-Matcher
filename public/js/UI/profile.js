const universities = document.getElementById('universities');
const reviews = document.getElementById('reviews');
const active = 'side-nav__item--active';

const lis = document.querySelectorAll('.side-nav__item');
const universityli = document.querySelector('#menu_university');
const reviewli = document.querySelector('#menu_review');

const universities__main = document.querySelector('#universities__main');
const university__main = document.querySelector('#university__main');
const review__main = document.querySelector('#review__main');

// Side Navs listeners
if (universities)
  universities.addEventListener('click', e => {
    universities__main.style.display = 'block';
    // university__main.style.display = 'none';
    review__main.style.display = 'none';

    for (let i = 0; i < lis.length; i++) {
      lis[i].classList.remove(active);
    }
    if (!universityli.classList.contains(active)) {
      universityli.classList.add(active);
    }
  });

if (reviews)
  reviews.addEventListener('click', e => {
    universities__main.style.display = 'none';
    // university__main.style.display = 'none';
    review__main.style.display = 'block';

    for (let i = 0; i < lis.length; i++) {
      lis[i].classList.remove(active);
    }

    if (!reviewli.classList.contains(active)) {
      reviewli.classList.add(active);
    }
  });
