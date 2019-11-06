import axios from 'axios';
import { showAlert } from '../UI/alerts';

export const follow = async id => {
  try {
    const res = await axios.post(
      `http://127.0.0.1:3000/api/users/${id}/follow`
    );
    if (res.data.status === 'success') {
      showAlert('success', 'followed');
      location.reload(true);
    }
  } catch (error) {
    showAlert('error', error);
  }
};

export const unFollow = async id => {
  try {
    const res = await axios.post(
      `http://127.0.0.1:3000/api/users/${id}/unfollow`
    );
    if (res.data.status === 'success') {
      showAlert('success', 'unfollowed');
      location.reload(true);
    }
  } catch (error) {
    showAlert('error', error);
  }
};
