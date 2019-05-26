
import { createSlice } from 'redux-starter-kit'

const LAYERS = {
  LOGIN: 'LOGIN',
  LOADING: 'LOADING',
  RESUME: 'RESUME',
}

const slice = createSlice({
  slice: 'ui-state',
  initialState: {
    showLayer: '', // LOGIN, LOADING, RESUME
    sendRequestToggleFlag: true,
    showErrorSnackbar: false,
    unauthorizedLoginCount: 0,
  },
  reducers: {
    sendRequest(state, action) {
      state.showLayer = LAYERS.LOADING
      state.sendRequestToggleFlag = !state.sendRequestToggleFlag
    },
    showLoginDirectly(state, action) {
      state.showLayer = LAYERS.LOGIN
    },
    unauthorizedReceived(state, action) {
      state.unauthorizedLoginCount = state.unauthorizedLoginCount + 1
      state.showLayer = LAYERS.LOGIN
    },
    querySucceeded(state, action) {
      state.showLayer = LAYERS.RESUME
    },
    otherQueryError(state, action) {
      // state.showErrorSnackbar = true
      state.unauthorizedLoginCount = state.unauthorizedLoginCount + 1 // TODO FIXME
      state.showLayer = LAYERS.LOGIN // TODO FIXME
    },
  }
})

export default slice
const { actions, reducer } = slice
export { actions, reducer, LAYERS }
