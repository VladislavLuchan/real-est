import './App.css';
import bg from './img/landing-bg.jpg'
import { Switch, Route } from 'react-router-dom'
import Header from './components/header'
import Landing from './components/landing'
import Login from './components/login'
import Register from './components/register'
import Dashboard from './components/dashboard'
import Contracts from './components/contracts'

function App() {
  return (
    <div className="wrapper" style={styles}> 
    <Header />
    <main>
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/contracts">
          <Contracts />
        </Route>
      </Switch>
    </main>
    </div>
  );
}

const styles = { backgroundImage: `url(${bg})`, backgroundPosition: 'center', backgroundSize: 'cover' }

export default App;
