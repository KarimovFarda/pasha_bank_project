import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './components/privateRoute'
import WeatherPage from './components/weather/weatherpage';
import CovidPage from './components/covidpage/covid';
import NotFound from './components/NotFound'
import Main from './components/news/mainpage';
import Admin from './components/admin'
import RegisterPage from './components/register/index'
import NewsById from './components/newsById/newsletter';
import PaymentPage from './components/payment/paymentPage';
import CovidMap from './components/covidmap/index'
const API_BASE = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus';

const json = (res: any) => res.json();
const details = {
  headers: {
    'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
    'x-rapidapi-key': '53009286a0mshdc8ec356f7aa205p1e0e80jsn5858f548ed53'
  }
};
function App() {
  const catchJSON = (url: any, details: any) => fetch(url, details).then(json).then(data => { console.log(data) });
  const random = (url: any) => `${API_BASE}/${url}.php?_=${Math.random()}`;
  const catchData = () => [
    catchJSON(random('cases_by_country'), details)
  ]
  const refresh = () => Promise.all(catchData()).then();
  document.addEventListener("DOMContentLoaded", refresh)
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/weather" >
            <WeatherPage />
          </Route>
          <Route path="/covid" >
            <CovidPage />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/payment">
            <PaymentPage />
          </Route>
          <Route path="/map">
            <CovidMap />
          </Route>
          <Route path="/main/:id">
            <NewsById />
          </Route>
          <PrivateRoute path="/main" component={Main} />
          <Route path="/" exact component={RegisterPage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
