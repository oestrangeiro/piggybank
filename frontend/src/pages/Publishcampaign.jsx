import { Button } from "react-bootstrap";
import { CampaignsList, ScrollTopButton } from "../components/index";
import { body } from "../data/data";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import earthImage from "../assets/earth.jpg";
import "../styles/PublishCampaign.css";

function PublishCampaign() {
  const { usuario } = useContext(AuthContext);
  const [hideHeroText, setHideHeroText] = useState(false);

  const [userCampaigns, setUserCampaigns] = useState([
    {
      id: 1,
      titulo: "A calopsita Nina",
      local: " Cidade / Estado",
      meta: 2500,
      arrecadado: 1000,
      descricao: "Calopsita com insuficiência renal.",
      imagem: earthImage,
      entidade: "Entidade X",
    },
    {
      id: 2,
      titulo: "Cãozinho Thor",
      local: "Cidade / Estado",
      meta: 4000,
      arrecadado: 2100,
      descricao: "Tratamento de doença rara.",
      imagem: earthImage,
      entidade: "Entidade Y",
    },
    {
      id: 3,
      titulo: "Gatinha Luna",
      local: "Cidade / Estado",
      meta: 3000,
      arrecadado: 1500,
      descricao: "Ajuda para cirurgia.",
      imagem: earthImage,
      entidade: "Entidade Z",
    },
  ]);

  const [campanhaToDelete, setCampanhaToDelete] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setHideHeroText(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDelete = (id) => {
    const updatedCampaigns = userCampaigns.filter((c) => c.id !== id);
    setUserCampaigns(updatedCampaigns);
    setCampanhaToDelete(null);
  };

  return (
    <>
      <section
        id="div1"
        className="d-flex align-items-start bg-dark text-white mb-3"
      >
        <div
          className="overlay"
          style={{
            backgroundImage: `url(${body.bg4})`,
          }}
        />
        <div
          className="content container-fluid m-5 p-5"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="row py-5 mt-5">
            <div
              id="hero-text"
              className={`col-md-6 mt-2 py-5 ${hideHeroText ? "hidden" : ""}`}
            >
              <h1 className="display-1 mt-3">Suas campanhas</h1>
              <p className="lead text-light">
                Aqui você cria e gerencia suas campanhas!
              </p>
              <Button
                onClick={() => (window.location.href = "/nova-campanha")}
                className="btn-new-campaign mt-4"
                variant="outline-success"
              >
                Criar Nova Campanha
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CampaignsList withDelete={true}/>

      <ScrollTopButton />

      {/* Modal para confirmar exclusão de cmp*/}
      {campanhaToDelete && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <p className="fw-bold mb-3">
              Tem certeza que quer apagar a campanha "{campanhaToDelete.titulo}
              "?
            </p>
            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                onClick={() => setCampanhaToDelete(null)}
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(campanhaToDelete.id)}
              >
                Apagar campanha
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PublishCampaign;
