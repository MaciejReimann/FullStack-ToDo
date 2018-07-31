const APIURL = '/api/todos/';

function getTodos() {
  fetch(APIURL)
  .then(response => {
    if(!response.ok) {
      if(response.status >=400 && response.status < 500) {
        return response.json().then(data => {
          let err = {errorMessage: data.message};
          throw err;
        })
      } else {
        let err = {errorMessage: 'PLease try again later; server is not responding'}
        throw err;
      }
    }
    return response.json();
  })
}

export { getTodos }
