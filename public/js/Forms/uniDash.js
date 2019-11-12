import axios from 'axios';
import showAlert from '../UI/alerts';
// const university__main = document.querySelector('#university__main');

const renderUniversityDashboard = u => {
  const markup = `<div id="universityContainer">
  
  <div class="gallery">
<figure class="gallery__item">
  <img src="./img/universities/${u.images[0]}" alt="" class="gallery__photo" />
</figure>
<figure class="gallery__item">
  <img src="./img/universities/${u.images[1]}" alt="" class="gallery__photo" />
</figure>
<figure class="gallery__item">
  <img src="./img/universities/${u.images[2]}" alt="" class="gallery__photo" />
</figure>
</div>

<div class="overview">
<h1 class="overview__heading">${u.name}</h1>
<div class="overview__stars">
  
</div>
<div class="overview__location">
  <ion-icon name="pin"></ion-icon>
  ${u.address}
</div>
<div class="overview__rating">
  <div class="overview__rating-average">${u.ratingAverage}</div>
  <div class="overview__rating-count">${u.ratingQuantity} votes</div>
</div>
</div>

<div class="details">
<div class="description">
  <p class="paragraph">
    ${u.description}
  </p>
  

  <ul class="list">
    <li class="list__item">${u.admissionRule}</li>
    <li class="list__item">${u.majors}</li>
    <li class="list__item">${u.priceAverage}KWD per course hour</li>
    <li class="list__item">${u.certificates}</li>
    <li class="list__item">${u.numOfStudents}</li>
    <li class="list__item">${u.programs}</li>
    <li class="list__item">${u.website}</li>
  </ul>
  </div>`;

  document
    .querySelector('.dashboard-view')
    .insertAdjacentHTML('afterbegin', markup);
};

const starsRender = rate => {
  const num = Math.floor(rate);
  for (let i = 1; i <= num; i++) {
    document
      .querySelector('.overview__stars')
      .insertAdjacentHTML('afterbegin', `<ion-icon name="star"></ion-icon>`);
  }
};

export const renderUni = async uniId => {
  try {
    const university = await axios.get(
      `http://127.0.0.1:3000/api/universities/${uniId}`
    );
    console.log(university);
    console.log(university.data.data);
    const data = { ...university.data.data.data };
    console.log(data);

    renderUniversityDashboard(data);
    starsRender(data.ratingAverage);
  } catch (error) {
    console.log(error);
  }
};
