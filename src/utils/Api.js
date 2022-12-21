import axios from 'axios';

const apiDefault = axios.create({
  baseURL: `${process.env.variables.API_BASE_URL}:${process.env.variables.API_PORT}`,
});

apiDefault.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

apiDefault.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    if (error.response.status === 401 && !error.config._isRetry) {
      error.config._isRetry = true;
      try {
        const response = await axios.post(
          `${process.env.variables.API_BASE_URL}:${process.env.variables.API_PORT}/v1/auth/refresh-tokens`,
          {
            refreshToken: localStorage.getItem('refreshToken'),
          },
        );
        localStorage.setItem('token', response.data.access.token);
        localStorage.setItem('refreshToken', response.data.refresh.token);

        return apiDefault.request(error.config);
      } catch (e) {
        console.log('You are not autorized! Please reload the page!');
      }
    }
    throw error;
  },
);

export default apiDefault;
