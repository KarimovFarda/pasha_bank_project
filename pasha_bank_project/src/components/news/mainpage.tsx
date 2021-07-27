import React, { useState, useEffect } from 'react'
import '../index.scss'
import { useHistory } from 'react-router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Formik, Field } from "formik";
import * as Yup from "yup";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addNews, getNews, deleteNews, editNews } from '../../redux/newsAction';
import { useDispatch, useSelector } from "react-redux";
import Articles from './articles'
import Footer from '../footer'
import LatestNews from './latestNews'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      justifyContent: 'end',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);
const SignupSchema = Yup.object().shape({
  title: Yup.string().required("Title is a required field!")
    .min(10, "Too Short!")
    .max(200, "Too Long!"),
  author: Yup.string().required("Author is a required field!"),
  url: Yup.string().required("Url is a required field!")
    .min(5, "Too Short!")
    .max(300, "Too Long!"),
  content: Yup.string().required("Content is a required field!")
    .min(300, "Too Short!")
    .max(30000, "Too Long!"),
});
export const Main = () => {
  const [newsdata, setNewsdata] = useState<any>()

  useEffect(() => {
    /* https://newsapi.org/v2/everything?q=Apple&from=2021-06-28&sortBy=popularity&apiKey=fc951feaf1ed4dc6ba4edba127305bde */
    fetch("https://api.npoint.io/28d8d790105050200e23").then((resp) => resp.json()).then(data => {  setNewsdata(data.articles) })
  /*https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fc951feaf1ed4dc6ba4edba127305bde*/
  }, [])
  const dispatch = useDispatch();
  let editData: string[] = []
  const history = useHistory()
  const state = useSelector((state: any) => state);
  const classes = useStyles();
  const auth = true;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [test, setTest] = useState(editData)
  const userId = 1;
  const [id, setId] = useState(0)
  const [category, setCategory] = useState("All")
  useEffect(() => {
    getNews(userId)(dispatch);
  }, [dispatch]);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    localStorage.removeItem("token")
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("userImage")
    history.push("/")
  }
  const [show, setShow] = React.useState(false);
  const [display, setDisplay] = React.useState(false);
  const [modalClose, setModalClose] = useState("none")
  const handleClickOpen = () => {
    setDisplay(true);
  };
  const handleClickClose = () => {
    setDisplay(false);
  };
  const handleHide = () => {
    setShow(false);
  };
  useEffect(() => {
    console.log(state)
  },[state])
  const checkAdmin = sessionStorage.getItem("user")
  return (
    <div className="bg-dark">
      {newsdata ? '' : <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
        <h3 className="data-loading">  Loading ... </h3>
      </Backdrop>}
      <div className={`bg-dark ${classes.root}`}>
        <div className="modal" style={{ display: modalClose }}>
          <div className="content-modal" style={{ backgroundImage: 'url(https://image.freepik.com/free-vector/abstract-minimal-white-background_23-2148887988.jpg)' }}>
            <h2> Add New Articles </h2>
            <Formik
              initialValues={{
                title: "",
                author: "",
                url: "",
                content: ""
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                const newSubObject = {
                  title: values.title,
                  author: values.author,
                  url: values.url,
                  content: values.content,
                };
                addNews(newSubObject, userId)(dispatch);
                handleClose();
              }}
            >
              {({ errors, touched, handleSubmit }) => (
                <form style={{ width: "80%" }} onSubmit={handleSubmit}>
                  <label
                    htmlFor="title"
                    className="modal-label add-news-form-label"
                  >
                    Title
                  </label>
                  <Field name="title" className="modal-form" style={{ backgroundColor: "#dfdfdf", color: "black", padding: "7px 0", fontWeight: "bold", borderRadius: '5px' }} />
                  {errors.title && touched.title ? (
                    <div className="add-news-form-error">
                      {errors.title}
                    </div>
                  ) : null}
                  <label
                    htmlFor="author"
                    className="modal-label add-news-form-label"
                  >
                    Author
                  </label>
                  <Field name="author" className="modal-form" style={{ backgroundColor: "#dfdfdf", color: "black", padding: "7px 0", fontWeight: "bold", borderRadius: '5px', }} />
                  {errors.author && touched.author ? (
                    <div className="add-news-form-error">
                      {errors.author}
                    </div>
                  ) : null}
                  <label
                    htmlFor="Url"
                    className="modal-label add-news-form-label"
                  >
                    Picture Url
                  </label>
                  <Field name="url" type="text" className="modal-form" style={{ backgroundColor: "#dfdfdf", padding: "7px 0", color: "black", fontWeight: "bold", borderRadius: '5px' }} />
                  {errors.url && touched.url ? (
                    <div className="add-news-form-error">
                      {errors.url}
                    </div>
                  ) : null}
                  <label
                    htmlFor="content"
                    className="modal-label add-news-form-label"
                  >
                    Content
                  </label>
                  <Field name="content" className="modal-form" style={{ backgroundColor: "#eee", color: "black", padding: "2px 0", paddingBottom: "40px", height: "60px", width: "100%", borderRadius: '5px', fontWeight: "bold"}} />
                  {errors.content && touched.content ? (
                    <div className="add-news-form-error">
                      {errors.content}
                    </div>
                  ) : null}
                  <div className={'buttons'} style={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={(e) => {
                      setModalClose("none")
                    }} className="close form-cancelation-button" 
                    >
                      Cancel
                    </Button>
                    <Button onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                      handleHide();
                      window.location.reload()
                    }}>
                      Add
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <AppBar position="fixed" style={{ backgroundColor: "#151414", height: "80px", marginBottom: '0.5rem' }}>
          <Toolbar style={{ height: "80px" }}>
            {['General', 'Technology', 'Economy', 'Sport'].map((text, index) => {
              return (
                <p style={text === "Sport" ? { padding: " 0 1rem", cursor: "pointer", marginRight: "auto" } : { padding: " 0 1rem", cursor: "pointer" }} onClick={() => { setCategory(text === "General" ? "All" : text); }} className={`header-link ${classes.title}`}>{text}</p>
              )
            })}
            {checkAdmin === "Admin" ? <Typography variant="h6" style={{ marginLeft: "auto", cursor: "pointer" }} onClick={() => setModalClose("inline-block")} className={`header-link ${classes.title}`}>Add New Article</Typography> : null
            }
            <Typography variant="h6" onClick={() => { history.push("/covid"); window.location.reload() }} style={{ padding: " 0 1rem", cursor: "pointer" }} className={`header-link ${classes.title}`}>Covid Statistics</Typography>
            <Typography variant="h6" style={{ cursor: "pointer" }} className={'link head-link'} onClick={() => history.push("/weather")} >Current Weather</Typography>
            <Typography variant="h6" style={{ cursor: "pointer", padding: " 0 1rem" }} className={"head-link"} >{sessionStorage.getItem('user')}</Typography>
            {auth && (
              <div>
                {sessionStorage.getItem("userImage") != null ? <img alt="menu" onClick={handleMenu} style={{ width: "40px", borderRadius: '50%' }} src={String(sessionStorage.getItem('userImage'))} /> : <div onClick={handleMenu} style={{ width: "40px", height: "40px", paddingTop: "5px", borderRadius: '50%', backgroundColor: `#3F51B5`, color: 'white' }}><h4>{sessionStorage.getItem('user')?.charAt(0)}</h4></div>}
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <h3 className="popular-news-title latest-news"> Latest News </h3>
      <LatestNews/>
      <section className="news-section">
        <div className="container" style={{ width: "80%" }}>
          <div className="main-title-box text-center">
            <div className="small-title">News and Blog</div>
            <h2 className="big-title">Our Recent News</h2>
          </div>
          <div className="row">
            {newsdata && newsdata.map((item: any, index: any) => {
              return (
                <div key={index} style={category === "All" ? { display: "inline-block" } : item.category !== category ? { display: "none" } : { display: "inline-block" }} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0ms">
                  <div className={`news-item ${item.category}`}>
                    <div className="news_box">
                      <div className="newsimg"><img className="img-responsive" style={{ height: "15rem" }} src={item.urlToImage} alt={item.title}></img></div>
                      <div className="news-content">
                        <div className="news_postdate">
                          <span>{new Date(item.publishedAt).toLocaleString()}</span>
                        </div>
                        <a href="title">
                          <h3>{item.title}</h3>
                        </a>
                        <p className="demo-text">{item.description.slice(0, 120)}</p>
                        <Button variant="contained" color="primary" onClick={() => history.push(`/main/${index + 9}`)} >
                          Read More
                        </Button>
                      </div>
                      <div className="news_authorinfo" style={{ display: "flex", justifyContent: "space-around", alignItems: "center", color: "white" }} >
                        <span><i className="fa fa-user"></i>  <a href="author">{item.author} </a></span>
                        <span><i className="fab fa-sourcetree"></i><a href="source.name" >{item.source.name}</a></span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            {state && state.news.map((item: any, index: any) => {
              return (
                <div key={index} style={category !== "All" ? { display: 'none' } : { display: 'inline-block' }} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0ms">
                  <div className="news-item">
                    <div className="news_box">
                      <div className="newsimg"><img className="img-responsive" style={{ height: "15rem" }} src={item.url} alt={item.title}></img></div>
                      <div className="news-content">
                        <div className="news_postdate">
                          <span>{String(new Date().toLocaleString())}</span>
                        </div>
                        <a href="title">
                          <h3>{item.title}</h3>
                        </a>
                        <p className="news-text">{item.content.slice(0, 150)}</p>
                        <div className="news-controller">
                          <Button variant="contained" color="primary" onClick={() => history.push(`/main/${index + 29}`)} >
                            Read More
                          </Button>
                          {checkAdmin === "Admin" ? <Button color='primary' style={{ margin: "0 10px" }} variant="contained" className="btn" onClick={() => { deleteNews(userId, item._id)(dispatch); window.location.reload() }}>Delete</Button> : null}
                        </div>
                        <br />
                        {checkAdmin === "Admin" ? <Button color='primary' variant="contained" className="btn" onClick={() => { handleClickOpen(); setTest([item.title, item.author, item.url, item.content]); setId(item._id) }}>Edit</Button> : null}
                        <Dialog open={display} onClose={handleClickClose} aria-labelledby="form-dialog-title" >
                          <DialogContent style={{ padding: "1rem 3rem", backgroundImage: 'url(https://image.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg)' }}>
                            <DialogTitle id="form-dialog-title">Edit Article Info</DialogTitle>
                            <DialogContentText>
                              You can edit any information about your articles
                            </DialogContentText>
                            <Formik
                              initialValues={{
                                title: test[0],
                                author: test[1],
                                url: test[2],
                                content: test[3]
                              }}
                              validationSchema={SignupSchema}
                              onSubmit={(values) => {
                                const newSubObject = {
                                  title: values.title,
                                  author: values.author,
                                  url: values.url,
                                  content: values.content,
                                };
                                editNews(newSubObject, userId, id)(dispatch);
                                handleClose();
                              }}
                            >
                              {({ errors, touched, handleSubmit }) => (
                                <form style={{ width: "100%" }}>
                                  <label
                                    htmlFor="title"
                                    className="edit-label news-label"
                                    
                                  >
                                    Title
                                  </label>
                                  <Field name="title" className="modal-form" style={{ backgroundColor: "#ddd", padding: "7px 0", width: "100%", borderRadius: '5px', color: "black" }} />
                                  {errors.title && touched.title ? (
                                    <div className="form-validation-error">
                                      {errors.title}
                                    </div>
                                  ) : null}
                                  <label
                                    htmlFor="author"
                                    className="edit-label news-label">
                                    Author
                                  </label>
                                  <Field name="author" className="modal-form" style={{ backgroundColor: "#ddd", padding: "7px 0", width: "100%", borderRadius: '5px', color: "black", }} />
                                  {errors.author && touched.author ? (
                                    <div className="form-validation-error">
                                      {errors.author}
                                    </div>
                                  ) : null}
                                  <label
                                    htmlFor="Url"
                                    className="edit-label news-label"
                                    
                                  >
                                    Picture Url
                                  </label>
                                  <Field name="url" type="text" className="modal-form" style={{ backgroundColor: "#ddd", padding: "7px 0", width: "100%", color: "black", borderRadius: '5px', }} />
                                  {errors.url && touched.url ? (
                                    <div className="form-validation-error">
                                      {errors.url}
                                    </div>
                                  ) : null}
                                  <label
                                    htmlFor="content"
                                    className="edit-label news-label"
                                  >
                                    Content
                                  </label>
                                  <Field name="content" className="modal-form" style={{ backgroundColor: "#ddd", padding: "5px 0", width: "100%", color: "black", borderRadius: '5px', }} />
                                  {errors.content && touched.content ? (
                                    <div className="form-validation-error">
                                      {errors.content}
                                    </div>
                                  ) : null}
                                  <div className={'buttons'}>
                                    <Button onClick={(e) => {
                                      e.preventDefault();
                                      handleClickClose();
                                      handleHide()
                                    }} style={{ color: "black", fontWeight: "bold", marginRight: "auto", marginTop: "1rem" }}>
                                      Cancel
                                    </Button>
                                    <Button onClick={(e) => {
                                      e.preventDefault();
                                      handleSubmit();
                                      handleClickClose()
                                      handleHide();
                                      window.location.reload()
                                    }} style={{ color: "black", fontWeight: "bold", margin: "1rem 0.5rem 0 0.5rem" }}>
                                      Edit
                                    </Button>
                                  </div>
                                </form>
                              )}
                            </Formik>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="news_authorinfo news-source-info-section" >
                        <span><i className="fa fa-user"></i>  <a href="author">{item.author} </a></span>
                        <span><i className="fab fa-sourcetree"></i><a href="source" >Source</a></span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <h2 className="big-title">Our Recent Articles</h2>
            <Articles/>
          </div>

        </div>

      </section>
      <Footer />
    </div>
  )
}

export default Main