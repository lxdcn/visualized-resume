import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from "react-router-dom"
import App from './containers/App'
import * as serviceWorker from './serviceWorker'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import { configureStore } from 'redux-starter-kit'
import { Provider } from 'react-redux'

import { AUTH_SESSION_STORAGE_KEY } from './auth'

import reducer from './reducers'

import 'normalize.css'


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // with /graphql because of CORS
  request: async operation => operation.setContext({
    headers: {
      authorization: sessionStorage.getItem(AUTH_SESSION_STORAGE_KEY) ? `Bearer ${sessionStorage.getItem(AUTH_SESSION_STORAGE_KEY)}` : ''
    }
  }),
})

const store = configureStore({
  reducer
})

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ApolloProvider client={client}>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/:key" component={App} />
        </div>
      </ApolloProvider>
    </Router>
  </Provider>,
  document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
