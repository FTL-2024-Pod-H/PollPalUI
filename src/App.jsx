import './App.css'
import Post from './Components/Post/Post';
import HomePage from './Components/HomePage/HomePage';
import Footer from './Components/Footer/Footer';

function App() {

  return (
    <div id="root">
        <main className="main-content">
          <HomePage />
        </main>
        <Footer />
    </div> 
  )
}

export default App
