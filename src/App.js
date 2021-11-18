import './App.css';
import {useEffect} from 'react';
import Customer from './components-factory/components/Customer';
import Footer from './components-factory/Layout/Footer';
import { Header } from './components-factory/Layout/Header';
import Signup from './components-factory/components/Signup';
import { ItemList } from './components-factory/components/ItemList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Test } from './components-factory/components/Test';
import { SecuredRoute } from './components-factory/components/SecuredRoute';

function App() {
  useEffect(()=>{
    localStorage.setItem('isLoggedIn', false);
  },[])
  return (
    <div>
      <BrowserRouter>
      <Header/>
        <Routes>

          <Route path="/register" element={<Signup />} exact ></Route>
          <Route path="/dashboard" exact element= {<SecuredRoute component={ItemList}/>}></Route>
          <Route path="/test" component={Test} exact></Route>
        
        </Routes>

      </BrowserRouter>

      <Footer></Footer>
    </div>
  );
}

export default App;
