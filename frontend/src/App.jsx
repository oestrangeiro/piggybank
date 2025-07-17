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
  Signin,
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
          <Route path="/noticias" element={<News />} />
          <Route path="/campanhas" element={<Campaigns />} />
          <Route path="/divulgue" element={<Publishcampaign />} />
          <Route path="/suporte" element={<Support />} />
          <Route path="/cadastro/:tipo" element={<Cadastro />} />
          <Route path="/login/:tipo" element={<Signin />} />
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
