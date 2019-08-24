import React, { Component } from 'react';
import UserContainer from './UserContainer';
import HobbyContainer from './HobbyContainer';
import { connect } from 'react-redux';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

class UserHobbies extends Component {
  render() {
    const {curUser} = this.props;
    return (
      <div className='user-hobby-container'>
        <h2>Users' Hobby List</h2>

        <div className='user-hobby-wrapper'>
          <div className='user-hobby-header'>User Hobbies</div>
          <div className='user-hobby-body'>
            <ResizableBox
              width={200}
              height={336}
              draggableOpts={{axis: 'both'}}
              minConstraints={[200, 336]} maxConstraints={[700, 336]}
              className='hobby-left'
            >
              <UserContainer />
            </ResizableBox>
            <ResizableBox
              width={800}
              height={336}
              draggableOpts={{axis: 'none'}}
              minConstraints={[800, 336]} maxConstraints={[800, 336]}
              className='hobby-right'
            >
              {curUser.info && <HobbyContainer />}
            </ResizableBox>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  curUser: state.User.curUser
});

export default connect(mapStateToProps)(UserHobbies);
