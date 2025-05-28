<template>
  <a-form :form="form" @submit.prevent="handleSubmit" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" label-align="left">
    <!-- Basic Settings Section -->
    <div class="text-gray-500 text-sm font-medium mb-2 mt-4">基础设置</div>
    <a-form-item label="应用名称" :colon="false" v-if="mode !== 'create'">
      <span class="ant-form-text">{{ initialData.info && initialData.info.name }}</span>
    </a-form-item>
    <a-form-item label="应用类型" :colon="false" v-if="mode !== 'create'">
      <span class="ant-form-text">{{ initialData.info && initialData.info.mode }}</span>
    </a-form-item>
    <a-form-item label="应用标签" :colon="false" v-if="mode !== 'create' && initialData.info && initialData.info.tags && initialData.info.tags.length">
      <span class="ant-form-text">
        <a-tag v-for="tag in initialData.info.tags" :key="tag">{{ tag }}</a-tag>
      </span>
    </a-form-item>

    <a-form-item label="应用描述" :colon="false">
      <a-input
        v-decorator="['info_description', {
          rules: [{ required: true, message: '请输入应用描述' }],
        }]"
        placeholder="请输入应用描述"
        :disabled="mode !== 'create'"
      />
    </a-form-item>

    <!-- API Settings Section -->
    <div class="text-gray-500 text-sm font-medium mb-2 mt-4">API 设置</div>
    <a-form-item label="API Base" :colon="false" help="Dify API 的域名+版本号前缀，例如：https://api.dify.ai/v1">
      <a-input
        v-decorator="['requestConfig_apiBase', {
          rules: [{ required: true, message: '请输入 API Base' }],
        }]"
        placeholder="请输入 API Base，例如：https://api.dify.ai/v1"
        :disabled="mode !== 'create'"
      />
    </a-form-item>
    <a-form-item label="API Key" :colon="false" help="Dify App 的 API 密钥">
      <a-input-password
        v-decorator="['requestConfig_apiKey', {
          rules: [{ required: true, message: '请输入 API Key' }],
        }]"
        placeholder="请输入 API Key"
        autoComplete="new-password"
      />
    </a-form-item>

    <!-- Advanced Settings Section -->
    <div class="text-gray-500 text-sm font-medium mb-2 mt-4">高级设置</div>
    <a-form-item label="回复表单" :colon="false">
      <a-switch
        v-decorator="['answerForm_enabled', { valuePropName: 'checked' }]"
      />
    </a-form-item>
    <a-form-item label="提交消息文本" :colon="false" v-if="answerFormEnabledValue">
      <a-input
        v-decorator="['answerForm_feedbackText']"
        placeholder="可选，默认为“反馈已收到，我们会尽快处理”"
      />
    </a-form-item>

    <a-form-item label="对话参数更新" :colon="false" help="开启后，允许在对话开始后更新对话输入参数。">
      <a-switch
        v-decorator="['inputParams_enableUpdateAfterCvstStarts', { valuePropName: 'checked' }]"
      />
    </a-form-item>
    <a-form-item label="开场白展示模式" :colon="false">
      <a-select
        v-decorator="['extConfig_conversation_openingStatement_displayMode']"
        placeholder="请选择开场白展示模式"
      >
        <a-select-option v-for="option in OpeningStatementDisplayModeOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </a-select-option>
      </a-select>
    </a-form-item>

    <!-- Form actions are typically handled by the parent component -->
  </a-form>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Form, Input, Select, Switch, Tag, Icon, message } from 'ant-design-vue';
import { AppModeOptions, OpeningStatementDisplayModeOptions } from '@/core/constants';
import { IDifyAppItem } from '@/core/repository'; // Or from @/core/types

// Helper to create form fields for mapPropsToFields
const createFormField = Form.createFormField;

// Default values based on the original React component's initialValues
const defaultInitialValues = {
  info_name: '', // Not directly editable in form, but for completeness
  info_description: '',
  requestConfig_apiBase: '',
  requestConfig_apiKey: '',
  answerForm_enabled: false,
  answerForm_feedbackText: '',
  inputParams_enableUpdateAfterCvstStarts: false,
  extConfig_conversation_openingStatement_displayMode: 'default',
};

