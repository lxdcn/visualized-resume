
import { createSlice } from 'redux-starter-kit'

const slice = createSlice({
  slice: 'ui-state',
  initialState: {
    showLayer: '', // LOGIN, LOADING, RESUME
    showErrorSnackbar: false,
    unauthorizedLoginCount: 0,
  },
  reducers: {
    unauthorizedReceived(state, action) {
      state.unauthorizedLoginCount = state.unauthorizedLoginCount + 1
      state.showLayer = 'LOGIN'
    },
    querySucceeded(state, action) {
      state.showLayer = 'RESUME'
    },
    otherQueryError(state, action) {
      state.showLayer = 'XXXXX'
      state.showErrorSnackbar = true
    },
  }
})

export default slice
const { actions, reducer } = slice
export { actions, reducer }
