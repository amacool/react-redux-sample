import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import UserHobbies from './hobbies/index';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1>User Hobbies</h1>
          </header>
          <UserHobbies/>
        </div>
      </Provider>
    );
  }
}

export default App;
