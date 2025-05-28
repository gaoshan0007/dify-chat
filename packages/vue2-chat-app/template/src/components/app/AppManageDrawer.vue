<template>
  <a-drawer
    :visible="open"
    @close="handleClose"
    title="应用配置管理"
    :width="isMobile ? '100%' : 700"
    :closable="true"
    :destroyOnClose="true"
  >
    <div class="drawer-content-wrapper">
      <div class="app-list-container">
        <a-spin :spinning="appListLoading">
          <a-row :gutter="isMobile ? 0 : 16" class="w-full" v-if="appList && appList.length">
            <a-col :span="isMobile ? 24 : 12" v-for="item in appList" :key="item.id">
              <div 
                class="app-card"
                :class="{ 'app-card-active': activeAppId === item.id }"
                @click="openEditDrawer(item)"
              >
                <div class="app-card-header">
                  <div class="app-card-title">
                    <span v-if="activeAppId === item.id" class="active-indicator">【当前】</span>{{ item.info.name }}
                  </div>
                  <a-popconfirm
                    title="确定删除此应用吗？"
                    okText="确定"
                    cancelText="取消"
                    @confirm="() => handleDeleteApp(item.id)"
                    @click.stop 
                  >
                    <a-icon type="delete" @click.stop class="app-card-delete-icon" />
                  </a-popconfirm>
                </div>
                <div class="app-card-description">
                  {{ item.info.description }}
                </div>
                <div class="app-card-tags" v-if="item.info.tags && item.info.tags.length">
                  <a-tag v-for="tag in item.info.tags" :key="tag" class="app-card-tag">
                    {{ tag }}
                  </a-tag>
                </div>
              </div>
            </a-col>
          </a-row>
          <a-empty v-else class="empty-apps" description="暂无应用，快去创建一个吧！" />
        </a-spin>
      </div>
      <div class="drawer-footer">
        <a-button type="primary" size="large" block @click="openCreateDrawer">添加应用</a-button>
      </div>
    </div>

    <app-edit-drawer
      :open="appEditDrawerVisible"
      :detailDrawerMode="detailDrawerMode"
      :appItem="selectedAppItemForEdit"
      @close="appEditDrawerVisible = false"
      @confirm-success="handleEditSuccess"
    />
  </a-drawer>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { mapState, mapActions } from 'vuex';
import { Drawer as ADrawer, Spin as ASpin, Row as ARow, Col as ACol, Button as AButton, Popconfirm as APopconfirm, Empty as AEmpty, Tag as ATag, Icon as AIcon, message } from 'ant-design-vue';
import { isMobileMixin } from '../../mixins/isMobileMixin';
import AppEditDrawer from './AppEditDrawer.vue'; // Assuming AppEditDrawer.vue is in the same directory
import { IDifyAppItem } from '@/core/repository'; // Or from @/core/types

const AppDetailDrawerMode = { CREATE: 'create', EDIT: 'edit' };

export default Vue.extend({
  name: 'AppManageDrawer',
  mixins: [isMobileMixin],
  components: {
    ADrawer, ASpin, ARow, ACol, AButton, APopconfirm, AEmpty, ATag, AIcon,
    AppEditDrawer,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    activeAppId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      appEditDrawerVisible: false,
      detailDrawerMode: AppDetailDrawerMode.CREATE as 'create' | 'edit',
      selectedAppItemForEdit: null as IDifyAppItem | null,
    };
  },
  computed: {
    // Assuming RootState type is globally available or imported for better typing
    ...mapState({
      appList: (state: any) => state.apps, // From Turn 30/32, state.apps
      appListLoading: (state: any) => state.appListLoading, // Assuming this exists in Vuex state
      // user: (state: any) => state.user, // Not directly used here, AppEditDrawer uses its own
    }),
  },
  methods: {
    ...mapActions(['fetchApps', 'deleteExistingApp']), // Vuex actions

    handleClose() {
      this.$emit('close');
    },
    openEditDrawer(item: IDifyAppItem) {
      this.selectedAppItemForEdit = { ...item }; // Pass a copy to avoid direct mutation if item is from Vuex state
      this.detailDrawerMode = AppDetailDrawerMode.EDIT;
      this.appEditDrawerVisible = true;
    },
    openCreateDrawer() {
      this.selectedAppItemForEdit = null; // No initial data for create mode
      this.detailDrawerMode = AppDetailDrawerMode.CREATE;
      this.appEditDrawerVisible = true;
    },
    async handleDeleteApp(itemId: string) {
      try {
        await this.deleteExistingApp(itemId); // This action is expected to throw on error
        message.success('删除应用成功');
        this.fetchApps(); // Refresh the list
        this.$emit('delete-success', itemId); // Notify parent if needed
      } catch (error: any) {
        message.error('删除失败: ' + (error.message || '未知错误'));
        console.error('Delete app error in component:', error);
      }
    },
    handleEditSuccess() {
      this.appEditDrawerVisible = false;
      this.fetchApps(); // Refresh the list after successful create/edit
      this.$emit('edit-success'); // Notify parent if needed
    },
  },
  watch: {
    open(isOpen: boolean) {
      // Fetch apps when the drawer is opened, if the list isn't already loaded or is empty
      // This check can be refined based on how appListLoading is managed
      if (isOpen && (!this.appList || this.appList.length === 0) && !this.appListLoading) {
        this.fetchApps();
      }
    },
  },
  // Consider fetching on created or mounted if the drawer might be open initially
  // and the list data is required immediately.
  // mounted() {
  //   if (this.open && (!this.appList || this.appList.length === 0) && !this.appListLoading) {
  //     this.fetchApps();
  //   }
  // }
});
</script>

<style scoped>
.drawer-content-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.app-list-container {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 16px; /* Space for the button below */
}
.drawer-footer {
  padding-top: 16px;
  border-top: 1px solid #e9e9e9;
}

.app-card {
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.3s;
  background-color: #fff; /* Default background */
}
.app-card:hover {
  border-color: #1890ff; /* Ant Design primary color */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
}
.app-card-active {
  border-color: #1890ff;
  background-color: #e6f7ff; /* Ant Design primary-1 */
}
.app-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.app-card-title {
  font-weight: 600;
  font-size: 16px;
  color: #333;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.active-indicator {
  color: #1890ff; /* Ant Design primary color */
  margin-right: 4px;
}
.app-card-delete-icon {
  color: #f5222d; /* Ant Design danger color */
  font-size: 16px; /* Adjust size as needed */
  padding: 4px; /* Make it easier to click */
}
.app-card-delete-icon:hover {
  color: #ff4d4f;
}
.app-card-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 40px; /* Approx 2 lines */
}
.app-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px; /* For spacing between tags if using flex gap */
}
.app-card-tag {
  margin-right: 4px; /* Fallback for no flex-gap support */
  margin-bottom: 4px;
}
.empty-apps {
  margin-top: 40px; /* Give some space for the empty state */
}
</style>
