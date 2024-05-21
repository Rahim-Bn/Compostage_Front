import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./views/SignIn"
import EtudiantsProgression from "./views/etudiantsProgression"
import Home from "./views/Home"
import HomeGame from "./views/homeGame"
import GestionEtudiants from "./views/GestionEtudiant"
import GestionEnseignant from "./views/GestionEnseignant"
import Messages from "./views/messages"
import Request from "./views/request"


import Layout from './layout';

function App() {
  return (
    <div className="App">

     <Router>
          <Routes>
            <Route
              path="/"
              element={<SignIn/>}
            />
            <Route
              path="/Home"
              element={
                <Layout>
                  <Home/>
                </Layout>
              }
            />
            <Route
              path="/GestionEtudiant"
              element={
                <Layout>
                  <GestionEtudiants/>
                </Layout>
              }
            />
            <Route
              path="/GestionEnseignant"
              element={
                <Layout>
                  <GestionEnseignant/>
                </Layout>
              }
            />
            <Route
              path="/Messages"
              element={
                <Layout>
                  <Messages/>
                </Layout>
              }
            />
            <Route
              path="/Request"
              element={
                <Layout>
                  <Request/>
                </Layout>
              }
            />
            <Route
              path="/etudiantsProgression"
              element={
                <Layout useSideNav2={true}>
                  <EtudiantsProgression/>
                </Layout>
              }
            />
            <Route path="/homeGame" element={<HomeGame />} />
            <Route path="/SignIn" element={<SignIn/>}/>

          </Routes>
        </Router>
    </div>
  );
}

export default App;
