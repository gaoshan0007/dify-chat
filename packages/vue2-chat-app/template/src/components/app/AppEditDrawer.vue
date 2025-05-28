<template>
  <a-drawer
    :title="drawerTitle"
    :visible="open"
    :width="700"
    @close="handleClose"
    :destroyOnClose="true" 
  >
    <SettingForm
      ref="appSettingsForm"
      :mode="detailDrawerMode"
      :initialData="currentInitialData"
      v-if="open" 
    />
    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    >
      <a-button :style="{ marginRight: '8px' }" @click="handleClose">
        取消
      </a-button>
      <a-button type="primary" @click="handleSubmit" :loading="confirmLoading">
        {{ detailDrawerMode === AppDetailDrawerMode.CREATE ? '创建' : '更新' }}
      </a-button>
    </div>
  </a-drawer>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Drawer as ADrawer, Button as AButton, Space as ASpace, message } from 'ant-design-vue';
import { mapState } from 'vuex';
import SettingForm from './SettingForm.vue';
import { IDifyAppItem } from '@/core/repository';
import { AppModeEnums } from '@/core/constants'; // Assuming AppModeEnums is here

// Local enum mirroring AppDetailDrawerModeEnum
enum AppDetailDrawerModeEnum { CREATE = 'create', EDIT = 'edit' }

// Mock DifyApi as per subtask instructions
class MockDifyApi {
  private config: any;
  constructor(config: any) {
    this.config = config; // Store config if needed for mock behavior
  }
  async getAppInfo(): Promise<any> {
    console.log('MockDifyApi getAppInfo called with config:', this.config);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Return a more complete structure based on what SettingForm might expect for 'info.mode'
    return Promise.resolve({ 
        site: { title: 'Mocked App Name from API' }, // Example structure for app name
        mode: AppModeEnums.CHATBOT, // Example mode
        // Add other fields if your commonInfo construction relies on them
    });
  }
}
const DifyApi = MockDifyApi;

