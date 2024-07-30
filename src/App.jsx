import ElectionEducation from "./Components/HomePage/ElectionEducation/ElectionEducation";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AboutSection from "./Components/HomePage/AboutSection/AboutSection.jsx";
import Header from "./Components/Header/Header";
import Post from './Components/Forum/Post/Post.jsx';
import Forum from './Components/Forum/Forum';
import HomePage from './Components/HomePage/HomePage';
import ElectionResults from './Components/ElectionResults/ElectionResults';
import SearchLocation from './Components/SearchLocation/SearchLocation';
import Footer from './Components/Footer/Footer';
import InteractiveMap from './Components/InteractiveMap/InteractiveMap';
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import ChatBot from "./Components/ChatBot/ChatBot.jsx";
import ForgotPswd from "./Components/Login/ForgotPswd.jsx";
import ResetPswd from "./Components/Login/ResetPswd.jsx";


function App() {
  return (
    <BrowserRouter>
      <div id="root">
          <Header/>
            <main className="main-content">
              <Routes>
                  <Route path="/" element={<HomePage />} />

                  <Route path="/results" element={<ElectionResults />} />
                  <Route path="/search" element={<SearchLocation />} />
                  <Route path="/forum" element={<Forum />} />
                  <Route path="/map" element={<InteractiveMap/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/forgot" element={<ForgotPswd/>} />
                  <Route path="/reset" element={<ResetPswd/>} />
                  

              </Routes>
              <ChatBot/>
              </main>
              <Footer />
          </div>
        </BrowserRouter>
  );
}

export default App;
