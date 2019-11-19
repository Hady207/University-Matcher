import axios from 'axios';
import { showAlert } from '../UI/alerts';

export const postReview = async (id, review, rating) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/universities/${id}/review`,
      data: {
        review,
        rating,
      },
    });
    showAlert('success', 'Thanks for your input');
    location.reload(true);
  } catch (error) {
    console.log(error.response);
    showAlert('error', 'Please Give the review a rating');
  }
};

export const deleteReview = async (uniId, reviewId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/universities/${uniId}/review/${reviewId}`,
    });
    location.reload(true);
    showAlert('success', 'Review Deleted');
  } catch (error) {
    showAlert('error', 'You Cant delete This review');
  }
};
