import './App.css'
// import Post from './Components/Post/Post';
import HomePage from './Components/HomePage/HomePage';
import Footer from './Components/Footer/Footer';
import InteractiveMap from './Components/InteractiveMap/InteractiveMap';

function App() {

  return (
    <div id="root">
        <main className="main-content">
          {/* <HomePage /> */}
          <InteractiveMap/>
        </main>
        <Footer />
    </div> 
  )
}

export default App
