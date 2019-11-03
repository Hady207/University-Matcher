import axios from 'axios';
import { showAlert } from './alerts';

// Send A post request to api/posts
export const sendPost = async data => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/posts`,
      data: data
    });

    if (res.data.status === 'success') {
      location.reload(true);
      showAlert('success', 'complete');
    }
  } catch (error) {
    showAlert('error', 'faild');
  }
};

// Send A post request to api/posts/id
export const sendComment = async (postId, comment) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/posts/${postId}`,
      data: {
        comment
      }
    });
    location.reload(true);
    showAlert('success', 'Comment Posted');
  } catch (error) {
    showAlert('error', error);
  }
};

export const deleteComment = async (postId, commentId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:3000/api/posts/${postId}/comments/${commentId}`
    });
    location.reload(true);
    showAlert('success', 'comment Deleted');
  } catch (error) {
    showAlert('error', 'Your are not allowed to delete the message');
  }
};

export const likeClicked = data => {};
