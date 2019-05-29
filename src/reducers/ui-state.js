import { createSlice } from 'redux-starter-kit'
import { AUTH_SESSION_STORAGE_KEY } from '../auth'

const LAYERS = {
  LOGIN: 'LOGIN',
  LOADING: 'LOADING',
  RESUME: 'RESUME',
}


const unauthorizedReceived = () => {
  sessionStorage.removeItem(AUTH_SESSION_STORAGE_KEY)
  return {
    type: 'ui-state/unauthorizedReceived'
  }
}
unauthorizedReceived.toString = () => unauthorizedReceived().type
unauthorizedReceived.type = unauthorizedReceived().type


const slice = createSlice({
  slice: 'ui-state',
  initialState: {
    showLayer: LAYERS.LOADING,
    sendRequestToggleFlag: true,
    showErrorSnackbar: false,
    unauthorizedLoginCount: 0,
  },
  reducers: {
    sendRequest: state => {
      state.showLayer = LAYERS.LOADING
      state.sendRequestToggleFlag = !state.sendRequestToggleFlag
    },
    showLoginDirectly: state => {
      state.showLayer = LAYERS.LOGIN
    },
    querySucceeded: state => {
      state.showLayer = LAYERS.RESUME
    },
    otherQueryError: state => {
      state.showLayer = LAYERS.LOADING
      state.showErrorSnackbar = true
    },
    errorSnackbarClosed: state => {
      state.showLayer = LAYERS.RESUME
      state.showErrorSnackbar = false
    }
  },
  extraReducers: {
    [unauthorizedReceived]: state => {
      state.unauthorizedLoginCount = state.unauthorizedLoginCount + 1
      state.showLayer = LAYERS.LOGIN
    }
  }
})


export default slice

const { reducer } = slice
const actions = {
  ...slice.actions,
  unauthorizedReceived
}
export { actions, reducer, LAYERS }
