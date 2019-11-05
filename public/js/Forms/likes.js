import axios from 'axios';
import { showAlert } from '../UI/alerts';

export const like = async id => {
  try {
    const res = await axios.post(`http://127.0.0.1:3000/api/posts/${id}/like`);
    if (res.data.status === 'success') {
      location.reload(true);
    }
  } catch (error) {
    showAlert('error', error.message);
  }
};

export const dislike = async id => {
  try {
    const res = await axios.post(
      `http://127.0.0.1:3000/api/posts/${id}/dislike`
    );
    if (res.data.status === 'success') {
      location.reload(true);
    }
  } catch (error) {
    showAlert('error', error.message);
  }
};