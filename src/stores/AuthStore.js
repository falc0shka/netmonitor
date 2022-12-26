import { defineStore } from 'pinia';
import axios from 'axios';
import api from '../utils/Api';
import { Notify } from 'quasar';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isAuth: false,
      user: {},
    };
  },
  actions: {
    async login(userData) {
      try {
        const response = await api.post(`/v1/auth/login`, {
          ...userData,
        });
        localStorage.setItem('token', response.data.tokens.access.token);
        localStorage.setItem(
          'refreshToken',
          response.data.tokens.refresh.token,
        );

        this.user = response.data.user;
        this.isAuth = true;

        this.router.push('/');
      } catch (error) {
        Notify.create({
          color: 'red-4',
          textColor: 'white',
          icon: 'warning',
          message: error.response.data.message,
        });
      }
    },
    async registration(userData) {
      try {
        const response = await api.post(`/v1/auth/register`, {
          ...userData,
        });
        localStorage.setItem('token', response.data.tokens.access.token);
        localStorage.setItem(
          'refreshToken',
          response.data.tokens.refresh.token,
        );

        this.user = response.data.user;
        this.isAuth = true;
        this.router.push('/');
      } catch (error) {
        Notify.create({
          color: 'red-4',
          textColor: 'white',
          icon: 'warning',
          message: error.response.data.message,
        });
      }
    },
    async logout() {
      try {
        const response = await api.post(`/v1/auth/logout`, {
          refreshToken: localStorage.getItem('refreshToken'),
        });
      } catch (error) {
        Notify.create({
          color: 'red-4',
          textColor: 'white',
          icon: 'warning',
          message: error.response.data.message,
        });
      } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this.user = {};
        this.isAuth = false;
        this.router.push('/login');
      }
    },

    async checkAuth() {
      try {
        const response = await axios.post(
          `${process.env.variables.API_BASE_URL}:${process.env.variables.API_PORT}/v1/auth/refresh-tokens`,
          {
            refreshToken: localStorage.getItem('refreshToken'),
          },
        );
        localStorage.setItem('token', response.data.access.token);
        localStorage.setItem('refreshToken', response.data.refresh.token);
        this.isAuth = true;
        return true;
      } catch (error) {
        Notify.create({
          color: 'red-4',
          textColor: 'white',
          icon: 'warning',
          message: error.response.data.message,
        });
        this.router.push('/login');
      }
    },
  },
});
