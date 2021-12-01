import './App.css';
import Footer from './components-factory/Layout/Footer';
import { Header } from './components-factory/Layout/Header';
import Signup from './components-factory/components/Signup';
import { ItemList } from './components-factory/components/ItemList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Test } from './components-factory/components/Test';
import { SecuredRoute } from './components-factory/components/SecuredRoute';
import { Login } from './components-factory/components/admin/Login';
import { AdminRegister } from './components-factory/components/admin/AdminRegister';
import { AdminDashboard } from './components-factory/components/admin/AdminDashboard';
import ViewLists from './components-factory/components/admin/ViewLists';
import { EditItem } from './components-factory/components/admin/EditItem';

function App() {

  return (
    <div>
      <BrowserRouter>
      <Header/>
        <Routes>
        
          <Route path="/register" element={<Signup />} exact ></Route>
          <Route path="/dashboard" exact element= {<SecuredRoute renderThis={<ItemList/>}/>}></Route>
          <Route path="/test" exact element= {<SecuredRoute renderThis={<Test/>}/>}></Route>
        
        </Routes>

      </BrowserRouter>

      
      {/* Admin side */}
      <BrowserRouter>
        <Routes>
        <Route path="/admin/" element={<Login />} exact ></Route>
        <Route path="/admin/login" element={<Login />} exact ></Route>
        <Route path="/admin/register" element={<AdminRegister />} exact ></Route>
        <Route path="/admin/dashboard" element={<AdminDashboard />} exact ></Route>
        <Route path="/admin/list/" element={<ViewLists/>} exact/>
        <Route path="/admin/edit/" element={<EditItem/>} exact/>
        </Routes>
      </BrowserRouter>

      <Footer></Footer>
    </div>
  );
}

export default App;
