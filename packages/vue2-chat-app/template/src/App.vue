<template>
  <div id="app">
    <!-- Global layout elements can go here, like a navbar -->
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import { ThemeModeEnum, ThemeEnum } from '@/core/constants'; // Adjust path if needed

export default Vue.extend({
  name: 'App',
  data() {
    return {
      // Store the listener function itself to be able to remove it.
      mediaQueryListener: null as null | ((event: MediaQueryListEvent) => void),
    };
  },
  computed: {
    // mapState returns functions, ensure computed properties are correctly typed if needed
    // or access via this.$store.state.themeMode directly if mapState typing is tricky
    ...mapState(['themeMode', 'currentTheme']), 
  },
  watch: {
    currentTheme(newTheme: ThemeEnum) {
      this.applyBodyClass(newTheme);
    },
    themeMode(newMode: ThemeModeEnum, oldMode: ThemeModeEnum | null) { 
      this.handleThemeModeChange(newMode, oldMode);
    },
  },
  methods: {
    ...mapMutations(['setCurrentTheme']), // Maps this.setCurrentTheme to a mutation commit

    applyBodyClass(theme: ThemeEnum) {
      if (theme === ThemeEnum.DARK) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    },
    evaluateSystemTheme() {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setCurrentTheme(systemPrefersDark ? ThemeEnum.DARK : ThemeEnum.LIGHT);
    },
    handleThemeModeChange(newMode: ThemeModeEnum, oldMode: ThemeModeEnum | null) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      // Clean up old listener if mode was system
      if (oldMode === ThemeModeEnum.SYSTEM && this.mediaQueryListener) {
        mediaQuery.removeEventListener('change', this.mediaQueryListener);
        this.mediaQueryListener = null; // Clear the stored listener
      }

      if (newMode === ThemeModeEnum.LIGHT) {
        this.setCurrentTheme(ThemeEnum.LIGHT);
      } else if (newMode === ThemeModeEnum.DARK) {
        this.setCurrentTheme(ThemeEnum.DARK);
      } else if (newMode === ThemeModeEnum.SYSTEM) {
        this.evaluateSystemTheme(); // Set initial theme based on system
        // Define the listener function if it's not already defined or if it was cleared
        if (!this.mediaQueryListener) { 
            this.mediaQueryListener = () => this.evaluateSystemTheme();
            mediaQuery.addEventListener('change', this.mediaQueryListener);
        }
      }
    },
  },
  mounted() {
    // Initial theme setup based on themeMode from store (loaded by initTheme action)
    // The type assertion helps if Vuex types aren't perfectly inferred by mapState here
    this.handleThemeModeChange(this.themeMode as ThemeModeEnum, null); 
    
    // Ensure body class is applied after initial currentTheme is determined by handleThemeModeChange.
    // currentTheme watcher will also trigger applyBodyClass, but $nextTick ensures it's applied
    // after the initial synchronous calls in handleThemeModeChange (like setCurrentTheme) have
    // potentially updated currentTheme.
    this.$nextTick(() => {
        this.applyBodyClass(this.currentTheme as ThemeEnum);
    });
  },
  beforeDestroy() {
    if (this.mediaQueryListener) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.removeEventListener('change', this.mediaQueryListener);
      this.mediaQueryListener = null; // Clean up
    }
  },
});
</script>

<style>
/* Global styles can go here, or be imported from other files */
/* Ensure Tailwind base styles are applied if not done elsewhere */
/* For example, if you have a main CSS file processed by PostCSS:
   @import 'tailwindcss/base';
   @import 'tailwindcss/components';
   @import 'tailwindcss/utilities';
*/

/* Basic styling for the app div to ensure it's visible */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
