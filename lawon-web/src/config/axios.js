import axios from 'axios';

export const configureAxios = (store) => {
  const { dispatch } = store || {};
  axios.interceptors.response.use((response) => response,
  (error) => {
    const { response } = error || {};
    const { status } = response || {};
    debugger
    if (status == 401 || status == 400) {
      localStorage.clear();
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: { user: '', accessToken: '' }
      });

      window.location = '/#/main/userdashboardmain';
      console.log('/////////////////////// UNAUTHORIZED //////////////////////////')
    }
    return error;
  });
}