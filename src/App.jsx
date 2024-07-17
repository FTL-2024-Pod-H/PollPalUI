import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./Components/Header/Header";
import Post from './Components/Post/Post'
import Forum from './Components/Forum/Forum';
import HomePage from './Components/HomePage/HomePage';
import ElectionResults from './Components/ElectionResults/ElectionResults';
import SearchLocation from './Components/SearchLocation/SearchLocation';


function App() {

  return (
    // <>


    //   {/* <HomePage/> */}
      
    //   <Header/>
    //   <HomePage/>
    //   {/* <ElectionResults/> */}
    //   {/* <Forum/> */}
    // </>
    <BrowserRouter>
        <Header/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/results" element={<ElectionResults />} />
                <Route path="/search" element={<SearchLocation />} />
                <Route path="/forum" element={<Forum />} />
            </Routes>
        </BrowserRouter>
  )
}

export default App
