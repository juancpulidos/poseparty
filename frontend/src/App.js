import React, {useState, useEffect} from 'react';
import { ToastProvider } from 'react-toast-notifications'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Room from './Room';
import LogPose from './LogPose';
import { GLITCH_SOCKET_HTTP_HOST } from './constants';
import './App.css';

function App() {

  const [joinURL, setJoinURL] = useState();

  // Ping Glitch socket server on startup 
  useEffect(() => {
    fetch(GLITCH_SOCKET_HTTP_HOST, {
      mode: 'no-cors'
    });
  }, []);

  const generateRoomID = () => {
    return Math.floor(Math.random() * 0xFFFFFF).toString(16);
  }

  const roomID = generateRoomID();

  return (
    <div className="App">
      <ToastProvider>
        <Router>
          <div className="App-container">
            
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/room/:roomID">
                <Room />
              </Route>
              <Route path="/pose/:imageName">
                <LogPose />
              </Route>
              <Route path="/">
                <div className="home">
                  <Link to="/"><h1 className="display">PoseParty</h1></Link>
                  <h2>A social exercise game you can play while social distancing.</h2>
                  <h3>Create a room, invite some friends, and try your hardest to match the poses shown to you over the course of the game!</h3>
                  <Link to={`/room/${roomID}`}><div className="button display">Create a Room</div></Link>
                </div>
                <h1 className="display" style={{marginBottom: '20px'}}>Demo</h1>
                <iframe width="640" height="360" src="https://www.youtube.com/embed/1ielsQyZPLU" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="true"></iframe>
              </Route>
            </Switch>
            <div className="footer">
              {/* <p>© PoseParty</p> */}
              {/* <br/> */}
              <a className="donate" target="#blank" href="https://www.buymeacoffee.com/E72czYb">☕ Buy us a coffee 😊</a>
            </div>
          </div>
        </Router>
      </ToastProvider>
    </div>
  );
}

export default App;
