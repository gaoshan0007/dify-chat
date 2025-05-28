<template>
  <div class="flex h-16 items-center justify-start !py-0 box-border">
    <div class="h-full flex items-center flex-1 overflow-hidden">
      <img
        class="w-8 h-8 inline-block"
        :src="logoImage"
        draggable="false"
        alt="logo"
      />
      <span
        v-if="!hideText"
        class="inline-block my-0 ml-3 font-bold text-lg text-theme-text"
      >
        Dify Chat
      </span>
    </div>
    <a-button
      v-if="!hideGithubIcon"
      type="link"
      href="https://github.com/lexmin0412/dify-chat"
      target="_blank"
      class="px-0"
    >
      <!-- Use a-icon for Ant Design Vue v1.x compatibility -->
      <a-icon type="github" class="text-lg cursor-pointer text-theme-text" />
    </a-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Button as AButton } from 'ant-design-vue'; 
// GithubOutlined is not imported as @ant-design/icons-vue is for Vue 3 or not installed for Vue 2
// @ts-ignore 
import logoImageFile from '@/assets/images/logo.png'; 

export default Vue.extend({
  name: 'CommonLogo', 
  components: {
    AButton,
    // GithubOutlined is not registered
  },
  props: {
    hideGithubIcon: {
      type: Boolean,
      default: false,
    },
    hideText: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      logoImage: logoImageFile,
    };
  },
});
</script>

<style scoped>
/* Styles are primarily Tailwind classes. Add specific styles here if any were missed or needed. */
/* text-theme-text color needs to be ensured by Tailwind config or global styles */
.text-theme-text {
  /* Define this color if not globally available through Tailwind, e.g. */
  /* color: var(--theme-text-color, #333); */
  /* This should ideally come from the theme setup via Tailwind or Ant Design theming */
}
</style>
