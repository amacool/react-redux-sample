import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../redux/user/actions';

class UserContainer extends Component {
  userName = '';
  
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
  
  render() {
    const {users, curUser} = this.props;
    return (
      <div>
        <div className='user-item user-add'>
          <input type='text' name='username' placeholder='Enter user name' onChange={(e) => this.userName = e.target.value}/>
          <span className='user-add-btn' onClick={this.handleAddUser}>Add</span>
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

const mapStateToProps = state => ({
  users: state.User.users,
  curUser: state.User.curUser
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({
      getUser: userActions.getUser,
      addUser: userActions.addUser
    }, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);