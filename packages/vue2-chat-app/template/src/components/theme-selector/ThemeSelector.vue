<template>
  <a-dropdown placement="bottomRight">
    <template #overlay>
      <a-menu :selectedKeys="[themeMode]" @click="handleThemeChange">
        <a-menu-item :key="ThemeModeEnum.SYSTEM">
          <VueLucideIcon :iconComponent="ScreenShareIcon" :size="16" class="mr-2" />
          {{ ThemeModeLabelEnum.SYSTEM }}
        </a-menu-item>
        <a-menu-item :key="ThemeModeEnum.LIGHT">
          <VueLucideIcon :iconComponent="SunIcon" :size="16" class="mr-2" />
          {{ ThemeModeLabelEnum.LIGHT }}
        </a-menu-item>
        <a-menu-item :key="ThemeModeEnum.DARK">
          <VueLucideIcon :iconComponent="MoonStarIcon" :size="16" class="mr-2" />
          {{ ThemeModeLabelEnum.DARK }}
        </a-menu-item>
      </a-menu>
    </template>
    <slot>
      <!-- Default trigger if no slot content is provided -->
      <div class="flex items-center cursor-pointer p-2">
        <VueLucideIcon :iconComponent="defaultTriggerIcon" :size="20" />
      </div>
    </slot>
  </a-dropdown>
</template>

<script lang="ts">
import Vue, { Component } from 'vue'; // Import Component for typing lucide icons
import { mapState, mapActions } from 'vuex';
import { Dropdown as ADropdown, Menu as AMenu } from 'ant-design-vue';
import VueLucideIcon from '../shared/VueLucideIcon.vue';
import { ScreenShare, Sun, MoonStar } from 'lucide-vue';
import { ThemeModeEnum, ThemeModeLabelEnum, ThemeEnum } from '@/core/constants';

export default Vue.extend({
  name: 'ThemeSelector',
  components: {
    ADropdown,
    AMenu,
    AMenuItem: AMenu.Item,
    VueLucideIcon,
  },
  data() {
    return {
      // Lucide icons for the template
      ScreenShareIcon: ScreenShare as Component,
      SunIcon: Sun as Component,
      MoonStarIcon: MoonStar as Component,
    };
  },
  computed: {
    ...mapState(['themeMode', 'currentTheme']),

    // Expose Enums to the template
    ThemeModeEnum(): typeof ThemeModeEnum {
      return ThemeModeEnum;
    },
    ThemeModeLabelEnum(): typeof ThemeModeLabelEnum {
      return ThemeModeLabelEnum;
    },

    defaultTriggerIcon(): Component {
      // Ensure currentTheme is treated as ThemeEnum
      const currentThemeTyped = this.currentTheme as ThemeEnum;
      if (currentThemeTyped === ThemeEnum.DARK) {
        return MoonStar as Component;
      }
      // Add more logic if 'system' mode should show a different icon initially
      // For now, default to Sun for LIGHT or SYSTEM (when not dark)
      return Sun as Component;
    }
  },
  methods: {
    ...mapActions(['updateThemePreference']),
    handleThemeChange(item: { key: ThemeModeEnum }) { 
      // Type item.key based on usage
      this.updateThemePreference(item.key);
    },
  },
});
</script>

<style scoped>
/* Add any specific styles for the ThemeSelector itself if needed */
/* For example, if the default slot trigger needs specific styling not covered by Tailwind */
.mr-2 { /* Assuming Tailwind is available for utility classes */
  margin-right: 0.5rem; 
}
</style>
