import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Footer, Carousel } from "./components/index.js";
import "./styles/index.css";
import "./styles/Cadastro.css";
import "./styles/Homepage.css";
import "./styles/CampaignInfo.css";
import "./styles/CampaignsPage.css";
import "./styles/FormCampaign.css";
import {
  Campaigns,
  Support,
  Body,
  News,
  Cadastro,
  Login,
  Profile,
  CampaignInfo,
  Formcampaign,
  Publishcampaign,
} from "./pages";

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
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/campanha" element={<CampaignInfo />} />
          <Route path="/nova-campanha" element={<Formcampaign />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
