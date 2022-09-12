<script setup>

import { ref, reactive, computed} from 'vue'

defineProps({
  msg: String,
})
const obj = {
  foo: ref(1),
  bar: ref(2)
}
function incrementor(x) {
  x.value++;
}
const showTitle = ref(true);
const isTooBig = computed(()=>Date.now())

</script>

<template>
   <div class="card">
    <button @click="showTitle = !showTitle">Show title</button>
    <h2 v-if:="showTitle">{{ msg }}</h2>
    <p id="label">It's too big? <strong>{{ isTooBig }}</strong></p>
    <button type="button" @click="incrementor(obj.foo)">count is {{ obj.foo }} and date is {{ isTooBig }}</button>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
