import { React, useEffect,useState } from 'react'
import Signup from './Signup';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

export const SecuredRoute = ({renderThis}) => { 
          
    useEffect(() => {   

    // check status of cookie and make it available globally ('/')  
    if (cookie.get('isLoggedInToken') === "undefined")
    {
        cookie.set('isLoggedInToken', false, {path: '/'})
    }

    }, [])

    return(
        <>  
            {/* render the component received in props if logged in else redirect to signin          */}
            {cookie.get('isLoggedInToken') === "true" ? renderThis :(<Signup/>)}
        </>
    )


}
