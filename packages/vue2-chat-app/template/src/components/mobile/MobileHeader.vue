<template>
  <div class="h-12 !leading-[3rem] px-4 text-base top-0 z-20 bg-theme-bg w-full shadow-sm font-semibold justify-between flex items-center box-border">
    <!-- Left: Logo Icon -->
    <router-link v-if="mode === 'multiApp'" to="/apps" class="flex items-center">
      <img class="w-5 h-5 inline-block" :src="logoImage" draggable="false" alt="logo" />
    </router-link>
    <div v-else class="flex items-center">
      <img class="w-5 h-5 inline-block" :src="logoImage" draggable="false" alt="logo" />
    </div>

    <!-- Center: Custom Content via Slot -->
    <div class="flex-1 overflow-hidden flex items-center justify-center">
      <slot name="center"></slot>
    </div>

    <!-- Right: GitHub Icon -->
    <a-button
      type="link"
      href="https://github.com/lexmin0412/dify-chat"
      target="_blank"
      class="px-0"
      aria-label="GitHub Repository"
    >
      <a-icon type="github" class="text-xl cursor-pointer text-theme-text" />
    </a-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { Button as AButton, Icon as AIcon } from 'ant-design-vue';
// @ts-ignore 
// Assuming Webpack alias '@' is configured to point to 'src'
// and shims-vue.d.ts or shims-assets.d.ts declares '*.png'
import logoImageFile from '@/assets/images/logo.png'; 
// For RootState typing, assuming it's defined and exported from store or a types file
// import { RootState } from '@/store/types'; // Example path

export default Vue.extend({
  name: 'MobileHeader',
  components: {
    AButton,
    AIcon,
  },
  data() {
    return {
      logoImage: logoImageFile,
    };
  },
  computed: {
    // For stricter typing, import RootState and use:
    // ...mapState({
    //   mode: (state: RootState) => state.mode,
    // }),
    ...mapState({
      mode: (state: any) => state.mode, // From Vuex store (originally from useDifyChat)
    }),
  },
});
</script>

<style scoped>
/* Styles are primarily Tailwind. bg-theme-bg and text-theme-text should be globally available. */
/* Example placeholder for theming if needed */
.bg-theme-bg {
  /* background-color: var(--theme-bg-color, white); */
}
.text-theme-text {
  /* color: var(--theme-text-color, #333); */
}

/* 
  Tailwind v1.x does not support arbitrary values with `!important` modifier directly in the class name like `!leading-[3rem]`.
  The class `!leading-[3rem]` in the template will not work as expected with Tailwind v1.
  Instead, a custom class is defined below as per the subtask's CSS block.
  If the main div in the template uses `custom-leading-3rem` instead of `!leading-[3rem]`, this CSS will apply.
  Alternatively, this specific style can be applied inline or through a more specific selector if only one instance.
  For now, the template uses `!leading-[3rem]` and this CSS provides the definition.
*/
.\!leading-\[3rem\] { /* CSS escape for `!` and `[` `]` is `\`, so `\!leading-\[3rem\]` targets `!leading-[3rem]` */
  line-height: 3rem !important;
}

.text-xl { /* Ensure antd icon size is applied if needed */
    font-size: 1.25rem; /* Default for text-xl */
}
</style>
