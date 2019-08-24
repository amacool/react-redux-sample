const userActions = {
  GET_USERS: 'GET_USERS',
  GET_USER: 'GET_USER',
  ADD_USER: 'ADD_USER',
  REMOVE_USER: 'REMOVE_USER',
  
  GET_HOBBIES: 'GET_HOBBIES',
  ADD_HOBBY: 'ADD_HOBBY',
  REMOVE_HOBBY: 'REMOVE_HOBBY',
  
  getUser: (data) => ({type: userActions.GET_USER, data}),
  addUser: (data) => ({type: userActions.ADD_USER, data}),
  
  addHobby: (data) => ({type: userActions.ADD_HOBBY, data}),
  removeHobby: (data) => ({type: userActions.REMOVE_HOBBY, data})
};

export default userActions;
