import { actions } from '../ui-state'

describe('actionsCreator in ui-state', () => {
  it ('all actions should be created', () => {
    expect(actions).toEqual(
      expect.objectContaining({
        sendRequest: expect.any(Function),
        showLoginDirectly: expect.any(Function),
        querySucceeded: expect.any(Function),
        otherQueryError: expect.any(Function),
        unauthorizedReceived: expect.any(Function),
      })
    )
    console.log(actions)
  })

  it ('both createSliced and hand-written actionCreators should work as expected', () => {
    const { sendRequest, unauthorizedReceived } = actions
    expect(sendRequest().type).toEqual('ui-state/sendRequest')
    expect(sendRequest.type).toEqual('ui-state/sendRequest')
    expect('' + sendRequest).toEqual('ui-state/sendRequest')

    expect(unauthorizedReceived().type).toEqual('ui-state/unauthorizedReceived')
    expect(unauthorizedReceived.type).toEqual('ui-state/unauthorizedReceived')
    expect('' + unauthorizedReceived).toEqual('ui-state/unauthorizedReceived')
  })
})
