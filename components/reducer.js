const initialState = {  
  session: {},
  public_key :''
};

export default function (state = initialState, action) {
  switch (action.type) {    
    case 'SET_SESSION':
      return {
        ...state, session: action.session
      }    
    case 'RESET_STATE':
      return {
        ...initialState
      } 
    default:
  }
  return state;
}
