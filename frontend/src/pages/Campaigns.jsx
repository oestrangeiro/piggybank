import { Button, Form, InputGroup } from "react-bootstrap";
import { CampaignsList, ScrollTopButton } from "../components/index";
import { body } from "../data/data";
import { useEffect, useState } from "react";

function Campaigns() {
  const [hidePB, setHidePB] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setHidePB(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section
        id="div1"
        className="d-flex align-items-start bg-dark text-white"
      >
        <div
          className="overlay"
          style={{
            backgroundImage: `url(${body.bg4})`,
            backgroundPosition: "bottom",
          }}
        />

        <div className="content container-fluid m-5 p-5">
          <div className="row py-5 mt-5">
            <div
              id="pb"
              className={`col-md-6 mt-5 py-5 ${hidePB ? "hidden" : ""}`}
            >
              <h1 className="display-1 mt-5">{body.titleCamp}</h1>
              <p className="lead text-light">{body.descCamp}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-fluid bgsecclr py-4">
        <div className="d-flex justify-content-center mb-4">
          <InputGroup
            className="search-tool"
            style={{ maxWidth: "600px", width: "100%" }}
          >
            <Form.Control placeholder="Buscar campanhas..." />
            <Button className="filtering-btn">Filtros</Button>
          </InputGroup>
        </div>
        <CampaignsList />
        <ScrollTopButton />
      </div>
    </>
  );
}

export default Campaigns;
