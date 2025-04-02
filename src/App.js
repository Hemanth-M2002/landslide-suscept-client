import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import HomeMap from "./components/HomeMap";
import TeamPage from "./components/TeamPage";
import ComingSoon from "./components/ComingSoon";
import Research from "./components/Research";
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path ='/home' element = {<HomeMap/>}/>
        <Route path="/team" element={<TeamPage />} />
        <Route path="/soon" element={<ComingSoon />} />
        <Route path="/research" element={<Research />} />
      </Routes>
    </Router>
    </>
      );
}

export default App;
