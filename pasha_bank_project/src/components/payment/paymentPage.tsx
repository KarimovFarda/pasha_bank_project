import React, { useEffect, useState } from 'react'
import './paymentStyle.scss'
import { useHistory } from 'react-router-dom'
import { createStyles,makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import validator from 'validator'
import * as Yup from 'yup';
import Footer from '../footer'
import PaymentForm from './paymentForm'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      justifyContent: 'end',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },

  }),
);
export const PaymentPage = () => {
  const classes = useStyles();
  let subscriptionPrice: string[] = ['1.99', '18.99', '0.99']
  const [clicked, setClicked] = useState<boolean>(false)
  const [errorView, setErrorView] = useState<string>("error-view")
  const history = useHistory()
  const auth = true;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [price, setPrice] = useState(subscriptionPrice);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogOut = () => {
    localStorage.removeItem("token")
    sessionStorage.removeItem("user")
    history.push("/")
  }
  const [amount, setAmount] = useState("0")
  const [paymentAmount, setPaymentAmount] = useState<any>("paypal-button-container-P-0RU154546Y327144XMDSZ7WI")
  useEffect(() => {
    setPaymentAmount(localStorage.getItem("payment") == 'yearly' || localStorage.getItem("payment") == null ? "paypal-button-container-P-0RU154546Y327144XMDSZ7WI" : localStorage.getItem("payment") == 'monthly' ? "paypal-button-container-P-07H15729G3048283WMDS2FVQ" : "paypal-button-container-P-4MX13799SV939400HMDS2RWQ"
    )
  }, [localStorage.getItem("payment")])
  const [errorMessage, setErrorMessage] = useState('')
  const validateCreditCard = (value: any) => {
    if (validator.isCreditCard(value)) {
      setErrorMessage('Valid CreditCard Number')
    } else {
      setErrorMessage('Enter valid CreditCard Number!')
    }
  }
  return (
    <div style={{ backgroundSize: "cover", position: "static", backgroundImage: 'url(https://i.pinimg.com/originals/d7/59/b5/d759b559ad669f9e199f1aaaa381a8ab.jpg)' }}>
      <div className={classes.root} style={{ backgroundColor: "#151414" }}>
        <AppBar position="static" style={{ backgroundColor: "#151414", marginBottom: '3rem' }}>
          <Toolbar >
            <Typography variant="h6" onClick={() => { history.push("/covid"); window.location.reload() }} style={{ padding: " 0 2rem", marginRight: "auto", cursor: "pointer" }} className={`header-link ${classes.title}`}>Covid Statistics</Typography>
            <Typography variant="h6" style={{ cursor: "pointer", margin: "0 1.5rem" }} className={'link head-link'} onClick={() => history.push("/main")} >Main Page</Typography>
            <Typography variant="h6" style={{ cursor: "pointer" }} className={'link head-link'} onClick={() => history.push("/weather")} >Current Weather</Typography>
            <Typography variant="h6" style={{ cursor: "pointer", padding: " 0 1rem 0 2rem" }} className={"head-link"} >{sessionStorage.getItem('user')}</Typography>
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
      <h1 className="mb-3 text-light">Pricing</h1>
      <div className="pricing-container">
        <div className="pricing">
          <h4>Monthly</h4>
          <h1>${price[0]}</h1>
          <h5><del>$3.99</del></h5>
          <small>per month</small>
          <ul>
            <li>Daily News</li>
            <li>Articles about different topics</li>
          </ul>
          <a href="#modal" className="button-animated" onClick={() => { setClicked(true); setAmount(price[0]); sessionStorage.setItem("amount", price[0]); localStorage.setItem("payment", "monthly") }}>Subscribe</a>
        </div>
        <div className={"pricing"}>
          <h4>Yearly</h4>
          <small className="green">Most Popular</small>
          <h1>${price[1]}</h1>
          <h5><del>$39.99</del></h5>
          <small>per year</small>
          <ul>
            <li>Daily News</li>
            <li>Articles about different topics</li>
          </ul>
          <a href="#modal" className="button-animated" onClick={() => { setClicked(true); setAmount(price[1]); sessionStorage.setItem("amount", price[1]); localStorage.setItem("payment", "yearly") }}>Subscribe</a>
        </div>
        <div className="pricing " >
          <h4>Weekly</h4>
          <h1>${price[2]}</h1>
          <h5><del>$1.99</del></h5>
          <small>per week</small>
          <ul>
            <li>Daily News</li>
            <li>Articles about different topics</li>
          </ul>
          <a href="#modal" className="button-animated" onClick={() => { setClicked(true); setAmount(price[2]); sessionStorage.setItem("amount", price[2]); localStorage.setItem("payment", "weekly") }}>Subscribe</a>
        </div>
      </div>
      <div>
   <div id="modal" className="pb-3" style={clicked == true ? { display: "flex", position: "fixed" } : { display: "none" }}>
          <a href="#"></a>
          <section>
            <div className="main-container" style={{zIndex:100}}>
              <div className="check-container">
                <div className="check-background">
                  <svg id="success-animation-svg" viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 25L27.3077 44L58.5 7" stroke="white" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div className="check-shadow"></div>
              </div>
            </div>
            <h2 className="mb-5"> Successful!</h2>
            <a href="#" style={{ padding: "1rem 2rem" }} className="btn-success modal-success-button mt-5" onClick={() => { setClicked(false); window.location.reload() }} >Continue </a>
          </section>
        </div>
      </div>
      <div className="container mb-4" >
        <div id="Checkout" className="inline">
          <h1>Pay for Subscription</h1>
          <div className="card-row">
            <span className="visa"></span>
            <span className="mastercard"></span>
            <span className="amex"></span>
            <span className="discover"></span>
          </div>
       <PaymentForm/>
        </div>
      </div>
    <Footer/>
    </div>
  )
}

export default PaymentPage