const markup = `<div class="gallery">
<figure class="gallery__item">
  <img src="./img/university-1.jpg" alt="" class="gallery__photo" />
</figure>
<figure class="gallery__item">
  <img src="./img/univeristy-2.jpg" alt="" class="gallery__photo" />
</figure>
<figure class="gallery__item">
  <img src="./img/university-3.jpg" alt="" class="gallery__photo" />
</figure>
</div>

<div class="overview">
<h1 class="overview__heading">University Name</h1>
<div class="overview__stars">
  <ion-icon name="star"></ion-icon>
  <ion-icon name="star"></ion-icon>
  <ion-icon name="star"></ion-icon>
  <ion-icon name="star"></ion-icon>
  <ion-icon name="star"></ion-icon>
</div>
<div class="overview__location">
  <ion-icon name="pin"></ion-icon>
  kuwait kuwait
</div>
<div class="overview__rating">
  <div class="overview__rating-average">8.6</div>
  <div class="overview__rating-count">429 votes</div>
</div>
</div>

<div class="details">
<div class="description">
  <p class="paragraph">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    Repellat aperiam quibusdam harum obcaecati adipisci eius nulla
    quia eveniet asperiores?
  </p>
  <p class="paragraph">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    Repellat aperiam quibusdam harum obcaecati adipisci eius nulla
    quia eveniet asperiores?
  </p>

  <ul class="list">
    <li class="list__item">Close to the beach</li>
    <li class="list__item">Breakfast included</li>
    <li class="list__item">Free airport shuttle</li>
    <li class="list__item">Free wifi in all rooms</li>
    <li class="list__item">Air conditioning and heating</li>
    <li class="list__item">Pets allowed</li>
    <li class="list__item">We speak all languages</li>
    <li class="list__item">Perfect for families</li>
  </ul>`;

document
  .querySelector('.dashboard-view')
  .insertAdjacentHTML('afterbegin', markup);
