import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CountUp from 'react-countup'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
const API_BASE = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus';
const json = (res: any) => res.json();
const details = {
    headers: {
        'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
        'x-rapidapi-key': '53009286a0mshdc8ec356f7aa205p1e0e80jsn5858f548ed53'
    }
};
export const CovidUi = () => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            backdrop: {
                zIndex: theme.zIndex.drawer + 1,
                color: '#fff',
            },
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
            },
        }),
    );
    const history = useHistory()
    const classes = useStyles();
    let data: any = {}
    const [info, setInfo] = useState(data)
    const grabJSON = (url: string, details: any) => fetch(url, details).then(json).then(data => {setInfo(data)});
    const random = (url: any) => `${API_BASE}/${url}.php?_=${Math.random()}`;
    const grabData = () => [
        grabJSON(random('worldstat'), details),
    ];
    const update = () => Promise.all(grabData()).then();
    document.addEventListener('DOMContentLoaded', update);
    return (
        <>
            <div className={classes.root}>
                <AppBar position="static" className="bg-light">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                        </Typography>
                        <Button color="default" onClick={() => history.push("/weather")}>Current Weather</Button>
                        <Button color="default" onClick={() => history.push("/main")}>News Page</Button>
                    </Toolbar>
                </AppBar>
            </div>
            {info.total_cases === undefined ? <Backdrop className={classes.backdrop} open>
                <CircularProgress color="inherit" />
                <h3 style={{ display: "block", marginLeft: '1rem' }}>    Loading ... </h3>
            </Backdrop> : ""}
            {info && <div className="row" style={{ padding: "0 0.75rem" }}>
                <div className="col-xl-3 col-md-3 mb-4 mt-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Total Cases</div>
                                    <div className="row no-gutters align-items-center justify-content-center">
                                        <div className="col-auto">
                                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800" id="total">{info.total_cases === undefined ? 0 : <CountUp end={Number(info.total_cases.split(",").join(""))} />}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa fa-users fa-2x text-info"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-3 mb-4 mt-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">Total Death</div>
                                    <div className="row no-gutters align-items-center justify-content-center">
                                        <div className="col-auto">
                                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{info.total_deaths === undefined ? 0 : <CountUp end={Number(info.total_deaths.split(",").join(""))} />}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa fa-bed fa-2x text-danger"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-3 mb-4 mt-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Total Recovered</div>
                                    <div className="row no-gutters align-items-center justify-content-center">
                                        <div className="col-auto">
                                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{info.total_recovered === undefined ? 0 : <CountUp end={Number(info.total_recovered.split(",").join(""))} />}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa fa-child fa-2x text-success"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-3 mb-4 mt-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center ">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">New Cases</div>
                                    <div className="row no-gutters align-items-center justify-content-center" >
                                        <div className="col-auto">
                                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{info.new_cases === undefined ? 0 : <CountUp end={Number(info.new_cases.split(",").join(""))} />}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa fa-bell fa-2x text-warning"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}