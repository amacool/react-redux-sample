import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../redux/user/actions';

class HobbyContainer extends Component {
  passionLevel = '';
  hobbyName = '';
  year = '';
  
  handleAddHobby = () => {
    const {curUser} = this.props;
    if (curUser.index < 0) {
      alert('Please select a user!');
      return;
    }
    if (!this.passionLevel || !this.hobbyName || !this.year) {
      alert('Please input information!');
      return;
    }
    this.props.addHobby({
      userIndex: curUser.index,
      hobby: {
        passionLevel: this.passionLevel,
        hobbyName: this.hobbyName,
        year: this.year
      }
    });
  };
  
  handleRemoveHobby = (index) => {
    this.props.removeHobby({
      userIndex: this.props.curUser.index,
      hobbyIndex: index
    });
  };
  
  render() {
    const {curUser} = this.props;
    return (
      <div>
        <div className='hobby-item hobby-add'>
          <select className='passion' onChange={(e) => this.passionLevel = e.target.value} defaultValue=''>
            <option value='' disabled>Select your option</option>
            <option>Medium</option>
            <option>High</option>
            <option>Low</option>
          </select>
          <input className='hobby' type='text' placeholder='Enter user hobby' onChange={(e) => this.hobbyName = e.target.value} />
          <input className='year' type='text' placeholder='Enter year' onChange={(e) => this.year = e.target.value} />
          <span onClick={this.handleAddHobby}>Add</span>
        </div>
        <div className='hobby-item-container'>
        {curUser.info && curUser.info.hobbies.map((hobby, index) =>
          <div className='hobby-item' key={index}>
            <div className='hobby-item-left'>
              <span>{hobby.passionLevel}</span>
              <span>{hobby.hobbyName}</span>
              <span>{hobby.year}</span>
            </div>
            <div className='hobby-item-right'>
              <svg onClick={() => this.handleRemoveHobby(index)} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 225 225' width='225' height='225'>
                <defs>
                  <image width='225' height='225' id='img1' href='data:image/png;base64,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'/>
                </defs>
                <style>
                
                </style>
                <use id='Background' href='#img1' x='0' y='0' />
              </svg>
            </div>
          </div>)
        }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  curUser: state.User.curUser,
  users: state.User.users
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({
      addHobby: userActions.addHobby,
      removeHobby: userActions.removeHobby
    }, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HobbyContainer);