export default Vue.extend({
  name: 'AppEditDrawer',
  components: { SettingForm, AButton, ADrawer, ASpace },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    detailDrawerMode: {
      type: String as PropType<AppDetailDrawerModeEnum>,
      required: true,
    },
    appItem: {
      type: Object as PropType<IDifyAppItem | null>,
      default: null,
    },
  },
  data() {
    return {
      confirmLoading: false,
      currentInitialData: null as Partial<IDifyAppItem> | null,
      // Make enum available to template if needed, or directly use string in template
      AppDetailDrawerMode: AppDetailDrawerModeEnum, 
    };
  },
  computed: {
    ...mapState({
      user: (state: any) => state.user, // Assuming RootState type if available
    }),
    drawerTitle(): string {
      if (this.detailDrawerMode === AppDetailDrawerModeEnum.EDIT) {
        return `编辑应用配置 - ${this.appItem?.info?.name || ''}`;
      }
      return '创建新应用';
    },
  },
  watch: {
    open(isOpen: boolean) {
      if (isOpen) {
        this.prepareForm();
      }
    },
    appItem: {
      handler() { // No need for newItem argument here, `this.appItem` is already updated
        if (this.open && this.detailDrawerMode === AppDetailDrawerModeEnum.EDIT) {
          this.prepareForm();
        }
      },
      deep: true,
    },
    detailDrawerMode() {
      if (this.open) {
        this.prepareForm();
      }
    },
  },
  methods: {
    prepareForm() {
      const defaultValues: Partial<IDifyAppItem['info'] & 
                                 Pick<IDifyAppItem, 'requestConfig' | 'answerForm' | 'inputParams' | 'extConfig'>> = {
        // From original useEffect and SettingForm defaults
        description: '', // info.description
        mode: AppModeEnums.CHATBOT, // info.mode
        requestConfig: { apiBase: '', apiKey: '' },
        answerForm: { enabled: false, feedbackText: '' },
        inputParams: { enableUpdateAfterCvstStarts: false },
        extConfig: { conversation: { openingStatement: { displayMode: 'default' } } },
      };

      if (this.detailDrawerMode === AppDetailDrawerModeEnum.EDIT && this.appItem) {
        // Map appItem to the flat structure SettingForm expects for initialData
        // SettingForm's mapInitialDataToFields and mapDataToSetFieldsValue use underscore notation
        this.currentInitialData = {
            // info
            info_description: this.appItem.info?.description || defaultValues.description,
            // requestConfig
            requestConfig_apiBase: this.appItem.requestConfig?.apiBase || defaultValues.requestConfig?.apiBase,
            requestConfig_apiKey: this.appItem.requestConfig?.apiKey || defaultValues.requestConfig?.apiKey,
            // answerForm
            answerForm_enabled: typeof this.appItem.answerForm?.enabled === 'boolean' ? this.appItem.answerForm.enabled : defaultValues.answerForm!.enabled,
            answerForm_feedbackText: this.appItem.answerForm?.feedbackText || defaultValues.answerForm!.feedbackText,
            // inputParams
            inputParams_enableUpdateAfterCvstStarts: typeof this.appItem.inputParams?.enableUpdateAfterCvstStarts === 'boolean' ? this.appItem.inputParams.enableUpdateAfterCvstStarts : defaultValues.inputParams!.enableUpdateAfterCvstStarts,
            // extConfig
            extConfig_conversation_openingStatement_displayMode: this.appItem.extConfig?.conversation?.openingStatement?.displayMode || defaultValues.extConfig!.conversation!.openingStatement!.displayMode,
            
            // Pass through other parts of appItem that SettingForm might need for display (like name, mode, tags for 'edit')
            info: this.appItem.info, 
        };
      } else { // Create mode
        this.currentInitialData = {
            info_description: defaultValues.description,
            requestConfig_apiBase: defaultValues.requestConfig?.apiBase,
            requestConfig_apiKey: defaultValues.requestConfig?.apiKey,
            answerForm_enabled: defaultValues.answerForm!.enabled,
            answerForm_feedbackText: defaultValues.answerForm!.feedbackText,
            inputParams_enableUpdateAfterCvstStarts: defaultValues.inputParams!.enableUpdateAfterCvstStarts,
            extConfig_conversation_openingStatement_displayMode: defaultValues.extConfig!.conversation!.openingStatement!.displayMode,
            info: { // For create mode, some info fields might be set to defaults or empty
                name: '', // Will be set by API info
                mode: defaultValues.mode, 
                tags: [],
                description: defaultValues.description,
            }
        };
      }
      // SettingForm's watcher on 'initialData' prop will handle resetting and populating the form.
    },
    handleClose() {
      this.$emit('close');
      // currentInitialData will be reset by prepareForm when drawer reopens
    },
    async handleSubmit() {
      const settingFormComp = this.$refs.appSettingsForm as any;
      if (!settingFormComp) {
        message.error('表单引用未找到');
        return;
      }

      try {
        // getFormData returns a Promise with the reconstructed IDifyAppItem structure
        const formValues = await settingFormComp.getFormData() as IDifyAppItem; 
        if (!formValues) return; // Validation failed in child

        this.confirmLoading = true;

        // Mocked API call
        const api = new DifyApi({ 
            user: this.user, // from Vuex
            apiBase: formValues.requestConfig.apiBase, 
            apiKey: formValues.requestConfig.apiKey 
        });
        const difyAppInfo = await api.getAppInfo();

        // Construct commonInfo based on formValues and difyAppInfo
        // Ensure this structure matches IDifyAppItem, excluding 'id'
        const commonInfo: Omit<IDifyAppItem, 'id'> = {
          info: {
            name: difyAppInfo.site?.title || 'Unnamed App', // Use API info for name
            mode: difyAppInfo.mode || formValues.info.mode, // Use API info for mode, fallback to form (if applicable)
            description: formValues.info.description,
            tags: formValues.info.tags || [], // Tags usually come from API or are not in this form
          },
          requestConfig: {
            apiBase: formValues.requestConfig.apiBase,
            apiKey: formValues.requestConfig.apiKey,
          },
          answerForm: formValues.answerForm,
          inputParams: formValues.inputParams,
          extConfig: formValues.extConfig,
        };
        
        if (this.detailDrawerMode === AppDetailDrawerModeEnum.EDIT) {
          if (!this.appItem || !this.appItem.id) {
            message.error('无法更新应用：缺少应用ID');
            this.confirmLoading = false;
            return;
          }
          const appToUpdate: IDifyAppItem = { id: this.appItem.id, ...commonInfo };
          // Mocked Vuex action dispatch
          console.log('Mock dispatch editExistingAppInStore:', appToUpdate);
          // await this.$store.dispatch('editExistingAppInStore', appToUpdate); 
          this.$message.success('应用更新成功 (mocked)');
        } else { // CREATE mode
          const newApp: IDifyAppItem = { id: Math.random().toString(36).substring(2), ...commonInfo };
          // Mocked Vuex action dispatch
          console.log('Mock dispatch addNewAppToStore:', newApp);
          // await this.$store.dispatch('addNewAppToStore', newApp);
          this.$message.success('应用创建成功 (mocked)');
        }
        
        this.$emit('confirm-success');
        this.handleClose();

      } catch (err: any) {
        // If err is from form validation (getFormData rejects)
        if (err && err.errors && err.values) {
          console.error('Form validation error:', err.errors);
          message.error('请检查表单输入');
        } else { // Other errors (e.g., API call, construction)
          console.error('Submit error:', err);
          message.error('操作失败: ' + (err.message || '未知错误'));
        }
      } finally {
        this.confirmLoading = false;
      }
    },
  },
  mounted() {
    if (this.open) {
      this.prepareForm();
    }
  },
});
</script>

<style scoped>
/* Scoped styles for the drawer if needed */
</style>
