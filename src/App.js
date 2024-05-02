import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./views/SignUp"
import SignIn from "./views/SignIn"
import EtudiantsProgression from "./views/etudiantsProgression"
import Home from "./views/Home"
import HomeGame from "./views/homeGame"
import GestionEtudiants from "./views/GestionEtudiant"
import GestionEnseignant from "./views/GestionEnseignant"
import Messages from "./views/messages"


import Layout from './layout';
function App() {
  return (
    <div className="App">

     <Router>
          <Routes>
            <Route
              path="/"
              element={<SignUp/>
              }
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

            <Route path="/etudiantsProgression" element={<EtudiantsProgression />} />
            <Route path="/homeGame" element={<HomeGame />} />
            <Route path="/SignIn" element={<SignIn/>}/>

          </Routes>
        </Router>
    </div>
  );
}

export default App;
