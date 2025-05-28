/**
 * Application Mode Enums (assuming structure from previous tasks)
 */
export enum AppModeEnums {
  TEXT_GENERATOR = 'completion',
  CHATBOT = 'chat',
  WORKFLOW = 'workflow',
  CHATFLOW = 'advanced-chat',
  AGENT = 'agent-chat',
}

export const AppModeLabels = {
  [AppModeEnums.TEXT_GENERATOR]: 'Text Generator',
  [AppModeEnums.CHATBOT]: 'Chatbot',
  [AppModeEnums.WORKFLOW]: 'Workflow',
  [AppModeEnums.CHATFLOW]: 'Chatflow',
  [AppModeEnums.AGENT]: 'Agent',
};

export const AppModeNames = {
  [AppModeEnums.TEXT_GENERATOR]: '文本生成',
  [AppModeEnums.CHATBOT]: '聊天助手',
  [AppModeEnums.WORKFLOW]: '工作流',
  [AppModeEnums.CHATFLOW]: '支持工作流编排的聊天助手',
  [AppModeEnums.AGENT]: '具备推理和自主调用能力的聊天助手',
};

const getAppModelFullName = (mode: AppModeEnums) => {
  return `${AppModeLabels[mode]}（${AppModeNames[mode]}）`;
};

export const AppModeOptions = [
  AppModeEnums.CHATBOT,
  AppModeEnums.WORKFLOW,
  AppModeEnums.CHATFLOW,
  AppModeEnums.AGENT,
  AppModeEnums.TEXT_GENERATOR,
].map(mode => {
  return {
    label: getAppModelFullName(mode),
    value: mode,
  };
});

export const OpeningStatementDisplayMode = {
  Default: 'default',
  Always: 'always',
};

export const OpeningStatementDisplayModeOptions = [
  {
    label: '默认（开始对话前展示）',
    value: OpeningStatementDisplayMode.Default,
  },
  {
    label: '总是展示',
    value: OpeningStatementDisplayMode.Always,
  },
];

/**
 * Theme Enums
 */
export enum ThemeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum ThemeModeEnum {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark',
}

export enum ThemeModeLabelEnum {
  SYSTEM = '跟随系统',
  LIGHT = '浅色',
  DARK = '深色',
}

export const ThemeModeOptions = [
  { label: ThemeModeLabelEnum.SYSTEM, value: ThemeModeEnum.SYSTEM },
  { label: ThemeModeLabelEnum.LIGHT, value: ThemeModeEnum.LIGHT },
  { label: ThemeModeLabelEnum.DARK, value: ThemeModeEnum.DARK },
];
