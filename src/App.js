import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import HomeMap from "./components/HomeMap";
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path ='/home' element = {<HomeMap/>}/>
      </Routes>
    </Router>
    </>
      );
}

export default App;
