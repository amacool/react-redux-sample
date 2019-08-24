import React, {Component} from 'react';
import axios from "axios";
import { create } from "react-test-renderer";
import { users, curUser } from '../mock';

jest.mock("axios");

class UserContainer extends Component {
  userName = '';
  state = {
    users: [],
    curUser: null
  };
  
  handleClickUser = (index) => {
    this.props.getUser(index);
  };
  
  handleAddUser = () => {
    if (!this.userName) {
      alert('Please input user name!');
      return;
    }
    this.props.addUser({
      userName: this.userName,
      hobbies: []
    });
  };
  
  async componentDidMount() {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    // shows mock data
    console.log(response);
    this.setState({users: response.users, curUser: response.curUser});
  }
  
  render() {
    const {users, curUser} = this.state;
    return (
      <div>
        <div className="user-item user-add">
          <input type="text" name="username" placeholder="Enter user name" onChange={(e) => this.userName = e.target.value}/>
          <span className="user-add-btn" onClick={this.handleAddUser}>Add</span>
        </div>
        <div className='user-item-container'>
          {users.map((user, index) =>
            <div className={`user-item ${curUser.index === index ? 'selected' : ''}`} key={index} onClick={() => this.handleClickUser(index)}>
              <span>{user.userName}</span>
            </div>)
          }
        </div>
      </div>
    )
  }
}

describe('components', () => {
  it("shows a list of users", async () => {
    axios.get.mockResolvedValue({users, curUser});
    const component = create(<UserContainer />);
    const instance = component.getInstance();
    await instance.componentDidMount();
  });
});
