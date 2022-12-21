<script setup>
import { defineComponent } from 'vue';
import { useAuthStore } from './stores/AuthStore';

const authStore = useAuthStore();

if (localStorage.getItem('refreshToken')) {
  authStore.checkAuth();
} else {
  authStore.router.push('/login');
}
</script>

<template>
  <router-view />
</template>
