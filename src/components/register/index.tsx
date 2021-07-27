import React, { useEffect, useState } from 'react'
import './style.css'
import GoogleLogin from 'react-google-login'
import undraw_different_love_a3rg from '../../images/undraw_different_love_a3rg.svg'
import undraw_creative_team_r90h from '../../images/undraw_creative_team_r90h.svg'
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useHistory } from 'react-router';
import axios from 'axios'
import emailjs from 'emailjs-com';
const useStyles = makeStyles((theme) => ({
  submit: {margin: theme.spacing(1, 0, 1),},
}));
export const RegisterPage = () => {  
  const classes = useStyles();
  const history = useHistory()
  const SignupSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("Firstname is Required"),
    lastname: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("Lastname is Required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email address is Required")
      .min(5, "Too Short!")
      .max(50, "Too Long!"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(20, "Too Long!")
      .required("Password is Required"),
    phonenumber: Yup.string()
      .min(8, "Too Short!")
      .max(20, "Too Long!")
      .required("Phonenumber is Required"),
  });
  const SignInSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Password is Required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email Address is Required")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
  });
  const [view, setView] = useState("sign-up")
  const [responsive, setResponsive] = useState<string>("")
  const [clicked, setClicked] = useState<boolean>(false)

  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [email,setEmail] = useState<any>()
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setShow(true);
  };
  const handleClickClose = () => {
    setShow(false);
  };
  const [password, setPassword] = useState("password")
  const [verification, setVerification] = useState("")
  const [code, setCode] = useState<number>()
  const randomNumber:string = String(Math.floor(100000 + Math.random() * 899999))
  function sendEmail(e: any) {
    e.preventDefault()
    handleClickClose();
    handleClickOpen();
    emailjs.send('service_c1n3vyp', 'template_6zt7gcq', {
      templateParams: randomNumber,email : email
    }, 'user_ZvTxGYETi342xUiEP6IpE')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.log('FAILED...', err);
      });

  }
  useEffect(() => {
    setCode(Math.floor(Math.random() * 999999))
  }, [])
  const submitted = () => {
    handleClose();
    setView('sign-in');
    setResponsive("sign-up-section")
  }
  return (
    <div id="container" className={`container-fluid login-register-container ${view}`}>
      <div className="row form-row">
        <div className={`col align-items-center flex-col sign-up ${responsive}`}>
          <div className="form-wrapper align-items-center">
            <div className="form data-form sign-up">
              <Formik
                initialValues={{
                  firstname: "",
                  lastname: "",
                  email: "",
                  password: "",
                  phonenumber: "+994"
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  values.phonenumber = String(values.phonenumber)
                  axios.post("http://localhost:8806/register", {
                    firstname: values.firstname,
                    lastname: values.lastname,
                    email: values.email,
                    phonenumber: values.phonenumber,
                    password: values.password,
                  })
                    .then((response) => {
                      handleOpen()
                      setEmail(values.email)
                      sessionStorage.setItem('user', response.data.firstname + " " + response.data.lastname)
                    })
                  
                }}
              >
                {({ errors, touched, handleSubmit }) => (
                  <div>
                    <form onSubmit={handleSubmit} className={view} style={{ width: "25rem" }}>
                      <label
                        htmlFor=""
                        className="check"
                      >
                        Firstname
                      </label>
                      <Field
                        name="firstname"
                        type="text"
                        placeholder="Firstname*"
                        className="form-control"
                        style={{padding: "0.7rem", margin: "0 0", backgroundColor: '#eee', border: `1px solid ${errors.firstname && touched.firstname? 'red' : 'none'}`,width: '100%'}}
                      /> 
                      {errors.firstname && touched.firstname ? (
                        <div className="error-message">
                          {errors.firstname}
                        </div>
                      ) : null}
                      <label
                        htmlFor="lastname"
                        className="check"
                      >
                        Lastname
                      </label>
                       <Field
                        name="lastname"
                        type="text"
                        placeholder="Lastname*"
                        className="form-control"
                        style={{
                          padding: "0.7rem", margin: "0 0", backgroundColor: '#eee', border: `1px solid ${errors.lastname && touched.lastname ? 'red' : 'none'}`,
                          width: '100%'
                        }}
                      />
                      {errors.lastname && touched.lastname ? (
                        <div className="error-message">
                          {errors.lastname}
                        </div>
                      ) : null}
                      <label
                        htmlFor="email"
                        className="check"
                      >
                        Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email Address*"
                        className="form-control"
                        style={{
                          padding: "0.7rem", margin: "0 0", backgroundColor: '#eee', border: `1px solid ${errors.email  && touched.email ?'red' : "none"}`,
                          width: '100%'
                        }}
                      />
                      {errors.email && touched.email ? (
                        <div className="error-message">
                          {errors.email}
                        </div>
                      ) : null}
                      <label
                        htmlFor="phonenumber"
                        className="check"
                      >
                        Phone Number
                      </label>
                      <Field
                        name="phonenumber"
                        placeholder="phonenumber*"
                        type="text"
                        className="form-control"
                        style={{
                          padding: "0.7rem", margin: "0 0", backgroundColor: '#eee', border: `1px solid ${errors.phonenumber  && touched.phonenumber ? 'red' : "none"}`,
                          width: '100%'
                        }}
                      /> 
                      {errors.phonenumber && touched.phonenumber ? (
                        <div className="error-message">
                          {errors.phonenumber}
                        </div>
                      ) : null}
                      <label
                        htmlFor="price"
                        className="check"
                      >
                        Password
                      </label>
                      <Field
                        name="password"
                        placeholder="Password*"
                        type={password}
                        className="form-control"
                        style={{
                          padding: "0.7rem", margin: "0 0", backgroundColor: '#eee', border: `1px solid ${errors.password  && touched.password ? "red" : "none"}`,
                          width: '100%',
                          position: 'relative'
                        }}
                      /> 
                      <i style={{ position: "fixed", bottom: "18%", right: "7%", fontSize: "1.2rem" }} onClick={() => password == "password" ? setPassword("text") : setPassword("password")} className="far fa-eye"></i>
                      {errors.password && touched.password ? (
                        <div className="error-message">
                          {errors.password}
                        </div>
                      ) : null}
                      <input style={{ display: "none" }} type="text" name="code" placeholder="Verification Code"></input>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                      >
                        Sign Up
                      </Button>
                      <Dialog open={open} onClose={handleClose} style={{ minWidth: "50%", overflowY: "visible" }} aria-labelledby="form-dialog-title">
                        <img src="http://newmediaservices.com.au/wp-content/uploads/2018/05/Order-Verification.jpg"></img>
                        <h2 className="mb-5 mt-3"> Verification code was sent to your email!</h2>
                        <form onSubmit={() => { String(verification) == randomNumber ? submitted() : setClicked(true) }}>
                          <h6 style={{ color: "#136941", cursor: "pointer" }} onClick={sendEmail}> Resend verification Code</h6>
                          <h5 style={clicked === true ? { color: "red" } : { display: "none" }}>Verification Code is incorrect!</h5>
                          <input type="number" value={verification} onChange={(e) => { setVerification(e.target.value) }} style={clicked === true ? { border: "1px solid red", width: "80%", margin: "0 auto" } : { width: "80%", margin: "0 auto" }} placeholder="Enter Verification Code"></input>
                          <input type="text" style={{ display: 'none' }} name="code" value={code}></input>
                          <button type="submit" style={{ marginBottom: "1rem" }} className="btn-success modal-success-button mt-3"  >Verify Account </button>
                        </form>
                      </Dialog>
                      <Dialog open={show} onClose={handleClickClose} aria-labelledby="form-dialog-title">
                        <div className="main-container" style={{ padding: '1rem 3rem 0 3rem' }}>
                          <div className="check-container">
                            <div className="check-background">
                              <svg id="success-animation-svg" viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 25L27.3077 44L58.5 7" stroke="white" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <div className="check-shadow"></div>
                          </div>
                        </div>
                        <h4 className="mb-5 px-3"> You should verify your account !</h4>
                        <a href="#" style={{ padding: "1rem 2rem" }} className="btn-success modal-success-button mt-5" onClick={sendEmail} >Okay </a>
                      </Dialog>
                      <p>
                        <span>
                          Already have an account?
                        </span>
                        <b onClick={() => { setView("sign-in"); setResponsive("sign-up-section") }} className="pointer">
                          Sign in here
                        </b>
                      </p>
                    </form>
                  </div>
                )}
              </Formik>
            </div>
          </div>
        </div>
        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            <div className="form data-form sign-in">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={SignInSchema}
                onSubmit={(values) => {
                  axios
                    .post("http://localhost:8806/login", {
                      email: values.email,
                      password: values.password,
                    })
                    .then((response) => {
                      localStorage.setItem("token", response.data.token);
                      history.push("/main");
                    })
                }}>
                {({ errors, touched, handleSubmit }) => (
                  <form className="login-form" style={{ width: "80%" }} onSubmit={handleSubmit} >
                    <label
                      htmlFor="email"
                      className="check"
>
                      Email
                    </label>
                    
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        className="form-control"
                        style={{ backgroundColor: '#eee', borderRadius: "0", border: `1px solid ${errors.email && touched.email ? 'red' : "none"}`, padding: '12px 15px', margin: '8px auto', width: '90%' }} />                     {errors.email && touched.email ? (
                      <div style={{ color: "red", fontWeight: "bold", fontSize: "0.8rem", textAlign: "left", marginLeft: "1.2rem" }}>
                        {errors.email}
                      </div>
                    ) : null}
                    <label
                      htmlFor="price"
                      className="check"
                    >
                      Password
                    </label>
                   <Field  
                      name="password"
                      placeholder="Password"
                      type="password"
                      className="form-control"
                      style={{ backgroundColor: '#eee', borderRadius: "0", border: `1px solid ${errors.password && touched.password ? "red" : "none"}`, padding: '12px 15px', margin: '8px auto', width: '90%' }} /> 
                    {errors.password && touched.password ? (
                      <div style={{ color: "red", fontWeight: "bold", fontSize: "0.8rem", textAlign: "left", marginLeft: "1.2rem" }}>
                        {errors.password}
                      </div>
                    ) : null}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      style={{
                        width: "90%",
                        color: "white",
                        fontWeight: "bold",
                        margin: "1rem 3px",
                        backgroundColor: "#56B692"
                      }}
                    >
                      Sign In
                    </Button>
                    <p> or sign in with </p>
            
                    <p className="mt-4">
                      <span>
                        Don't have an account?
                      </span>
                      <b onClick={() => { setView("sign-up"); setResponsive("") }} className="pointer">
                        Sign up here
                      </b>
                    </p>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <div className="row content-row form-row">
        <div className="col align-items-center form-column flex-col">
          <div className="user-info sign-in sign-in-info" >
            <h2>
              Welcome back
            </h2>
            <h3 style={view === "sign-in" ? { display: "inline-block" } : { display: "none" }}>
              {sessionStorage.getItem("user")}
            </h3>
          </div>
          <div className="img sign-in sign-in-image">
            <img src={undraw_different_love_a3rg} alt="welcome"></img>
          </div>
        </div>
        <div className="col right-animate-side align-items-center form-column flex-col">
          <div className="img sign-up sign-up-image">
            <img src={undraw_creative_team_r90h} alt="welcome"></img>
          </div>
          <div className="user-info sign-up sign-up-info">
            <h2>
              Registration
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RegisterPage
