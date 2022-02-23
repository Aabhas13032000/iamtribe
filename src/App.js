//react
import React ,{useState,useEffect} from 'react';
import { Route , Switch ,Link ,useLocation,useHistory} from 'react-router-dom';

//css
import './App.css';

//third-party
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/react";

//pages
import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/About/AboutPage';
import GalleryPage from './pages/Gallery/GalleryPage';
import BlogPage from './pages/Blog/BlogPage';
import SignupPage from './pages/signup/SignupPage';
import LoginPage from './pages/Login/LoginPage';
import ProfilePage from './pages/Profile/ProfilePage';
import PhotographersPage from './pages/PhotographersPage/PhotographersPage';
import EachBlogPage from './pages/EachBlogPage/EachBlogPage';

//components
import MainNavigation from './components/layout/MainNavigation';

const override = css`
  margin: auto;
`;

function App() {

  // const [sectionValue,setScrollFunction] = useState({});

  // const backendUrl = 'http://172.20.10.2:3000';
  // const backendUrl = 'http://192.168.1.16:3000';
  // const backendUrl = 'http://192.168.29.248:3000';
  const backendUrl = 'http://imfromtribe.com:5000';
  const [user,setUser] = useState({});
  const history = useHistory();

  // function scrolltosection(sectionScrollValue) {
  //   setScrollFunction(sectionScrollValue);
  // }

  const [loading,setLoading] =  useState(false);
  const [savedUserToken,setUserToken] =  useState('');
  const [selectedTab,setSelectedTab] =  useState('All');
  const [blog,setBlog] =  useState({
    id: null,
    title: null,
    description: null,
    category:null,
    created_at:null
});

  useEffect(() => {
    // AOS.init();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    },1500);
    if(document.cookie.split('=')[1] !== undefined) {
      var savedtoken = document.cookie.split('=')[1];
      console.log(savedtoken);
      console.log(savedUserToken);
      getUserInfo(savedtoken);
    } else {
      saveToken();
    }
  },[]);
  
  const location = useLocation();
  // console.log(user);

  if(location.pathname === '/signup'){
    console.log('user');
    if(user.name !== null){
      console.log(user);
      window.location.href = '/';
    }
  }

  if(location.pathname === '/login'){
    // console.log('user');
    if(user.name !== null && user.token !== null){
      // console.log(user);
      window.location.href = '/';
    }
  }

  function onLoginuser(newuser) {
    // console.log(newuser);
    document.cookie = `token=${newuser.token}`;
    setUser(newuser);
    setUserToken(newuser.token);
  }

  function getUserInfo(savedtoken) {
    const requestoptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  };
    fetch(`${backendUrl}/users/getUser/${savedtoken}`, requestoptions).then(response => response.json()).then((result) => {
          // console.log(result.data[0]);
          setUser(result.data[0]);
          setUserToken(result.data[0].token);
      }).catch((err) => {
          console.log(err);
      });
  }

  function saveToken() {
    var date =  new Date();
      var token = date.getTime() + '_user_' + Math.floor(100000 + Math.random() * 900000);
      console.log(token);
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              token: token,
          }),
      };
      fetch(`${backendUrl}/users/saveToken`, requestOptions).then(response => response.json()).then((result) => {
          console.log(result);
          var firstUser = {
            age: null,
            bio: null,
            camera_gear: null,
            cover_photo: null,
            email: null,
            experience: null,
            gender: null,
            id: null,
            login: 0,
            name: null,
            password: null,
            phone: null,
            profile_pic: null,
            role_id: null,
            skills: null,
            status: 1,
            token: token,
          }
          setUser(firstUser);
          setUserToken(token);
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

  function updateSelectedTab(value) {
    // console.log(value);
    setSelectedTab(value);
    // window.location.href = '/gallery';
    history.push('/gallery');
  }

  function getIntouch() {
    // sectionValue.current.scrollIntoView();
  }

  function updateBlog(newBlog) {
    setBlog(newBlog);
    history.push('/eachblog/' + newBlog.id);
    // window.location.href = '/eachblog/' + newBlog.id;
  }

  return (
    <div>
      {
        loading 
        ? <div className='App'><PropagateLoader className="loader" loading={loading} css={override} color={"#ffffff"} size={30} /></div>
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
                        {location.pathname === '/gallery' ? <Link to='/gallery' className="inside_links active" onClick={toggleNavbar}>Gallery</Link> : <Link to='/gallery' className="inside_links" onClick={toggleNavbar}>Gallery</Link>}
                    </li>
                    <li>
                        {location.pathname === '/blogs' ? <Link to='/blogs' className="inside_links active" onClick={toggleNavbar}>Blog</Link> : <Link to='/blogs' className="inside_links" onClick={toggleNavbar}>Blog</Link>}
                    </li>
                    <li>
                        {location.pathname === '/photographers' ? <Link to='/photographers' className="inside_links active" onClick={toggleNavbar}>Photographers</Link> : <Link to='/photographers' className="inside_links" onClick={toggleNavbar}>Photographers</Link>}
                    </li>
                    <li>
                      {
                          user.login === 1 && user.status === 1 ? 
                          user.name != null
                          ? ''
                          :<Link to='/login' className="get_in_touch" onClick={toggleNavbar}>Build Portfolio</Link>
                          :<Link to='/signup' className="get_in_touch" onClick={toggleNavbar}>Build Portfolio</Link> 
                      }
                  </li>
                  <li>
                    {
                        user.login === 1 && user.status === 1 ? 
                        user.name != null
                        ? <Link to='/profile' className="portfolio-img" onClick={toggleNavbar}>
                          <p>Profile</p>
                        </Link>
                        :<Link to='/login' className="portfolio" onClick={toggleNavbar}>Login</Link>
                        :<Link to='/signup' className="portfolio" onClick={toggleNavbar}>Signup</Link> 
                    }
                </li>
            </ul>  
          </div>
          <Switch>
            <Route path='/' exact>
              {/* <HomePage onclickscrollto={scrolltosection}></HomePage> */}
              <HomePage changeSelectedTab={updateSelectedTab} backendurl={backendUrl} user={user}></HomePage>
            </Route>
            <Route path='/about'>
              <AboutPage backendurl={backendUrl}></AboutPage>
            </Route>
            <Route path='/gallery'>
              <GalleryPage selectedTab={selectedTab} backendurl={backendUrl}></GalleryPage>
            </Route>
            <Route path='/blogs'>
              <BlogPage backendurl={backendUrl} onUpdateBlog={updateBlog}></BlogPage>
            </Route>
            <Route path='/signup'>
              <SignupPage backendurl={backendUrl}></SignupPage>
            </Route>
            <Route path='/login'>
              <LoginPage backendurl={backendUrl} updateLogin={onLoginuser}></LoginPage>
            </Route>
            <Route path='/profile'>
              <ProfilePage backendurl={backendUrl} user={user}></ProfilePage>
            </Route>
            <Route path='/photographers'>
              <PhotographersPage backendurl={backendUrl} user={user}></PhotographersPage>
            </Route>
            <Route path='/eachblog/:id'>
              <EachBlogPage backendurl={backendUrl} eachblog={blog} onUpdateBlog={updateBlog}></EachBlogPage>
            </Route>
          </Switch>
        </div>
      }
    </div>
  );
}

export default App;
