<template>
  <!-- 
    Original Tailwind classes: flex h-full items-center flex-[4] overflow-hidden justify-center text-primary font-semibold
    Adjusted for Tailwind v1: 'flex-[4]' replaced with 'flex-grow'. 
    The 'flex-grow: 4' behavior might require custom CSS if precise ratio is needed beyond what 'flex-grow' provides by default.
  -->
  <div class="flex h-full items-center flex-grow overflow-hidden justify-center text-primary font-semibold">
    <div class="flex items-center rounded-3xl shadow-md py-2 px-4 text-sm bg-theme-btn-bg dark:shadow-none overflow-hidden">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CenterTitleWrapper',
});
</script>

<style scoped>
/* 
  Tailwind classes used (adjusted for v1 where necessary):
  - flex, h-full, items-center, flex-grow (replaces flex-[4]), overflow-hidden, justify-center, text-primary, font-semibold
  - rounded-3xl, shadow-md, py-2, px-4, text-sm, bg-theme-btn-bg, dark:shadow-none

  Notes:
  - 'flex-grow' is used instead of 'flex-[4]' due to Tailwind CSS v1.x limitations. 
    If a specific grow factor of 4 is strictly needed, custom CSS might be required, e.g.,
    .custom-flex-grow-4 { flex-grow: 4; }
  - Ensure 'text-primary' and 'bg-theme-btn-bg' are defined in the Tailwind theme configuration.
    For example, if they were custom theme colors:
    .text-primary {
      /* color: var(--primary-color, #007bff); */
    }
    .bg-theme-btn-bg {
      /* background-color: var(--theme-btn-bg-color, #f0f0f0); */
    }
  - 'dark:shadow-none' implies dark mode is configured in Tailwind (e.g., via a class strategy).
    Tailwind v1.x has limited dark mode support out-of-the-box compared to v2/v3. 
    It might require `tailwindcss-dark-mode` plugin or manual setup.
*/
</style>
