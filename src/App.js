import './App.css';
import { useEffect } from 'react'
// import bg from './img/landing-bg.jpg'
import { Switch, Route, useHistory } from 'react-router-dom'
import Header from './components/header'
import Landing from './components/landing'
import Login from './components/login'
import Register from './components/register'
import Dashboard from './components/dashboard'
import MatContracts from './components/meterial-contacts'
import { useSelector, useDispatch } from 'react-redux'
import firebase from './firebase'
import { selectUser, login, logout } from './userSlice'

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const history = useHistory()

   useEffect(() => {
    firebase.auth.onAuthStateChanged(authUser => {
      // console.log(authUser)
      if(authUser) {
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))

        history.replace('/contracts')

      } else {
        dispatch(logout())
      }
    })
  }, [])

  return (
    // <div className="wrapper" style={styles}> 
    <div className="wrapper"> 
    <Header />
    <main>
      <Switch>
        <Route path="/" exact >
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
          <MatContracts />
        </Route>
      </Switch>
    </main>
    </div>
  );
}

// const styles = { backgroundImage: `url(${bg})`, backgroundPosition: 'center', backgroundSize: 'cover' }

export default App;
