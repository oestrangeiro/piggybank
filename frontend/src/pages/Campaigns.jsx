
import "../index.css";
import { Button, Form, InputGroup } from 'react-bootstrap';
//import PictureIcon from '../assets/picture.svg?react';
import {CampaignsList, ScrollTopButton} from '../components/index';


function Campaigns() {
  return (
    <div className="container py-4">
      {/* Barra de busca centralizada */}
      <div className="d-flex justify-content-center mb-4">
        <InputGroup className="search-tool" style={{ maxWidth: "600px", width: "100%"}}>
          <Form.Control placeholder="Buscar campanhas..." />
          <Button variant="primary">Filtros</Button>
        </InputGroup>
      </div>

      {/* Grid de conteúdo */}
      <div className="campaigns-grid">
        <div className="sidebar">
          <h5>Ordenar por:</h5>
          <ul className="list-unstyled">
            <li><Button variant="link">Mais populares</Button></li>
            <li><Button variant="link">Mais recentes</Button></li>
            <li><Button variant="link">Menos populares</Button></li>
          </ul>
        </div>
        <CampaignsList/>
      </div>
      
      <ScrollTopButton/>
    </div>
  );
}

export default Campaigns;
