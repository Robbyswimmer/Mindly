export const setUserState = (payload: any) => {
  return { type: 'SET_USER_STATE', payload}
}
export const updateName = (payload: any) => {
  return { type: 'UPDATE_NAME', payload}
}
export const setProfileImgUrl = (payload: any) => {
  return { type: 'SET_PROFILE_IMG_URL', payload}
}
export const signOut = (payload: any) => {
  return { type: 'SIGN_OUT', payload}
}
export const closeMenu = (payload: any) => {
  return { type: 'CLOSE_MENU', payload}
}
export const openMenu = (payload: any) => {
  return { type: 'OPEN_MENU', payload}
}
export const refresh = (payload: any) => {
  return { type: 'REFRESH', payload}
}
