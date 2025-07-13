import { useEffect, useState } from "react";
import { body } from "../data/data";
import { Link } from "react-router-dom";

function Body() {
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
      <section id="div1" className="d-flex align-items-start bg-dark">
        <div
          className="overlay"
          style={{
            backgroundImage: `url(${body.bg1})`,
            backgroundPosition: "top",
          }}
        />

        <div className="content container-fluid m-5 p-5 text-white">
          <div className="row py-5 mt-5">
            <div
              id="pb"
              className={`col-md-6 mt-5 py-5 ${hidePB ? "hidden" : ""}`}
            >
              <h1 className="display-1">{body.title}</h1>
              <p className="lead text-light">{body.desc}</p>
              <Link
                to="/cadastro"
                className="btn btn-outline-light rounded mt-2"
              >
                {body.btn}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="bgsecclr">
        <div className="container p-5">
          <div className="row justify-content-center mb-5">
            <div className="col-md-10 text-center">
              <h2 className="mb-4" style={{ color: "var(--primary-color)" }}>
                {body.title2}
              </h2>
              <p className="lead text-muted">{body.desc2}</p>
            </div>
          </div>

          <div id="pb" className={`row text-center ${hidePB ? "" : "hidden"}`}>
            <div className="col-md-4 mb-4">
              <img
                src={body.child}
                alt="Ajuda a crianças"
                className="img-fluid rounded shadow-sm mb-3"
              />
              <h5 style={{ color: "var(--secondary-color)" }}>
                Ajude crianças em situação de risco
              </h5>
              <p className="text-muted">
                Doe para programas que garantem alimentação, educação e abrigo
                para crianças em comunidades vulneráveis.
              </p>
            </div>

            <div className="col-md-4 mb-4">
              <img
                src={body.medic}
                alt="Assistência médica"
                className="img-fluid rounded shadow-sm mb-3"
              />
              <h5 style={{ color: "var(--secondary-color)" }}>
                Contribua com assistência médica
              </h5>
              <p className="text-muted">
                Suas doações ajudam pessoas a terem acesso a medicamentos,
                cirurgias e tratamentos essenciais para viver com dignidade.
              </p>
            </div>

            <div className="col-md-4 mb-4">
              <img
                src={body.fome}
                alt="Distribuição de alimentos"
                className="img-fluid rounded shadow-sm mb-3"
              />
              <h5 style={{ color: "var(--secondary-color)" }}>
                Combata a fome com solidariedade
              </h5>
              <p className="text-muted">
                Apoie iniciativas que distribuem cestas básicas e refeições a
                famílias que enfrentam insegurança alimentar todos os dias.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Body;
