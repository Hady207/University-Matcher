import axios from 'axios';
import { showAlert } from '../UI/alerts';

export const postReview = async (id, review, rating) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/universities/${id}/review`,
      data: {
        review,
        rating
      }
    });
    showAlert('success', 'Thanks for your input');
    location.reload(true);
  } catch (error) {
    console.log(error);
    showAlert('error', error.message);
  }
};

export const deleteReview = async (uniId, reviewId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:3000/api/universities/${uniId}/review/${reviewId}`
    });
    location.reload(true);
    showAlert('success', 'Review Deleted');
  } catch (error) {
    showAlert('error', 'You Cant delete This review');
  }
};
