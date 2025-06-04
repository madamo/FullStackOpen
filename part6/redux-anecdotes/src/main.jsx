import { createRoot } from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

console.log(store.getState())

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)