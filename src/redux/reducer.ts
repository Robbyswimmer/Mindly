const defaultState = {
  user: {
    email:'',
    firstName:'',
    lastName:'',
    profileImgUrl:'',
    chatId: '',
    isTherapist: false,
    menuOpen: false,
    refresh: false
  }
}

export default function reducer(
  state = defaultState,
  {type, payload} : {type: string; [payload: string]:any}
): any {
  switch(type){
    case 'SET_USER_STATE':
      return {
        ...state,
        user: {
          email:payload.email,
          firstName:payload.firstName,
          lastName:payload.lastName,
          profileImgUrl:payload.profileImgUrl,
          chatId:payload._id,
          isTherapist:payload.isTherapist
        }
      }
    case 'UPDATE_NAME':
      return {
        ...state,
        user: {
          email:state.user.email,
          firstName:payload.firstName,
          lastName:payload.lastName,
          profileImgUrl:state.user.profileImgUrl,
          chatId:state.user.chatId,
          isTherapist:state.user.isTherapist
        }
      }
      case 'SET_PROFILE_IMG_URL':
        return {
          ...state,
          user: {
            email:state.user.email,
            firstName:state.user.firstName,
            lastName:state.user.lastName,
            chatId:state.user.chatId,
            isTherapist:state.user.isTherapist,
            profileImgUrl:payload
          }
        }
      case 'SIGN_OUT':
        return {
          ...state,
          user: {
            email:'',
            firstName:'',
            lastName:'',
            profileImgUrl:'',
            chatId: '',
            isTherapist: false
          }
      }
      case 'OPEN_MENU':
        return {
          ...state,
          user: {
            email:state.user.email,
            firstName:state.user.firstName,
            lastName:state.user.lastName,
            profileImgUrl:state.user.profileImgUrl,
            chatId:state.user.chatId,
            isTherapist:state.user.isTherapist,
            menuOpen: true
          }
      }
      case 'CLOSE_MENU':
        return {
          ...state,
          user: {
            email:state.user.email,
            firstName:state.user.firstName,
            lastName:state.user.lastName,
            profileImgUrl:state.user.profileImgUrl,
            chatId:state.user.chatId,
            isTherapist:state.user.isTherapist,
            menuOpen: false
          }
      }
      case 'REFRESH':
      return {
        ...state,
        user: {
          email:'',
          firstName:'',
          lastName:'',
          profileImgUrl:'',
          chatId: '',
          isTherapist: false,
          refresh: payload.refresh
        }
      }
  }
  return state
}
