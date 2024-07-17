
import ElectionEducation from "./Components/HomePage/ElectionEducation/ElectionEducation";
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutSection from "./Components/HomePage/AboutSection/AboutSection.jsx"
import Header from "./Components/Header/Header";
import Post from './Components/Post/Post'
import Forum from './Components/Forum/Forum';
import HomePage from './Components/HomePage/HomePage';
import ElectionResults from './Components/ElectionResults/ElectionResults';
import SearchLocation from './Components/SearchLocation/SearchLocation';
import Footer from './Components/Footer/Footer';
import InteractiveMap from './Components/InteractiveMap/InteractiveMap';

function App() {
  return (
    <BrowserRouter>
      <div id="root">
          <Header/>
          <main className="main-content">
              <Routes>
                  <Route path="/" element={<HomePage />} />

                   {/* <ElectionEducation /> */}
                   {/* <InteractiveMap/> */}
                   {/* <AboutSection /> */}

                  <Route path="/results" element={<ElectionResults />} />
                  <Route path="/search" element={<SearchLocation />} />
                  <Route path="/forum" element={<Forum />} />
                  {/* Change to map */}
                  <Route path="/map" element={<InteractiveMap/>} />
              </Routes>
              </main>
              <Footer />
          </div>
        </BrowserRouter>
  );

}

export default App;
