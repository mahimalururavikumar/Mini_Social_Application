import axios from 'axios';

// API Base configuration
const API_URL = '/api/posts';

export const fetchPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { success: false, error: error.response?.data?.message || 'Failed to load posts' };
  }
};

export const createPostApi = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error creating post:', error);
    return { success: false, error: error.response?.data?.message || 'Failed to create post' };
  }
};

export const toggleLikeApi = async (postId) => {
  try {
    const response = await axios.post(`${API_URL}/${postId}/like`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error toggling like:', error);
    return { success: false, error: error.response?.data?.message || 'Failed to update like' };
  }
};

export const addCommentApi = async (postId, text) => {
  try {
    const response = await axios.post(`${API_URL}/${postId}/comment`, { text });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error adding comment:', error);
    return { success: false, error: error.response?.data?.message || 'Failed to add comment' };
  }
};

export const deletePostApi = async (postId) => {
  try {
    const response = await axios.delete(`${API_URL}/${postId}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { success: false, error: error.response?.data?.message || 'Failed to delete post' };
  }
};
