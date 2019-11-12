import axios from 'axios';
import { showAlert } from '../UI/alerts';

export const login = async (email, password) => {
  // console.log(email, password);
  try {
    const res = await axios({
      method: 'POST',
      url: `api/users/login`,
      data: {
        email,
        password
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Logged In successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

export const logout = async () => {
  const res = await axios({
    method: 'GET',
    url: `/api/users/logout`
  });

  if (res.data.status === 'success') {
    window.setTimeout(() => {
      location.assign('/');
    }, 1500);
    showAlert('success', 'GoodBye');
  }
};

// newUser= {
//   name:
//   email:
//   password:,
//   passwordConfirm,
//   major,
//   programs
// }

export const signUp = async newUser => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/users/signup',
      data: newUser
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Logged In successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    // console.log(error.response);
    showAlert('error', error.response.data.message);
  }
};
