import React, {useEffect} from 'react'
import axios from 'axios'

export const AxiosRequest = (config, success, fail) => {
    const { methodType, urlType, dataType } = config
   
      
        let result = axios({
            // console.log('extras', extras) 
                method: methodType,
                url: urlType,
                data: dataType
            })
                .then((res) => {
                    console.log('trying ', res)
                    return 'true'
                    
    
    
    
                })
                .catch((error) => {
                    console.log('error', error, error.response)
                    return 'false'
                   
    
    
                })
        
      
 

    console.log('config ==', config.method)

    // make the API call

    return (
        <div>
         <h1>{result}</h1>  
        </div>
    )
}
