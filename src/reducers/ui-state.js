
import { createSlice } from 'redux-starter-kit'

export default createSlice({
  slice: 'ui-state',
  initialState: {
    showLayer: '', // LOGIN, LOADING, RESUME
    unauthorizedLoginCount: 0,
  },
  reducers: {
    unauthorizedReceived(state, action) {
      state.unauthorizedLoginCount = state.unauthorizedLoginCount + 1
    },
  }
})
