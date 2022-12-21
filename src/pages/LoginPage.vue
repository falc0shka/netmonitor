<script setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch,
  onBeforeMount,
  TransitionGroup,
} from 'vue';
import { useAuthStore } from '../stores/AuthStore';

const authStore = useAuthStore();

const email = ref('');
const password = ref('');
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
              label="Login"
              @click="authStore.login({ email, password })"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Forget password?</p>
            <p class="text-grey-6">Created an Account</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
