const fetchApi = async (endpoint, setApi, state) => {
    try {
      setApi({...state, loading: true});
      let response = await fetch(`https://restcountries.com/v3.1/${endpoint}`)
      let data;
      // if(response.status >= 400) {
      //     // let error = response.status;
      //     throw new Error(response.statusText)
      // }
      data = await response.json(); 
      return data;
    } catch (error) {
      setApi && setApi({...state, error: {hasError: true,  message: error.toString()}});
    }
}
export default fetchApi;