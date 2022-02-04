import React ,{useState,useEffect} from 'react';
import { Route , Switch ,Link ,useLocation} from 'react-router-dom';
import MainNavigation from './components/layout/MainNavigation';
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/react";

import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/About/AboutPage';
import GalleryPage from './pages/Gallery/GalleryPage';
import BlogPage from './pages/Blog/BlogPage';
import './App.css';
import SignupPage from './pages/signup/SignupPage';
// import SignupAsPhotoGrapher from './pages/signup/SignupAsPhotoGrapher';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import LoginPage from './pages/Login/LoginPage';
// import Constants from './constant';

const override = css`
  display: block;
  margin: auto;
  border-color: red;
`;


function App() {

  // const [sectionValue,setScrollFunction] = useState({});

  const backendUrl = 'http://192.168.1.16:3000';
  const [user,setUser] = useState({});

  // function scrolltosection(sectionScrollValue) {
  //   setScrollFunction(sectionScrollValue);
  // }

  const [loading,setLoading] =  useState(false);

  useEffect(() => {
    // AOS.init();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    },1500);
    if(document.cookie.split('=')[1] !== undefined) {
      var savedtoken = document.cookie.split('=')[1];
      console.log(savedtoken);
      getUserInfo(savedtoken);
    } else {
      saveToken();
    }
  },[]);
  
  const location = useLocation();

  function getUserInfo(savedtoken) {
    const requestoptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  };
    fetch(`${backendUrl}/users/getUser/${savedtoken}`, requestoptions).then(response => response.json()).then((result) => {
          console.log(result.data[0]);
          setUser(result.data[0]);
      }).catch((err) => {
          console.log(err);
      });
  }

  function saveToken() {
    var date =  new Date();
      var token = date.getTime() + '_user_' + Math.floor(100000 + Math.random() * 900000);
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              token: token,
          }),
      };
      fetch(`${backendUrl}/users/saveToken`, requestOptions).then(response => response.json()).then((result) => {
          console.log(result);
          document.cookie = `token=${token}`;
      }).catch((err) => {
          console.log(err);
      });
  }

  function toggleNavbar() {
    if(document.getElementById('navbar').classList.contains('active_navbar')) {
      document.getElementById('navbar').classList.remove('active_navbar');
    } else {
      document.getElementById('navbar').classList.add('active_navbar');
    }
  }

  function getIntouch() {
    // sectionValue.current.scrollIntoView();
  }

  return (
    <div>
      {
        loading 
        ? <div className='App'><PropagateLoader loading={loading} css={override} color={"#ffffff"} size={30} /></div>
        :
        <div>
          {location.pathname !== '/signup' && location.pathname !== '/signup' && location.pathname !== '/login' ? <MainNavigation onToggle={toggleNavbar} onClickGetINTouch={getIntouch} user={user}></MainNavigation> : ''}
          <div id="navbar" className="toggle_navbar">
            <ul>
              <li>
                <a className="toggle_button" onClick={toggleNavbar}><span className="iconify" data-icon="akar-icons:cross"></span></a>
              </li>
              <li>
                {location.pathname === '/' ? <Link to='/' className="inside_links active" onClick={toggleNavbar}>Home</Link> : <Link to='/' className="inside_links" onClick={toggleNavbar}>Home</Link>}
              </li>
                    <li>
                        {location.pathname === '/about' ? <Link to='/about' className="inside_links active" onClick={toggleNavbar}>About Us</Link> : <Link to='/about' className="inside_links" onClick={toggleNavbar}>About Us</Link>}
                    </li>
                    <li>
                        {location.pathname === '/gallery' ? <Link to='/gallery' className="inside_links active" onClick={toggleNavbar}>Gallery</Link> : <Link to='/gallery' className="inside_links" onClick={toggleNavbar}>Gallery</Link>}
                    </li>
                    <li>
                        {location.pathname === '/blogs' ? <Link to='/blogs' className="inside_links active" onClick={toggleNavbar}>Blog</Link> : <Link to='/blogs' className="inside_links" onClick={toggleNavbar}>Blog</Link>}
                    </li>
                    <li>
                        <Link to='/blogs' className="portfolio" onClick={toggleNavbar}>Build Portfolio</Link>
                    </li>
                    <li>
                        <Link to='/blogs' className="get_in_touch" onClick={toggleNavbar}>Get in touch</Link>
                    </li>
            </ul>  
          </div>
          <Switch>
            <Route path='/' exact>
              {/* <HomePage onclickscrollto={scrolltosection}></HomePage> */}
              <HomePage backendurl={backendUrl} user={user}></HomePage>
            </Route>
            <Route path='/about'>
              <AboutPage></AboutPage>
            </Route>
            <Route path='/gallery'>
              <GalleryPage></GalleryPage>
            </Route>
            <Route path='/blogs'>
              <BlogPage></BlogPage>
            </Route>
            <Route path='/signup'>
              <SignupPage></SignupPage>
            </Route>
            <Route path='/login'>
              <LoginPage></LoginPage>
            </Route>
          </Switch>
        </div>
      }
    </div>
  );
}

export default App;
