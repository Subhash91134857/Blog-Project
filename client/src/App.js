import { useState } from 'react';


import DataProvider from './context/dataProvider';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

//  components
import Login from './Components/Accounts/Login';
import Home from './Components/Home/home';
import Header from './Components/Header/header';
import CreatePost from './Create/createPost';
import Detailview from './Components/Details/Details';
import UpdateBlog from './Create/UpdateBlog';
import About from './Components/about/About';
import Contact from './Components/contact/Contact';
  
//  Making private route

const Privateroute = ({isAuthenticated,...props}) => {
  return isAuthenticated ?
    <>
      <Header/>
      <Outlet/>
    </>
    :<Navigate replace to='/login'/>
}
  
function App() {
//  Authenticating user
  
  const [isAuthenticated, isUserAuthenticated] = useState(false);


  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: 60 }}>
          <Routes>
            <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            <Route path='/' element={<Privateroute isAuthenticated={isAuthenticated} />}>
              <Route path='/' element={<Home/>}/>
            </Route>

            <Route path='/create' element={<Privateroute isAuthenticated={isAuthenticated} />}>
              <Route path='/create' element={<CreatePost />} />
            </Route>

            <Route path='/details/:id' element={<Privateroute isAuthenticated={isAuthenticated} />}>
              <Route path='/details/:id' element={<Detailview />} />
            </Route>

            <Route path='/about' element={<Privateroute isAuthenticated={isAuthenticated} />} >
              <Route path='/about' element={<About />} />
            </Route>

            <Route path='/update/:id' element={<Privateroute isAuthenticated={isAuthenticated} />}>
              <Route path='/update/:id' element={<UpdateBlog />} />
            </Route>

            <Route path='/contact' element={<Privateroute isAuthenticated={isAuthenticated} />}>
              <Route path='/contact' element={<Contact />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
