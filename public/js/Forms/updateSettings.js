import axios from 'axios';
import { showAlert } from '../UI/alerts';

export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/users/updateMyPassword'
        : '/api/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (error) {
    // console.log(error);
    showAlert('error', error);
  }
};
