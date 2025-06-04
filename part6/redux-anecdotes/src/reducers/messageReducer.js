import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    content: ''
  },
  reducers: {
    showMessage(state, action) {
      return { content: action.payload }
    },
    removeMessage(state, action) {
      return { content: '' }
    }
  }
})

export const { showMessage, removeMessage } = messageSlice.actions
export default messageSlice.reducer