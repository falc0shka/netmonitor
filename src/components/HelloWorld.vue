<script setup>

import { ref, reactive, computed, watch, onMounted} from 'vue'

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
const isTooBig = computed(()=>obj.foo.value>5?'YES':'NO');


const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` is the native DOM event
  if (event) {
    alert(event.target.tagName)
  }
}
///////////////////////////////////////////////

const question = ref('')
const answer = ref('Need "?" in the question!')
const lastQuestion = ref('Still null')

watch(question, async(newQuestion, oldQuestion)=>{
  if (newQuestion.indexOf('?') !== -1) {
    answer.value = 'Please wait, trying to find answer...'
    try {
      const res = await fetch('https://yesno.wtf/api');
      answer.value = (await res.json()).answer;
      if (oldQuestion.indexOf('?') !== -1) {
        lastQuestion.value = oldQuestion;
      }
    }
    catch (e) {
      answer.value = 'Can\'t reach "yes-no" API :(' + e;
    }
  }
})

//////////////////////////////////////////////

const x = ref(2)
const y = ref(4)

watch (()=>x.value+y.value, (sum)=>{
  console.log(sum)})

////////////////////////////////////////////////

const input = ref(null)
//onMounted(()=> {
//  input.value.focus();
//}
//)
////////////////////////////////////////////////

</script>

<template>
   <div class='card'>
    <button @click='showTitle = !showTitle'>Show title</button>
    <h2 v-if='showTitle'>{{ msg }}</h2>
    <p id='label'>It's too big? <strong>{{ isTooBig }}</strong></p>
    <button type='button' @click='incrementor(obj.foo)'>count is {{ obj.foo }} and "isTooBig" status is {{ isTooBig }}</button>
    <button @click='greet'>Greet</button>
    
    <p>
      Ask a yes/no question:
      
      <input v-model='question' ref='input'/>
    </p>
    <p>Answer: {{ answer }}</p>
    <p>Previous question was: {{ lastQuestion }}</p>

    <button @click='x++'>x++</button>
    <p>{{input}}</p>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
