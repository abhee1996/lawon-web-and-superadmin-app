import { createStore, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import reducer from './store/reducer'
 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer= persistReducer(persistConfig,reducer)
const store = createStore(persistedReducer, applyMiddleware(createLogger()), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const persistor = persistStore(store)
export {store , persistor};