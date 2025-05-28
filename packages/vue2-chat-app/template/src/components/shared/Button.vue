<template>
  <button
    type="button"
    :class="buttonClasses"
    :style="buttonStyle"
    @click="handleClick"
    v-bind="$attrs" 
  >
    {{ label }}
  </button>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({
  name: 'DemoButton',
  inheritAttrs: false, // To prevent default binding to root when explicitly using v-bind="$attrs"
  props: {
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium',
      validator: (value: string) => ['small', 'medium', 'large'].includes(value),
    },
    backgroundColor: {
      type: String,
      default: null, 
    },
    label: {
      type: String,
      required: true,
    },
  },
  computed: {
    buttonClasses(): string[] { 
      const mode = this.primary ? 'demo-button--primary' : 'demo-button--secondary';
      return [
        'demo-button',
        `demo-button--${this.size}`,
        mode,
      ];
    },
    buttonStyle(): Record<string, string> {
      const style: Record<string, string> = {};
      if (this.backgroundColor) {
        style.backgroundColor = this.backgroundColor;
      }
      return style;
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
.demo-button {
	font-weight: 700;
	border: 0;
	border-radius: 3em;
	cursor: pointer;
	display: inline-block;
	line-height: 1;
}

.demo-button--primary {
	color: white;
	background-color: #1ea7fd;
}

.demo-button--secondary {
	color: #333;
	background-color: transparent;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
}

.demo-button--small {
	font-size: 12px;
	padding: 10px 16px;
}

.demo-button--medium {
	font-size: 14px;
	padding: 11px 20px;
}

.demo-button--large {
	font-size: 16px;
	padding: 12px 24px;
}
</style>
