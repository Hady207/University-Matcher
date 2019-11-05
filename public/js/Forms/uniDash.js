import axios from 'axios';
const university__main = document.querySelector('#university__main');

const renderUniversityDashboard = university => {
  const markup = `<div class="gallery">
<figure class="gallery__item"><img class="gallery__photo" src="./img/university-1.jpg" /></figure>
<figure class="gallery__item"><img class="gallery__photo" src="./img/university-2.jpg" /></figure>
<figure class="gallery__item"><img class="gallery__photo" src="./img/university-3.jpg" /></figure>
</div>`;
};
export const renderUni = async uniId => {
  const university = await axios.get(
    `http://127.0.0.1:3000/api/universities/${uniId}`
  );
};
