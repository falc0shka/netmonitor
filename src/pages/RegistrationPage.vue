<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/AuthStore';

const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const name = ref('');
</script>

<template>
  <div
    class="bg-light-blue window-height window-width row justify-center items-center"
  >
    <div class="column justify-center items-center">
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="name"
                type="name"
                label="name"
                autocomplete="name"
              />
              <q-input
                square
                filled
                clearable
                v-model="email"
                type="email"
                label="email"
                autocomplete="email"
              />
              <q-input
                square
                filled
                clearable
                v-model="password"
                type="password"
                label="password"
                autocomplete="current-password"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="light-blue-7"
              size="lg"
              class="full-width"
              label="Create an account"
              @click="authStore.registration({ email, password, name })"
            />
          </q-card-actions>
          <q-card-section class="text-center">
            <router-link to="/login">Back to login form</router-link>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
