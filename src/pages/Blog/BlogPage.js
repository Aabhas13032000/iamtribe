import React,{useEffect,useState} from 'react';
import { useStateIfMounted } from 'use-state-if-mounted';
import './BlogPage.css';
import {Link} from 'react-router-dom';

function BlogPage(props) {

    var [blogs,setBlogs] = useStateIfMounted([]);
    const [blogLoading,setBlogLoading] = useStateIfMounted(false);
    var [offset,setOffset] = useState(0);

    useEffect(()=> {
        getBlogs(0);
    },[])

    function getBlogs(innerOffset) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`${props.backendurl}/getBlogsByOffset/${innerOffset}`, requestOptions).then(response => response.json()).then((result) => {
            // console.log(result);
                for(var i=0;i<result.data.length;i++){
                    blogs.push(result.data[i]);
                }
                setBlogs(blogs);
                setBlogLoading(true);
        }).catch((err) => {
            console.log(err);
        });
    }

    function getMoreBlogs() {
        // console.log(image_array);
        // console.log('hey');
        offset=offset+10;
        setOffset(offset);
        getBlogs(offset);
        // console.log(offset);
    }

    function updateBlogDetail(id,title,description,category,created_at) {
        var blog = {
            id: id,
            title: title,
            description: description,
            category:category,
            created_at:created_at
        }
        props.onUpdateBlog(blog);
    }

    return <div className='blogs container-fluid' onScroll={getMoreBlogs}>
        <br/><br/><br/><br/>
        {
            !blogLoading ? <p className='loading'>Loading...</p> 
            : blogs.length === 0 
            ? <div></div>
            :<div className='container'>
                <div className='first_blog row'>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-12 first_image'>
                        <div className='image_card' onClick={() => updateBlogDetail(blogs[0].id,blogs[0].title,blogs[0].description,blogs[0].category,blogs[0].created_at)}>
                            <Link to={'/eachblog/' + blogs[0].id}><img src={props.backendurl + blogs[0].path} alt='blog_image'/></Link>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                        <div className='content' onClick={() => updateBlogDetail(blogs[0].id,blogs[0].title,blogs[0].description,blogs[0].category,blogs[0].created_at)}>
                            <div className='category'>
                                <a>{blogs[0].category}</a>
                            </div>
                            <br/>
                            <br/>
                            <h3>{blogs[0].title}</h3>
                            <h5 dangerouslySetInnerHTML={{__html: blogs[0].description.slice(0,160) + '...'}}/>
                            <Link className='linkto' to={'/eachblog/' + blogs[0].id}>Read More</Link>
                            <p>{Date(blogs[0].created_at).slice(0,15)}</p>
                        </div>
                    </div>
                </div>
                <br/>
                <div className='first_blog row' id='blogs'>
                    {
                        blogs.map((blog,index) => (
                            index === 0 
                            ? ''
                            : <div className='col-lg-4 col-md-6 col-sm-12 col-12' key={index}  onClick={() => updateBlogDetail(blog.id,blog.title,blog.description,blog.category,blog.created_at)}>
                                <div className='image_card'>
                                    {/* <Link to={'/eachblog/' + blog.id}><img src={ props.backendurl + blog.path} alt='blog_image'/></Link> */}
                                    <img src={ props.backendurl + blog.path} alt='blog_image'/>
                                </div>
                                <br/>
                                <br/>
                                <div className='content'>
                                    <div className='category'>
                                        <a>{blog.category}</a>
                                    </div>
                                    <br/>
                                    <br/>
                                    <h3>{blog.title}</h3>
                                    <h5 dangerouslySetInnerHTML={{__html: blog.description.slice(0,100) + '...'}}/>
                                    <a className='linkto'>Read More</a>
                                    {/* <Link className='linkto' to={'/eachblog/' + blog.id}>Read More</Link> */}
                                    <p>{Date(blog.created_at).slice(0,15)}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        }
    </div>;
}

export default BlogPage;