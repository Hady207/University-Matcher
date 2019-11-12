import axios from 'axios';

// Edit University
export const editAdminUniversity = async (id, data) => {
  try {
    await axios({
      method: 'PATCH',
      url: `/api/university/${id}`,
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
    await axios.delete(`/api/university/${id}`);
    location.reload(true);
  } catch (error) {
    console.log(error);
  }
};
// Delete Review

export const deleteAdminReview = async id => {
  try {
    await axios.delete(`/api/reviews/${id}`);
    location.reload(true);
  } catch (error) {
    console.log(error);
  }
};

// Delete User
export const deleteAdminUser = async id => {
  try {
    await axios.delete(`/api/users/${id}`);
    location.reload(true);
  } catch (error) {
    console.log(error);
  }
};
