
import ElectionEducation from "./Components/HomePage/ElectionEducation/ElectionEducation";
import './App.css'
import Header from "./Components/Header/Header";
import Post from './Components/Post/Post'
import HomePage from './Components/HomePage/HomePage';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <>
      <div id="root">
          <Header/>
          <main className="main-content">
            <HomePage />
            {/* <ElectionEducation /> */}
          </main>
          <Footer />
      </div>
    </>
  );
}

export default App;
