
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
    showErrorSnackbar: false,
    unauthorizedLoginCount: 0,
  },
  reducers: {
    unauthorizedReceived(state, action) {
      state.unauthorizedLoginCount = state.unauthorizedLoginCount + 1
      state.showLayer = LAYERS.LOGIN
    },
    querySucceeded(state, action) {
      state.showLayer = LAYERS.RESUME
    },
    otherQueryError(state, action) {
      state.showLayer = LAYERS.LOGIN // TODO FIXME
      state.showErrorSnackbar = true
    },
  }
})

export default slice
const { actions, reducer } = slice
export { actions, reducer, LAYERS }
