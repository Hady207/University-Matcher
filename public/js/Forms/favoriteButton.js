import axios from 'axios';
import { showAlert } from '../UI/alerts';

export const favorite = async id => {
  try {
    const res = await axios.post(
      `http://127.0.0.1:3000/api/universities/${id}`
    );
    console.log(res);
    if (res.data.status === 'added') {
      showAlert('success', 'added to favorite');
    } else {
      showAlert('success', 'removed from favorite');
    }
  } catch (error) {
    showAlert(error, 'error');
  }
};
