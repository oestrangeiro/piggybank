import './styles/index.css';
import './styles/Campaigns.css';
import { Header, Footer} from './components';
import { Routes, Route } from 'react-router-dom';
import { Campaigns, Announce, Support } from './pages';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/campanhas" element={<Campaigns />} />
          <Route path="/divulgue" element={<Announce />} />
          <Route path="/suporte" element={<Support />} />
          <Route path="/" element={
            <>
              <h1>Welcome to PiggyBank</h1>
              <p>Lorem ipsum dolor sit amet.</p>
            </>
          } />
        </Routes>
      </main>
      <Footer/>
    </>
  );
}

export default App;