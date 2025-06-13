import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    content: '',
    isError: false
  },
  reducers: {
    showMessage(state, action) {
      return { content: action.payload.message,
        isError: action.payload.isError
       }
    },
    removeMessage(state, action) {
      return { content: '' }
    }
  }
})

export const { showMessage, removeMessage } = messageSlice.actions

export const setNotification = (message, isError, timeout) => {
  return dispatch => {
    dispatch(showMessage({message, isError}))
    setTimeout(() => {
      dispatch(removeMessage())
    }, timeout*1000)
  }
}

export default messageSlice.reducer