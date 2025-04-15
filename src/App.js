import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import HomeMap from "./components/HomeMap";
import TeamPage from "./components/TeamPage";
import ComingSoon from "./components/ComingSoon";
import Research from "./components/Research";
import FeaturesPage from "./components/FeaturePage";
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path ='/map-view' element = {<HomeMap/>}/>
        <Route path="/team" element={<TeamPage />} />
        <Route path="/soon" element={<ComingSoon />} />
        <Route path="/research" element={<Research />} />
        <Route path="/feature-page" element={<FeaturesPage />} />
      </Routes>
    </Router>
    </>
      );
}

export default App;
