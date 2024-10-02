import api from '../middleware/AuthMiddleware';

export const getData = async () => {
  try {
    const response = await api.get('/data-endpoint/');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postData = async (payload: any) => {
  try {
    const response = await api.post('/data-endpoint/', payload);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
