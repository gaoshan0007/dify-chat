import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex'; 
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import DifyAppService from '@/services/dify-app-service'; 
import { IDifyAppItem } from '@/core/repository'; 
import { AppModeEnums, ThemeEnum, ThemeModeEnum } from '@/core/constants'; // Import Theme Enums
import { IConversationItem } from '@/core/types'; 

Vue.use(Vuex);

const localStorageKeyForTheme = 'dify-chat-theme-mode';

export interface RootState {
  user: string | null;
  mode: 'singleApp' | 'multiApp';
  appConfig: Omit<IDifyAppItem, 'id' | 'info'> & { info?: { mode?: AppModeEnums } } | null;
  appService: DifyAppService | null;
  enableSetting: boolean;
  isInitialized: boolean;
  apps: IDifyAppItem[]; 
  currentApp: IDifyAppItem | null; 
  conversations: IConversationItem[]; 
  currentConversationId: string | null; 
  themeMode: ThemeModeEnum; 
  currentTheme: ThemeEnum; 
}

const state: RootState = {
  user: null,
  mode: 'multiApp', 
  appConfig: null,
  appService: null,
  enableSetting: true, 
  isInitialized: false,
  apps: [], 
  currentApp: null, 
  conversations: [], 
  currentConversationId: null, 
  themeMode: ThemeModeEnum.SYSTEM, 
  currentTheme: ThemeEnum.LIGHT, 
};

const mutations = {
  setUser(state: RootState, userId: string) {
    state.user = userId;
  },
  setMode(state: RootState, mode: 'singleApp' | 'multiApp') {
    state.mode = mode;
  },
  setAppConfig(state: RootState, config: RootState['appConfig']) {
    state.appConfig = config;
  },
  setAppService(state: RootState, service: DifyAppService) {
    state.appService = service;
  },
  setEnableSetting(state: RootState, enabled: boolean) {
    state.enableSetting = enabled;
  },
  setInitialized(state: RootState, initialized: boolean) {
    state.isInitialized = initialized;
  },
  setApps(state: RootState, apps: IDifyAppItem[]) {
    state.apps = apps;
  },
  addApp(state: RootState, app: IDifyAppItem) {
    state.apps.push(app);
  },
  updateApp(state: RootState, updatedApp: IDifyAppItem) {
    const index = state.apps.findIndex(app => app.id === updatedApp.id);
    if (index !== -1) {
      Vue.set(state.apps, index, updatedApp);
    }
  },
  removeApp(state: RootState, appId: string) {
    state.apps = state.apps.filter(app => app.id !== appId);
  },
  setCurrentApp(state: RootState, app: IDifyAppItem | null) {
    state.currentApp = app;
  },
  setConversations(state: RootState, conversations: IConversationItem[]) {
    state.conversations = conversations;
  },
  setCurrentConversationId(state: RootState, conversationId: string | null) {
    state.currentConversationId = conversationId;
  },
  addConversation(state: RootState, conversation: IConversationItem) {
    state.conversations.push(conversation);
  },
  updateConversation(state: RootState, updatedConversation: IConversationItem) {
    const index = state.conversations.findIndex(c => c.id === updatedConversation.id);
    if (index !== -1) {
      Vue.set(state.conversations, index, updatedConversation);
    }
  },
  removeConversation(state: RootState, conversationId: string) {
    state.conversations = state.conversations.filter(c => c.id !== conversationId);
  },
  setThemeMode(state: RootState, mode: ThemeModeEnum) {
    state.themeMode = mode;
  },
  setCurrentTheme(state: RootState, theme: ThemeEnum) {
    state.currentTheme = theme;
  },
};