export default Vue.extend({
  name: 'SettingForm',
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AInputPassword: Input.Password,
    ASelect: Select,
    ASelectOption: Select.Option,
    ASwitch: Switch,
    ATag: Tag,
    AIcon: Icon,
  },
  props: {
    mode: {
      type: String as PropType<'create' | 'edit'>,
      required: true,
    },
    initialData: {
      type: Object as PropType<Partial<IDifyAppItem>>,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {} as any, // Ant Design Form instance, initialized in beforeCreate
      answerFormEnabledValue: (this.initialData.answerForm && this.initialData.answerForm.enabled) || defaultInitialValues.answerForm_enabled,
      // Make constants available to the template
      AppModeOptions,
      OpeningStatementDisplayModeOptions,
    };
  },
  watch: {
    initialData: {
      handler(newData) {
        this.resetAndSetFormFields(newData);
      },
      deep: true,
      // immediate: false, // Let mapPropsToFields handle initial load
    },
  },
  beforeCreate() {
    this.form = this.$form.create(this, {
      name: 'setting_form',
      onValuesChange: (props, changedValues, allValues) => {
        this.handleFormValuesChange(props, changedValues, allValues);
      },
      mapPropsToFields: () => {
        return this.mapInitialDataToFields(this.initialData);
      },
    });
  },
  methods: {
    mapInitialDataToFields(data: Partial<IDifyAppItem>) {
      const fields: any = {};
      const currentData = { ...data }; // Shallow copy

      // Helper to get nested values safely
      const getValue = (obj: any, path: string[], defaultValue: any) => {
        let current = obj;
        for (const key of path) {
          if (current && typeof current === 'object' && key in current) {
            current = current[key];
          } else {
            return defaultValue;
          }
        }
        return current;
      };
      
      fields.info_description = createFormField({ value: getValue(currentData, ['info', 'description'], defaultInitialValues.info_description) });
      fields.requestConfig_apiBase = createFormField({ value: getValue(currentData, ['requestConfig', 'apiBase'], defaultInitialValues.requestConfig_apiBase) });
      fields.requestConfig_apiKey = createFormField({ value: getValue(currentData, ['requestConfig', 'apiKey'], defaultInitialValues.requestConfig_apiKey) });
      fields.answerForm_enabled = createFormField({ value: getValue(currentData, ['answerForm', 'enabled'], defaultInitialValues.answerForm_enabled) });
      fields.answerForm_feedbackText = createFormField({ value: getValue(currentData, ['answerForm', 'feedbackText'], defaultInitialValues.answerForm_feedbackText) });
      fields.inputParams_enableUpdateAfterCvstStarts = createFormField({ value: getValue(currentData, ['inputParams', 'enableUpdateAfterCvstStarts'], defaultInitialValues.inputParams_enableUpdateAfterCvstStarts) });
      fields.extConfig_conversation_openingStatement_displayMode = createFormField({ value: getValue(currentData, ['extConfig', 'conversation', 'openingStatement', 'displayMode'], defaultInitialValues.extConfig_conversation_openingStatement_displayMode) });
      
      return fields;
    },

    mapDataToSetFieldsValue(data: Partial<IDifyAppItem>) {
      const values: any = {};
      const currentData = { ...data };

      const getValue = (obj: any, path: string[], defaultValue: any) => {
        // ... (same as above)
        let current = obj;
        for (const key of path) {
          if (current && typeof current === 'object' && key in current) {
            current = current[key];
          } else {
            return defaultValue;
          }
        }
        return current;
      };

      values.info_description = getValue(currentData, ['info', 'description'], defaultInitialValues.info_description);
      values.requestConfig_apiBase = getValue(currentData, ['requestConfig', 'apiBase'], defaultInitialValues.requestConfig_apiBase);
      values.requestConfig_apiKey = getValue(currentData, ['requestConfig', 'apiKey'], defaultInitialValues.requestConfig_apiKey);
      values.answerForm_enabled = getValue(currentData, ['answerForm', 'enabled'], defaultInitialValues.answerForm_enabled);
      values.answerForm_feedbackText = getValue(currentData, ['answerForm', 'feedbackText'], defaultInitialValues.answerForm_feedbackText);
      values.inputParams_enableUpdateAfterCvstStarts = getValue(currentData, ['inputParams', 'enableUpdateAfterCvstStarts'], defaultInitialValues.inputParams_enableUpdateAfterCvstStarts);
      values.extConfig_conversation_openingStatement_displayMode = getValue(currentData, ['extConfig', 'conversation', 'openingStatement', 'displayMode'], defaultInitialValues.extConfig_conversation_openingStatement_displayMode);
      
      return values;
    },

    resetAndSetFormFields(newData: Partial<IDifyAppItem>) {
      if (this.form && this.form.resetFields) {
        this.form.resetFields(); // Reset to initial values defined by mapPropsToFields or v-decorator initialValue
      }
      // After reset, mapPropsToFields should ideally re-run if the component re-renders
      // or explicitly set values if mapPropsToFields is not re-triggered by prop change alone
      // For Antdv1, mapPropsToFields is called on init. For subsequent changes, setFieldsValue is better.
      // The watcher needs to be careful to not conflict with mapPropsToFields on initial load.
      // The current mapPropsToFields uses this.initialData, so if initialData changes,
      // and the component is re-keyed or if mapPropsToFields is somehow re-triggered, it would update.
      // Otherwise, setFieldsValue is needed.
      if (this.form && this.form.setFieldsValue) {
         this.$nextTick(() => { // Ensure form is mounted and ready
            const mappedValues = this.mapDataToSetFieldsValue(newData || {});
            this.form.setFieldsValue(mappedValues);
            // Also update answerFormEnabledValue based on new data
            this.answerFormEnabledValue = mappedValues.answerForm_enabled;
         });
      }
    },

    handleFormValuesChange(props: any, changedValues: any, allValues: any) {
      // Check for nested field name, antdv1 might use underscores
      const answerFormEnabledKey = Object.keys(allValues).find(k => k.startsWith('answerForm_enabled'));
      if (answerFormEnabledKey && changedValues.hasOwnProperty(answerFormEnabledKey)) {
         this.answerFormEnabledValue = allValues[answerFormEnabledKey];
      } else if (changedValues.hasOwnProperty('answerForm') && typeof changedValues.answerForm === 'object') {
        // if changedValues.answerForm is { enabled: true/false }
        if (changedValues.answerForm.hasOwnProperty('enabled')) {
            this.answerFormEnabledValue = changedValues.answerForm.enabled;
        }
      }
    },
    
    getFormData(): Promise<IDifyAppItem> {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err: any, values: any) => {
          if (err) {
            reject(err);
          } else {
            // Reconstruct the nested structure for the output
            const output: Partial<IDifyAppItem> = {
              info: {
                name: this.initialData.info?.name || '', // Name is not in form, retain from initial
                mode: this.initialData.info?.mode,   // Mode is not in form, retain from initial
                tags: this.initialData.info?.tags || [], // Tags not in form, retain
                description: values.info_description,
              },
              requestConfig: {
                apiBase: values.requestConfig_apiBase,
                apiKey: values.requestConfig_apiKey,
              },
              answerForm: {
                enabled: values.answerForm_enabled,
                feedbackText: values.answerForm_feedbackText || '',
              },
              inputParams: {
                enableUpdateAfterCvstStarts: values.inputParams_enableUpdateAfterCvstStarts,
              },
              extConfig: {
                conversation: {
                  openingStatement: {
                    displayMode: values.extConfig_conversation_openingStatement_displayMode,
                  },
                },
              },
            };
            // Add id if it's an edit operation
            if (this.mode === 'edit' && this.initialData && this.initialData.id) {
              (output as IDifyAppItem).id = this.initialData.id;
            }
            resolve(output as IDifyAppItem);
          }
        });
      });
    },

    handleSubmit() {
      // This form is typically submitted by a parent component that calls getFormData
      // console.log('Form submit triggered, but should be handled by parent via getFormData()');
    },
  },
  mounted() {
      // Set initial value for answerFormEnabledValue based on mapped fields
      // mapPropsToFields will have run, now get the value from the form instance
      this.$nextTick(() => { // Ensure form has been initialized
          const initialAnswerFormEnabled = this.form.getFieldValue('answerForm_enabled');
          if (typeof initialAnswerFormEnabled === 'boolean') {
              this.answerFormEnabledValue = initialAnswerFormEnabled;
          }
      });
  }
});
</script>

<style scoped>
/* Section header style */
.text-gray-500.text-sm.font-medium {
  color: #6b7280; /* Example gray */
  font-size: 0.875rem;
  font-weight: 500;
}
/* Other styles are primarily Tailwind. Ensure theme colors like bg-primary are defined. */
/* For example: */
/* .bg-primary { background-color: var(--primary-color, #1890ff); } */
</style>
