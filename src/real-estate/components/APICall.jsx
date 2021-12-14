import axios from 'axios'


export default function APICall(params) {
    const { url, data } = params
    console.log('params', params)
    const response=  axios.get(url, {
        headers: {
            'x-rapidapi-host': `${process.env.REACT_APP_REAL_ESTATE_API_HOST}`,
            'x-rapidapi-key': `${process.env.REACT_APP_REAL_ESTATE_API_KEY}`

        },
        params: data.params
    })
        .then((res) => {           
           
            return res.data
        })
        .catch((error) => { 
            console.log(error.response)
        })

    return response
}
