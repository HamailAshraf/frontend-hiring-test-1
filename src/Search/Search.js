import Axios from 'axios';

export const getSearch = async (id, token) => {
    try {
      const response = await Axios.get(`https://frontend-test-api.aircall.dev/calls/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response', response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching data: ", error.message);
     
       throw error;
    }
};