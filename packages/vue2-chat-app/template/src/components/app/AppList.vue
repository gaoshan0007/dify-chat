<template>
  <div>
    <div
      v-for="item in list"
      :key="item.id"
      :class="[
        'p-3 bg-theme-bg mt-3 border border-solid border-gray-200 rounded-lg cursor-pointer hover:border-primary hover:text-primary',
        { 'text-primary border-primary bg-gradient-to-r from-cyan-50 to-blue-50': selectedId === item.id }
      ]"
      @click="handleAppSelect(item)"
    >
      <div class="w-full flex items-center">
        <div class="flex-1 overflow-hidden flex items-center">
          <span class="font-semibold truncate">{{ item.info.name }}</span>
          <template v-if="item.info.tags && item.info.tags.length">
            <a-tag v-for="tag in item.info.tags" :key="tag" class="ml-2">
              {{ tag }}
            </a-tag>
          </template>
        </div>
        <a-dropdown :trigger="['click']" placement="bottomRight">
          <a-icon type="more" class="hover:text-primary p-1" @click.stop /> <!-- Added p-1 for easier clicking and stop propagation -->
          <template #overlay>
            <a-menu @click="({ key: menuKey, domEvent }) => handleMenuClick(menuKey, item, domEvent)">
              <a-menu-item key="update">更新配置</a-menu-item>
              <a-menu-item key="delete" class="text-red-500">删除</a-menu-item> <!-- Added text-red-500 for danger -->
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div class="truncate text-sm mt-2 text-desc">
        {{ item.info.description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Dropdown as ADropdown, Menu as AMenu, Tag as ATag, Icon as AIcon, message } from 'ant-design-vue';
import { IDifyAppItem } from '@/core/repository'; // Or from @/core/types, using repository as per common pattern

export default Vue.extend({
  name: 'AppList',
  components: {
    ADropdown,
    AMenu,
    AMenuItem: AMenu.Item,
    ATag,
    AIcon,
  },
  props: {
    selectedId: {
      type: String,
      default: null,
    },
    list: {
      type: Array as PropType<IDifyAppItem[]>,
      required: true,
      default: () => [],
    },
  },
  methods: {
    handleAppSelect(item: IDifyAppItem) {
      this.$emit('select-change', item.id, item);
    },
    async handleMenuClick(key: string, item: IDifyAppItem, event: MouseEvent) {
      event.stopPropagation(); // Prevent app selection when clicking menu items

      if (key === 'update') {
        this.$emit('update-app', item.id, item);
        // Parent component is responsible for handling the update and messages
      } else if (key === 'delete') {
        try {
          // Check if the listener exists before calling it as a function
          const deleteAppListener = this.$listeners['delete-app'];
          if (typeof deleteAppListener === 'function') {
            await (deleteAppListener as Function)(item.id); // Call parent's promise
            message.success('删除应用成功');
          } else {
            // Fallback or warning if no listener is provided, though parent should handle this.
            console.warn('delete-app listener not provided or not a function');
            // message.info('删除操作未配置'); // Or some other user feedback
          }
        } catch (error) {
          message.error('删除应用失败');
          console.error('Failed to delete app:', error);
        }
      }
    },
  },
});
</script>

<style scoped>
/* Tailwind classes are used primarily. Ensure theme colors like primary, text-desc, bg-theme-bg are defined. */
/* Example placeholders: */
/* .text-primary { color: var(--primary-color, #1890ff); } */
/* .border-primary { border-color: var(--primary-color, #1890ff); } */
/* .hover\:text-primary:hover { color: var(--primary-color, #1890ff); } */
/* .hover\:border-primary:hover { border-color: var(--primary-color, #1890ff); } */
/* .text-desc { color: var(--text-description-color, rgba(0, 0, 0, 0.45)); } */
/* .bg-theme-bg { background-color: var(--theme-bg-color, #fff); } */
/* .bg-gradient-to-r { Ensure gradient classes are configured in Tailwind if not default } */

/* Added style for danger item in menu for Ant Design Vue 1.x */
.text-red-500 {
  color: #f5222d; /* Ant Design's danger color */
}
.text-red-500:hover {
  color: #ff4d4f; 
}

/* Ensure cursor pointer is applied to the clickable icon */
.anticon-more {
  cursor: pointer;
}
</style>
