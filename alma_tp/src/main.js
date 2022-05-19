import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  el: '#app',
  components: { App },
  template: '<App/>',
  created() {
    if (performance.navigation.type === 1) {
      if(this.$route.path === '/') {
        if (confirm('Si recarga el sitio volvera al inicio')) {
          this.$router.push({path: '/'})
        } else {
          console.log('reload page now');
        }
      }
    }
  },
  render: h => h(App)
}).$mount('#app')
