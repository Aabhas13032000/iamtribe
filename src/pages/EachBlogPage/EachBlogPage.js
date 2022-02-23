import React,{useState,useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import './EachBlogPage.css';

function EachBlogPage(props) {

    const [images,setImages] = useState([]);
    const [eachBlog,setEachBlog] = useState([]);
    const [eachBlogLoading,setEachBlogLoading] = useState(false);
    const [imageLoaded,setImageLoading] = useState(false);
    const [similiar,setSimiliarBlogs] = useState([]);
    const [similiarLoaded,setSimiliarLoaded] = useState(false);

    useEffect(() => {
        if(props.eachblog.id !== null) {
            // console.log(props.eachblog);
            setEachBlog(props.eachblog);
            setEachBlogLoading(true);
            getBlogImages().then(response => {
                // console.log(response);
                setImages(response.data);
                setImageLoading(true);
                getSimiliarBlogs(props.eachblog.category).then(response2 => {
                    // console.log(response2);
                    setSimiliarBlogs(response2.data);
                    setSimiliarLoaded(true);
                });
            });
        } else {
            getBlog().then(blogresponse => {
                // console.log(blogresponse);
                setEachBlog(blogresponse.data[0]);
                setEachBlogLoading(true);
                getBlogImages().then(response => {
                    console.log(response);
                    setImages(response.data);
                    setImageLoading(true);
                    getSimiliarBlogs(blogresponse.data[0].category).then(response2 => {
                        // console.log(response2);
                        setSimiliarBlogs(response2.data);
                        setSimiliarLoaded(true);
                    });
                });
            });
        }
    },[])

    function getBlog() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(`${props.backendurl}/getBlogById/${props.match.params.id}`, requestOptions).then(response => response.json()).then((result) => {
            // // console.log(result);
            // setcategory(result.data);
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }

    function getBlogImages() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(`${props.backendurl}/getBlogImages/${props.match.params.id}`, requestOptions).then(response => response.json()).then((result) => {
            // // console.log(result);
            // setcategory(result.data);
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }

    function getSimiliarBlogs(category) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(`${props.backendurl}/getSimiliarBlogs/${category}/${props.match.params.id}`, requestOptions).then(response => response.json()).then((result) => {
            // // console.log(result);
            // setcategory(result.data);
            return result;
        }).catch((err) => {
            console.log(err);
        });
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

    // console.log(props);
    return !eachBlogLoading ? <div><p className='loading'>Loading...</p></div> : <div className='each_blog container'>
        {
            eachBlog.id === null 
            ? ''
            : <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12 blog_detail'>
                <br/><br/><br/><br/><br/>
                <div className='date'><p>{Date(eachBlog.created_at).slice(0,15)}</p></div>
                <div className='title'><h1>{eachBlog.title}</h1></div>
                {
                    !imageLoaded 
                    ?<p className='loading'>Loading...</p>
                    : images.length === 0 
                    ? <div></div>
                    : <div className='image_detail'>
                        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {
                                    images.map((image,index) => (
                                        index === 0 
                                        ? <div className="carousel-item active" key={index}>
                                            <img src={props.backendurl + image.path} className="d-block" alt="..."/>
                                        </div>
                                        : <div className="carousel-item" key={index}>
                                            <img src={props.backendurl + image.path} className="d-block" alt="..."/>
                                        </div>
                                    ))
                                }
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                            </div>
                    </div>
                }
                <div className='description'><h5 dangerouslySetInnerHTML={{__html: eachBlog.description}} /></div>
            </div>
            <div className='col-lg-12 col-md-12 col-sm-12 smiliar_blog'>
                <br/>
                {
                    !similiarLoaded 
                    ? <p className='loading'></p>
                    : <div className='similiar row'>
                        <h4>Similiar Blogs</h4>
                        {
                            similiar.map((blog,index) => (
                                <div className='col-lg-4 col-md-4 col-sm-12 col-12' key={index}  onClick={() => updateBlogDetail(blog.id,blog.title,blog.description,blog.category,blog.created_at)}>
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
                }
            </div>
        </div>
        }
    </div>;
}

export default withRouter(EachBlogPage);