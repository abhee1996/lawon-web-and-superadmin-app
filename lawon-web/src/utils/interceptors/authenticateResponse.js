export default [
  (res) => res,
  (error) => {
    if (error.response.status == 401) {
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  }
]