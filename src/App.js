import React, { Component } from 'react';
import { Provider } from 'react-redux'; 
import { createStore } from 'redux';
import * as firebase from 'firebase';
import reducers from './reducers';
import LoginForm from './components/LoginForm';

class App extends Component {
  componentWillMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyDLetFyprc1enUnQTTVuIL9jiX2THdESkI',
      authDomain: 'employee-manager-97aee.firebaseapp.com',
      databaseURL: 'https://employee-manager-97aee.firebaseio.com',
      projectId: 'employee-manager-97aee',
      storageBucket: 'employee-manager-97aee.appspot.com',
      messagingSenderId: '767837344893'
    };    
    
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <LoginForm />
      </Provider>
    );
  }
}

export default App;
