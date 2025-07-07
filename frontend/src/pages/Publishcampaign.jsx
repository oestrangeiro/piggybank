import { Button } from "react-bootstrap";
import { ScrollTopButton } from "../components/index";
import { body } from "../data/data";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import earthImage from "../assets/earth.jpg";
import GeoIcon from "../assets/geo.svg?react"; 
import "../styles/PublishCampaign.css";

//tera alteracoes com o back, pois ta usando um user do authcontext

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

  // Cálculo % arrecadado
  const porcentagemArrecadado = (campanha) =>
    Math.min(
      100,
      ((campanha.arrecadado / campanha.meta) * 100).toFixed(2)
    );

  return (
    <>
      <section
        id="hero-divulgue"
        className="d-flex align-items-start bg-dark text-white"
      >
        <div
          className="overlay"
          style={{
            backgroundImage: `url(${body.bg4})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            filter: "brightness(0.5)", // ESCURECIDO
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        />
        <div className="content container-fluid m-5 p-5" style={{ position: "relative", zIndex: 1 }}>
          <div className="row py-5 mt-5">
            <div
              id="hero-text"
              className={`col-md-6 mt-2 py-5 ${hideHeroText ? "hidden" : ""}`}
            >
              <h1 className="display-1 mt-3">Suas campanhas</h1>
              <p className="lead text-light">Aqui você cria e gerencia suas campanhas!</p>
              <Button
                onClick={() => window.location.href = "/nova-campanha"}
                className="btn-new-campaign mt-4"
                variant="outline-success"
              >
                Criar Nova Campanha
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="campaigns-list">
        {userCampaigns.map((campanha) => (
          <div className="campaign-container" key={campanha.id}>
            <div className="campaign-content">
              <div className="campaign-image">
                <img src={campanha.imagem} alt={campanha.titulo} />
              </div>
              <div className="campaign-info">
                <h5>{campanha.titulo}</h5>
                <p className="text-muted">
                  <GeoIcon /> {campanha.entidade} • {campanha.local}
                </p>
                <p>{campanha.descricao}</p>

                <div className="donation-progress mt-2">
                  <p>
                    <strong>Meta:</strong> R${campanha.meta}{" "}
                    <strong>Arrecadado:</strong> R${campanha.arrecadado}
                  </p>
                  <div className="progress-and-text">
                    <progress
                      max={campanha.meta}
                      value={campanha.arrecadado}
                      className="progress"
                    />
                    <span className="progress-percentage">
                      {porcentagemArrecadado(campanha)}%
                    </span>
                  </div>
                </div>

                <div className="text-end mt-2">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setCampanhaToDelete(campanha)}
                  >
                    Deletar campanha
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ScrollTopButton />

      {/* Modal para confirmar exclusão de cmp*/}
      {campanhaToDelete && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <p className="fw-bold mb-3">
              Tem certeza que quer apagar a campanha "
              {campanhaToDelete.titulo}"?
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
