import axios from 'axios';

// Edit University
export const editAdminUniversity = async (id, data) => {
  try {
    await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/university/${id}`,
      data
    });
    location.reload(true);
  } catch (error) {
    console.log(error);
  }
};

// Delete University
export const deleteAdminUniversity = async id => {
  try {
    await axios.delete(`http://127.0.0.1:3000/api/university/${id}`);
    location.reload(true);
  } catch (error) {
    console.log(error);
  }
};
// Delete Review

export const deleteAdminReview = async id => {
  try {
    await axios.delete(`http://127.0.0.1:3000/api/reviews/${id}`);
    location.reload(true);
  } catch (error) {
    console.log(error);
  }
};

// Delete User
export const deleteAdminUser = async id => {
  try {
    await axios.delete(`http://127.0.0.1:3000/api/users/${id}`);
    location.reload(true);
  } catch (error) {
    console.log(error);
  }
};
