import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Footer, Carousel } from "./components/index.js";
import Body from "./pages/Body";
import News from "./pages/News";
import "./styles/CampaignsPage.css";
import './styles/CampaignInfo.css';
import './styles/Homepage.css';
import "./styles/index.css";
import { Campaigns, CampaignInfo, Announce, Support } from "./pages";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Body />
                <Carousel />
              </>
            }
          />
          <Route path="/news" element={<News />} />
          <Route path="/campanhas" element={<Campaigns />} />
          <Route path="/divulgue" element={<Announce />} />
          <Route path="/suporte" element={<Support />} />
          <Route path="/campanha/:id" element={<CampaignInfo />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
