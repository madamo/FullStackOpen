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

export const setNotification = (message, timeout) => {
  return dispatch => {
    dispatch(showMessage(message))
    setTimeout(() => {
      dispatch(removeMessage())

    }, timeout*1000)
  }
}

export default messageSlice.reducer