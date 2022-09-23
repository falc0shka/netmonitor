import { createApp } from 'vue'
import { findDir } from '@vue/compiler-core'
import App from './App.vue'

import router from './router/index.js'

import './style.css'


createApp(App).use(router).mount('#netmonitor-app')



/**
 * Testing code
 */

function foo() {
  let x = 10
  function bar() {
    let y = 20
    return function (z) {
      x+=1
      console.log(x)
      console.log(y)
    }
  }
  return bar()
}
const temp = foo()
console.dir(temp)
console.dir(temp())
// console.dir(temp())
// console.dir(temp)
// console.dir(temp())
