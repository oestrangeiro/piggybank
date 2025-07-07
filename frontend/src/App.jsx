import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Footer, Carousel } from "./components/index.js";
import Body from "./pages/Body";
import News from "./pages/News";
import "./styles/CampaignsPage.css";
import './styles/CampaignInfo.css';
import './styles/Homepage.css';
import "./styles/index.css";
import { Campaigns, CampaignInfo, Publishcampaign, Support, Formcampaign } from "./pages";

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
          <Route path="/divulgue" element={<Publishcampaign />} />
          <Route path="/suporte" element={<Support />} />
          <Route path="/campanha/:id" element={<CampaignInfo />} />
          <Route path="/nova-campanha" element={<Formcampaign />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
