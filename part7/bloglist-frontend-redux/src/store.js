import { configureStore } from '@reduxjs/toolkit'

import messageReducer from './reducers/messageReducer'

const store = configureStore({
  reducer: {
    message: messageReducer
  }
})

export default store