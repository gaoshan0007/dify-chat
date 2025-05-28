<template>
  <component
    :is="iconComponent"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth"
    :class="className"
    v-bind="$attrs"
    @click="handleClick"
    aria-hidden="true" 
  />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
// For lucide-vue, the icons are Vue components.
// Vue.Component can be used for type hinting.

export default Vue.extend({
  name: 'VueLucideIcon',
  inheritAttrs: false,
  props: {
    iconComponent: {
      type: Object as PropType<Vue.Component>, 
      required: true,
    },
    size: {
      type: Number,
      default: 14,
    },
    color: {
      type: String,
      default: 'currentColor',
    },
    strokeWidth: {
      type: Number,
      default: 2,
    },
    className: {
      type: String,
      default: '', // Allow empty string as default for no extra class
    },
  },
  methods: {
    handleClick(event: MouseEvent) {
      this.$emit('click', event);
    },
  },
});
</script>

<style scoped>
/* No specific styles for this wrapper, styles are typically handled by the icon itself or via className */
/* The component root is the dynamic icon, so className applies directly to it. */
/* If a default styling for all icons passed through this component is desired, 
   you could add a class to the component tag itself in the template, but usually
   the individual lucide icons have their own display properties (like inline-block).
*/
</style>
