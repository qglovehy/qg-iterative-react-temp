import { combineReducers, legacy_createStore as createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
//配置数据的持久化效果
import storage from 'redux-persist/lib/storage';

import counter from './counter';

//合并多个模块
const Reducer = combineReducers({ counter });

//定义配置的信息
const persistenceConfig = {
  key: 'qg-iterative-react-redux-local',
  storage,
  // blacklist: ['不想缓存的状态的名字']
};

//创建持久化的配置persist的信息
const persistenceReducers = persistReducer(persistenceConfig, Reducer);

//创建存储对象并且抛出对象
const store = createStore(persistenceReducers);

//使用persistStore包裹一下
const persistence = persistStore(store);

//抛出store和持久化工具两个对象信息
export { store, persistence };
