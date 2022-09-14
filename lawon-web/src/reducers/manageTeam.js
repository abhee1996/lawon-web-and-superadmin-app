const initialState = {
    loading: false,
    errorMessage: '',
  }
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      default: {
        return initialState;
      }
    }
  }
  
  export default reducer;