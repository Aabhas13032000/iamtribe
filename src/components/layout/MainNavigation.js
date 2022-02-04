import React from 'react';
import './MainNavigation.css';
import { Link , useLocation } from 'react-router-dom';

function MainNavigation(props) {
    const location = useLocation();

    function toggle_navbar() {
        // console.log('hello');
        props.onToggle();
    }

    function clickedgetintouch() {
        props.onClickGetINTouch();
    }

    return <header className="header">
        <div className='container'>
        <div className="logo"><Link to='/'><h3>#imfromtribe</h3></Link></div>
        <div className="links">
            <ul>
                <li>
                    {location.pathname === '/' ? <Link to='/' className="inside_links active">Home</Link> : <Link to='/' className="inside_links">Home</Link>}
                </li>
                {/* <li>
                    {location.pathname === '/about' ? <Link to='/about' className="inside_links active">About Us</Link> : <Link to='/about' className="inside_links">About Us</Link>}
                </li> */}
                <li>
                    {location.pathname === '/gallery' ? <Link to='/gallery' className="inside_links active">Gallery</Link> : <Link to='/gallery' className="inside_links">Gallery</Link>}
                </li>
                <li>
                    {location.pathname === '/blogs' ? <Link to='/blogs' className="inside_links active">Blog</Link> : <Link to='/blogs' className="inside_links">Blog</Link>}
                </li>
                <li>
                    {location.pathname === '/' ? <a onClick={clickedgetintouch} className="inside_links">Get in touch</a> : <Link to='/' className="inside_links">Get in touch</Link>}
                </li>
            </ul>
        </div>
        <div className="login">
            <ul>
                <li>
                    {
                        props.user.login === 1 && props.user.status === 1 ? 
                        props.user.name != null
                        ? ''
                        :<Link to='/login' className="get_in_touch">Build Portfolio</Link>
                        :<Link to='/signup' className="get_in_touch">Build Portfolio</Link> 
                    }
                </li>
                <li>
                    {
                        props.user.login === 1 && props.user.status === 1 ? 
                        props.user.name != null
                        ? <Link to='/profile' className="portfolio-img">
                            <div className='card'>
                                <img src={props.user.profile_pic} alt='profile_image' />
                            </div>
                        </Link>
                        :<Link to='/login' className="portfolio">Login</Link>
                        :<Link to='/signup' className="portfolio">Signup</Link> 
                    }
                </li>
                <li>
                    <a className="toggle_button" onClick={toggle_navbar}><span className="iconify" data-icon="icon-park-outline:hamburger-button"></span></a>
                </li>
            </ul>
        </div>
        </div>
    </header>;
}

export default MainNavigation;