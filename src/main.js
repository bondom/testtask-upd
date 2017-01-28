import Vue from 'vue'

Vue.use(require('vue-resource'));

window.Event = new Vue();

import App from './App.vue'

new Vue({
    el: '#app',
    render: h => h(App)
});
