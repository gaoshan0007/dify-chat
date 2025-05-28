import Vue from 'vue';
import App from './App.vue';
import router from './router'; 
import store from './store';   
import Antd from 'ant-design-vue'; 
import 'ant-design-vue/dist/antd.less'; 
import './assets/tailwind.css'; 

Vue.config.productionTip = false;

Vue.use(Antd); 

new Vue({
  router,  
  store,   
  render: h => h(App),
  async created() { // Add created hook
    await this.$store.dispatch('initialize'); // Dispatch initialize action
  }
}).$mount('#app');
