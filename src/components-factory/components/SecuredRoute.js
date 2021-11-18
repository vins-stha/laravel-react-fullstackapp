import { React, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Signup from './Signup';
import { ItemList } from './ItemList';

export const SecuredRoute = (props) => {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    const navigate = useNavigate();
    let Comp = props.component;
    useEffect(() => {
        console.log('logged?', isLoggedIn);
      
    

    }, [])
    if (isLoggedIn === true) {
        return (
            <div>
                <ItemList/>           
            </div>
        )
    }
   else {
        return (
            <div>
               {navigate('/register')}
            </div>
        )
    }

}
