<script setup>

import { ref, reactive, computed, watch, onMounted} from 'vue'

/**
 * Props and Emits
 */
defineProps({
  msg: String,
})

/**
 * Refs and variables
 */
const obj = {
  foo: ref(1),
  bar: ref(2)
}

const showTitle = ref(true);
const question = ref('')
const answer = ref('Need "?" in the question!')
const lastQuestion = ref('')
const lastQuestionTemp = ref('')
const input = ref(null)

/**
 * Watchers
 */

watch(question, async(newQuestion, oldQuestion)=>{
  lastQuestion.value = lastQuestionTemp.value;
  if (newQuestion.indexOf('?') !== -1) {
    lastQuestionTemp.value = newQuestion;
    answer.value = 'Please wait, trying to find answer...'
    try {
      const res = await fetch('https://yesno.wtf/api');
      answer.value = (await res.json()).answer;

    }
    catch (e) {
      answer.value = 'Can\'t reach "yes-no" API :(' + e;
    }
  }
  else {
    answer.value = 'Need "?" in the question!'
  }
})

/**
 * Lifecycle
 */

onMounted(()=> {
  input.value.focus();
}
);

</script>

<template>
  <hr>
  <div class='card'>
    <button @click='showTitle = !showTitle'>Show title</button>
    <h2 v-if='showTitle'>{{ msg }}</h2>  
    <p>
      Ask a yes/no question:
      <input v-model='question' ref='input'/>
    </p>
    <p>Answer: {{ answer }}</p>
    <p>Previous question was: {{ lastQuestion }}</p>

  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
