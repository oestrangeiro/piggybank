import { Button, Form, InputGroup } from 'react-bootstrap';
import {CampaignsList, ScrollTopButton} from '../components/index';


function Campaigns() {
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-center mb-4">
        <InputGroup className="search-tool" style={{ maxWidth: "600px", width: "100%"}}>
          <Form.Control placeholder="Buscar campanhas..." />
          <Button className="filtering-btn">Filtros</Button>
        </InputGroup>
      </div>
      <CampaignsList/>
      <ScrollTopButton/>
    </div>
  );
}

export default Campaigns;
