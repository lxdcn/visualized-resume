import { reducer, LAYERS, actions } from '../ui-state'

describe('Reducers in ui-state', () => {
  it ('showLoginDirectly would alter showLayer', () => {
    expect(
      reducer({ showLayer: '' }, actions.showLoginDirectly())
    ).toMatchObject({
      showLayer: LAYERS.LOGIN
    })
  })

  it ('unauthorizedReceived would increment unauthorizedLoginCount', () => {
    expect(
      reducer({ unauthorizedLoginCount: 9 }, actions.unauthorizedReceived())
    ).toMatchObject({
      unauthorizedLoginCount: 10
    })
  })
})
