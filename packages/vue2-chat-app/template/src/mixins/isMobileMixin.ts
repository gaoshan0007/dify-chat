import Vue from 'vue';

const MOBILE_BREAKPOINT = 768; // pixels, md breakpoint

export const isMobileMixin = Vue.extend({
  data() {
    return {
      isMobile: typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false,
    };
  },
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    },
  },
  created() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize);
      // Call handleResize once at created to set initial value correctly after component is created
      this.handleResize(); 
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
  },
});

// How to use in a component:
// import { isMobileMixin } from '@/mixins/isMobileMixin';
// export default Vue.extend({
//   mixins: [isMobileMixin],
//   mounted() {
//     console.log(this.isMobile); // Access this.isMobile
//   }
// });
