import { createStore } from "redux";
import allReducers from "./reducers/AllReducers";
import { Task } from "../model/Task";
import { Name } from "../model/Name";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

export interface IAppState {
  tasks: Task[];
  name: Name;
}

const INITIAL_STATE: IAppState = {
  tasks: [],
  name: { name: "" }
};

// 永続化の設定
const persistConfig = {
  key: "root", // Storageに保存されるキー名を指定する
  storage, // 保存先としてlocalStorageがここで設定される
  whitelist: ["tasks", "name"] // Stateは`todos`のみStorageに保存する
  // blacklist: ['visibilityFilter'] // `visibilityFilter`は保存しない
};

// 永続化設定されたReducerとして定義
const persistedReducer = persistReducer(persistConfig, allReducers);

const appStore = createStore(
  persistedReducer,
  INITIAL_STATE as any,
  (window as any).devToolsExtension && (window as any).devToolsExtension()
);

export const persistor = persistStore(appStore);
export default appStore;
