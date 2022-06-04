const fetchApi = async endpoint => {
    await fetch(`https://restcountries.com/v3.1/${endpoint}`)
    .then(res => res.json())
    .then(end => console.log(end))
    .catch(e => console.log(e.message))
}

export default fetchApi;