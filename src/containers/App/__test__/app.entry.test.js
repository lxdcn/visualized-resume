import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { AUTH_SESSION_STORAGE_KEY } from '../../../auth'

import { StyledApp as App } from '../index'
import { LAYERS } from '../../../reducers/ui-state'

Enzyme.configure({ adapter: new Adapter() })

describe('<App />', () => {
  it('when mount App without ?key=XXXX, show login if no auth key in sessionStorage', () => {
    const sendRequest = jest.fn()
    const showLoginDirectly = jest.fn()
    const location = {}
    const props = {
      sendRequest,
      showLoginDirectly,
      location
    }
    sessionStorage.removeItem(AUTH_SESSION_STORAGE_KEY)

    const wrapper = shallow(<App {...props} />).dive()

    expect(showLoginDirectly.mock.calls.length).toBe(1)
    expect(sendRequest.mock.calls.length).toBe(0)
  })

  it('when mount App without ?key=XXXX, sendRequest if there is auth key in sessionStorage', () => {
    const sendRequest = jest.fn()
    const showLoginDirectly = jest.fn()
    const location = {}
    const props = {
      sendRequest,
      showLoginDirectly,
      location
    }
    sessionStorage.setItem(AUTH_SESSION_STORAGE_KEY, 'value')

    const wrapper = shallow(<App {...props} />).dive()

    expect(sendRequest.mock.calls.length).toBe(1)
    expect(showLoginDirectly.mock.calls.length).toBe(0)

    sessionStorage.removeItem(AUTH_SESSION_STORAGE_KEY)
  })

  it('when mount App with ?key=XXXX, populate sessionStorage, then sendRequest', () => {
    const sendRequest = jest.fn()
    const showLoginDirectly = jest.fn()
    const location = { search: '?key=ba73fegcd'}
    const props = {
      sendRequest,
      showLoginDirectly,
      location
    }
    sessionStorage.setItem(AUTH_SESSION_STORAGE_KEY, 'value')
    const spy = jest.spyOn(window.sessionStorage.__proto__, 'setItem')
    const wrapper = shallow(<App {...props} />).dive()

    expect(sendRequest.mock.calls.length).toBe(1)
    expect(showLoginDirectly.mock.calls.length).toBe(0)
    expect(sessionStorage.getItem(AUTH_SESSION_STORAGE_KEY)).toEqual('ba73fegcd')
    expect(spy).toHaveBeenCalled()

    sessionStorage.removeItem(AUTH_SESSION_STORAGE_KEY)
    spy.mockRestore()
  })

  it('when show user Login, clear ?key=XXXX from address bar if any', () => {
    const sendRequest = jest.fn()
    const showLoginDirectly = jest.fn()
    const location = { search: '?key=ba73fegcd'}
    const props = {
      sendRequest,
      showLoginDirectly,
      location,
      showLayer: LAYERS.LOADING
    }
    const spy = jest.spyOn(window.history.__proto__, 'pushState')

    const wrapper = shallow(<App {...props} />).dive()
    wrapper.setProps({ classes: {} })
    expect(spy).not.toHaveBeenCalled()

    wrapper.setProps({ showLayer: LAYERS.LOGIN })
    expect(spy).toHaveBeenCalledTimes(1)

    wrapper.setProps({ showLayer: LAYERS.RESUME })
    expect(spy).toHaveBeenCalledTimes(1)

    spy.mockRestore()
  })
})
