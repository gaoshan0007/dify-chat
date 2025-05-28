<template>
  <div class="h-16 flex items-center justify-between px-4">
    <!-- Left Section -->
    <div class="flex-1 h-full flex items-center justify-start">
      <CommonLogo :hideText="isMobile" :hideGithubIcon="true" />
    </div>

    <!-- Center Section -->
    <CenterTitleWrapper>
      <slot name="title">{{ titleContent }}</slot>
    </CenterTitleWrapper>

    <!-- Right Section -->
    <div class="flex-1 h-full flex items-center justify-end">
      <slot name="right-icon">
        <!-- Default right-icon content -->
        <a-space class="flex items-center">
          <ThemeSelector>
            <template #default> <!-- Slot content for ThemeSelector trigger -->
              <div class="flex items-center cursor-pointer p-1"> <!-- Added padding for better click area -->
                <VueLucideIcon :iconComponent="themeIconComponent" :size="20" />
              </div>
            </template>
          </ThemeSelector>
          <a-button
            type="link"
            href="https://github.com/lexmin0412/dify-chat"
            target="_blank"
            class="px-0"
            aria-label="GitHub Repository"
          >
            <a-icon type="github" class="text-lg cursor-pointer text-theme-text" />
          </a-button>
        </a-space>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { Component as VueComponentType } from 'vue'; // Import Component for typing
import { mapState } from 'vuex';
import { Space as ASpace, Button as AButton, Icon as AIcon } from 'ant-design-vue';
import { MoonStar, Sun, ScreenShare } from 'lucide-vue';

import { isMobileMixin } from '../../mixins/isMobileMixin'; 
import { ThemeModeEnum, RootState } from '../../core/constants'; // Assuming RootState might be in constants or types

import CommonLogo from '../shared/Logo.vue'; 
import CenterTitleWrapper from '../shared/CenterTitleWrapper.vue'; 
import VueLucideIcon from '../shared/VueLucideIcon.vue'; 
import ThemeSelector from '../theme-selector/ThemeSelector.vue'; 

export default Vue.extend({
  name: 'HeaderLayout',
  mixins: [isMobileMixin],
  components: {
    CommonLogo,
    CenterTitleWrapper,
    VueLucideIcon,
    ThemeSelector,
    ASpace,
    AButton,
    AIcon,
  },
  props: {
    titleContent: {
      type: String,
      default: '',
    },
  },
  computed: {
    // It's better to type state explicitly if RootState is available from your store definition
    ...mapState({
      themeMode: (state: RootState) => state.themeMode, 
      // currentTheme: (state: RootState) => state.currentTheme, // Not directly used by themeIconComponent
    }),
    themeIconComponent(): VueComponentType { // Use Vue.Component for type
      if ((this.themeMode as ThemeModeEnum) === ThemeModeEnum.DARK) {
        return MoonStar as VueComponentType;
      }
      if ((this.themeMode as ThemeModeEnum) === ThemeModeEnum.LIGHT) {
        return Sun as VueComponentType;
      }
      // Default to system icon (ScreenShare)
      return ScreenShare as VueComponentType; 
    },
  },
});
</script>

<style scoped>
/* Add any specific styles for HeaderLayout if needed */
/* text-theme-text class on Github icon should be globally available */
.text-theme-text {
  /* This should ideally come from the theme setup via Tailwind or Ant Design theming */
  /* Example: color: var(--theme-text-color, #333); */
}
</style>
