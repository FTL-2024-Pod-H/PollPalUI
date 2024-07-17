
import ElectionEducation from "./Components/HomePage/ElectionEducation/ElectionEducation";
import './App.css'
import AboutSection from "./Components/HomePage/AboutSection/AboutSection.jsx"
import Header from "./Components/Header/Header";
import Post from './Components/Post/Post'
import HomePage from './Components/HomePage/HomePage';
import Footer from './Components/Footer/Footer';
import InteractiveMap from './Components/InteractiveMap/InteractiveMap';

function App() {
  return (
    <>
      <div id="root">
          <Header/>
          <main className="main-content">
            <HomePage />
            {/* <ElectionEducation /> */}
            {/* <InteractiveMap/> */}
            {/* <AboutSection /> */}
          </main>
          <Footer />
      </div>
    </>
  );
}

export default App;
