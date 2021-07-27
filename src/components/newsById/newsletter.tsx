import React from 'react'
import './newsletterStyle.scss'
import { useHistory } from 'react-router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Footer from '../footer'
import NewsContent from './newsContent'
import NewsHeader from './newsHeader'
import SuggestedNews from './suggestedNews';
import Notes from './Notes'
declare const window: any;
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
export const NewsById = () => {
  const auth = true;
  const history = useHistory()
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    localStorage.removeItem("token")
    sessionStorage.removeItem("user")
    history.push("/")
  }
  return (
    <div style={{ backgroundImage: "url(https://image.freepik.com/free-vector/elegant-white-background-with-shiny-lines_1017-17580.jpg)" }}>
      <header>
        <div className={classes.root} style={{ backgroundColor: "#151414" }}>
          <AppBar position="static" style={{ backgroundColor: "#151414" }}>
            <Toolbar >
              <Typography variant="h6" onClick={() => { history.push("/covid"); window.location.reload() }} style={{ padding: " 0 2rem", marginRight: "auto", cursor: "pointer" }} className={`header-link ${classes.title}`}>Covid Statistics</Typography>
              <Typography variant="h6" style={{ cursor: "pointer", margin: "0 2rem" }} className={'link head-link'} onClick={() => history.push("/main")}>Main Page</Typography>
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
        <NewsHeader />
        <div className="clear"></div>
      </header>
      <Notes />
      <section className="content" style={{ display: "inline-block" }}>
        <NewsContent />
        <SuggestedNews />
      </section>
      <Footer />
    </div>
  )
}

export default NewsById