const actions = {
  async initialize({ commit, dispatch }: ActionContext<RootState, RootState>) { 
    try {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      commit('setUser', result.visitorId);

      const appServiceInstance = new DifyAppService();
      commit('setAppService', appServiceInstance);
      
      commit('setMode', 'multiApp'); 
      commit('setEnableSetting', true);
      
      await dispatch('initTheme'); 

      commit('setInitialized', true);
    } catch (error) {
      console.error("Error during store initialization:", error);
      // Optionally re-throw or handle critical initialization errors
    }
  },

  async fetchApps({ commit, state }: ActionContext<RootState, RootState>) {
    if (!state.appService) {
      console.error("AppService not initialized when fetching apps");
      throw new Error("AppService not initialized"); // Ensure consistency
    }
    try {
      const appsList = await state.appService.getApps();
      commit('setApps', appsList);
    } catch (error) {
      console.error("Error fetching apps:", error);
      throw error; // Re-throw for component to handle
    }
  },

  async addNewApp({ commit, state }: ActionContext<RootState, RootState>, newAppConfig: IDifyAppItem) {
    if (!state.appService) {
      console.error("AppService not initialized when adding new app");
      throw new Error("AppService not initialized"); // MODIFIED: throw error
    }
    try {
      await state.appService.addApp(newAppConfig);
      commit('addApp', newAppConfig); 
    } catch (error) {
      console.error("Error adding new app:", error);
      throw error; // MODIFIED: re-throw error
    }
  },

  async editApp({ commit, state }: ActionContext<RootState, RootState>, updatedAppConfig: IDifyAppItem) {
    if (!state.appService) {
      console.error("AppService not initialized when editing app");
      throw new Error("AppService not initialized"); // MODIFIED: throw error
    }
    try {
      await state.appService.updateApp(updatedAppConfig);
      commit('updateApp', updatedAppConfig);
    } catch (error) {
      console.error("Error editing app:", error);
      throw error; // MODIFIED: re-throw error
    }
  },

  async deleteExistingApp({ commit, state }: ActionContext<RootState, RootState>, appId: string) {
    if (!state.appService) {
      console.error("AppService not initialized when deleting app");
      throw new Error("AppService not initialized"); // MODIFIED: throw error
    }
    try {
      await state.appService.deleteApp(appId);
      commit('removeApp', appId);
    } catch (error) {
      console.error("Error deleting app:", error);
      throw error; // MODIFIED: re-throw error
    }
  },
  
  async selectApp({ commit, state }: ActionContext<RootState, RootState>, appId: string) {
    if (!state.appService) {
      console.error("AppService not initialized when selecting app");
      throw new Error("AppService not initialized"); // Ensure consistency
    }
    try {
      const app = await state.appService.getApp(appId);
      commit('setCurrentApp', app || null);
    } catch (error) {
      console.error("Error selecting app:", error);
      throw error; // Re-throw for component to handle
    }
  },

  loadConversations({ commit }: ActionContext<RootState, RootState>, conversations: IConversationItem[]) {
    commit('setConversations', conversations);
  },
  selectConversation({ commit }: ActionContext<RootState, RootState>, conversationId: string | null) {
    commit('setCurrentConversationId', conversationId);
  },

  initTheme({ commit }: ActionContext<RootState, RootState>) {
    const savedMode = localStorage.getItem(localStorageKeyForTheme) as ThemeModeEnum | null;
    commit('setThemeMode', savedMode || ThemeModeEnum.SYSTEM);
  },
  updateThemePreference({ commit }: ActionContext<RootState, RootState>, mode: ThemeModeEnum) {
    commit('setThemeMode', mode);
    localStorage.setItem(localStorageKeyForTheme, mode);
  },
};

const getters = {
  getUser: (state: RootState): string | null => state.user,
  getMode: (state: RootState): 'singleApp' | 'multiApp' => state.mode,
  getAppConfig: (state: RootState): RootState['appConfig'] => state.appConfig,
  getAppService: (state: RootState): DifyAppService | null => state.appService,
  isEnableSetting: (state: RootState): boolean => state.enableSetting,
  isStoreInitialized: (state: RootState): boolean => state.isInitialized,
  getAppsList: (state: RootState): IDifyAppItem[] => state.apps,
  getCurrentApp: (state: RootState): IDifyAppItem | null => state.currentApp,
  getConversationsList: (state: RootState): IConversationItem[] => state.conversations,
  getCurrentConversationId: (state: RootState): string | null => state.currentConversationId,
  getCurrentConversationInfo: (state: RootState): IConversationItem | undefined => {
    if (!state.currentConversationId) {
      return undefined;
    }
    return state.conversations.find(c => c.id === state.currentConversationId);
  },
  getThemeMode: (state: RootState): ThemeModeEnum => state.themeMode,
  getCurrentTheme: (state: RootState): ThemeEnum => state.currentTheme,
  isDark: (state: RootState): boolean => state.currentTheme === ThemeEnum.DARK,
};

export default new Vuex.Store<RootState>({
  state,
  mutations,
  actions,
  getters,
});
