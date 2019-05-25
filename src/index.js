import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from "react-router-dom"
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import { configureStore } from 'redux-starter-kit'
import { Provider } from 'react-redux'

import reducer from './reducers'
import { defaults, resolvers } from './resolvers/UiState'

import 'normalize.css'


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // with /graphql because of CORS
  request: async operation => operation.setContext({
    headers: {
      authorization: sessionStorage.getItem('key') ? `Bearer ${sessionStorage.getItem('key')}` : ''
    }
  }),
  clientState: { defaults, resolvers }
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
