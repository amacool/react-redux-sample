import actions from './actions';
import { users } from '../../mock';

const initState = {
  users: users,
  curUser: {
    info: null,
    index: -1
  },
};

export default function userReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_USER:
      return {
        ...state,
        curUser: {
          info: state.users[action.data],
          index: action.data
        }
      };
    case actions.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.data]
      };
    case actions.REMOVE_USER:
      return {
        ...state,
        users: state.users.filter((user, index) => index !== action.data)
      };

    case actions.ADD_HOBBY:
      let newUsers = state.users.map((user, index) =>
        index === action.data.userIndex ?
          {
            ...user,
            hobbies: [...user.hobbies, action.data.hobby]
          } :
          user
      );
      let curUser = {
        ...state.curUser,
        info: newUsers.filter((user, index) => index === action.data.userIndex)[0],
      };
      return {
        ...state,
        users: newUsers,
        curUser
      };
      
    case actions.REMOVE_HOBBY:
      let newUsers1 = state.users.map((user, index) =>
        index === action.data.userIndex ?
          {
            ...user,
            hobbies: user.hobbies.filter((hobby, index) => index !== action.data.hobbyIndex)
          } :
          user
      );
      let curUser1 = {
        ...state.curUser,
        info: newUsers1.filter((user, index) => index === action.data.userIndex)[0],
      };
      return {
        ...state,
        users: newUsers1,
        curUser: curUser1
      };
      
    default:
      return state;
  }
}
