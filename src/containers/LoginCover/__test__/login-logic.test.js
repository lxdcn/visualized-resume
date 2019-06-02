import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { AUTH_SESSION_STORAGE_KEY } from '../../../auth'

import { StyledLoginCover as LoginCover } from '../index'

Enzyme.configure({ adapter: new Adapter() })

describe('<LoginCover />, login logic', () => {
  it('Nothing happens when typed 17 chars for login', () => {
    const sendRequest = jest.fn()
    sessionStorage.setItem(AUTH_SESSION_STORAGE_KEY, 'value')
    const spy = jest.spyOn(window.sessionStorage.__proto__, 'setItem')

    const wrapper = shallow(<LoginCover sendRequest={sendRequest}/>, { disableLifecycleMethods: true })
    wrapper.dive().instance().keyTyped('12345678901234567')

    expect(sendRequest.mock.calls.length).toBe(0)
    expect(sessionStorage.getItem(AUTH_SESSION_STORAGE_KEY)).toEqual('value')
    expect(spy).not.toHaveBeenCalled()

    sessionStorage.removeItem(AUTH_SESSION_STORAGE_KEY)
    spy.mockRestore()
  })

  it('Will set sessionStorage and sendRequest with 16 chars', () => {
    const sendRequest = jest.fn()
    sessionStorage.setItem(AUTH_SESSION_STORAGE_KEY, 'value')
    const spy = jest.spyOn(window.sessionStorage.__proto__, 'setItem')

    const wrapper = shallow(<LoginCover sendRequest={sendRequest}/>, { disableLifecycleMethods: true })
    wrapper.dive().instance().keyTyped('1234567890123456')

    expect(sendRequest.mock.calls.length).toBe(1)
    expect(sessionStorage.getItem(AUTH_SESSION_STORAGE_KEY)).toEqual('1234567890123456')
    expect(spy).toHaveBeenCalled()

    sessionStorage.removeItem(AUTH_SESSION_STORAGE_KEY)
    spy.mockRestore()
  })
})
