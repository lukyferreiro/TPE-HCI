import Vue from 'vue'
import App from './App.vue'
import Vuetify from "vuetify/lib";
import router from './router'
import {colors} from "vuetify/lib";

Vue.use(Vuetify);
Vue.config.productionTip = false

new Vue({
  vuetify : new Vuetify(
      {
        icons: {
          iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
        },
        theme: {
          themes: {
            light: {
              primary: colors.blue.lighten4,
              secondary: colors.blue.darken4,
              // accent: colors.indigo,
              error: colors.red.darken1,
//         warning: ...,
//         info: ...,
//         success: ... ,
            }
//       dark:{
//         primary: colors.lime.darken2
      }
           }
           }
        
     
  ),
  router,
    render: h => h(App)
}).$mount('#app')

