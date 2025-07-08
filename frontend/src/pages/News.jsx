import { useLocation, Link } from "react-router-dom";
import { body as bodyImage } from "../data/data";
import { useEffect, useState } from "react";

function News() {
  const location = useLocation();
  const newsItem = location.state?.newsItem;
  const [hidePB, setHidePB] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setHidePB(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!newsItem) {
    return (
      <div className="container py-5">
        <h2>Notícia não encontrada</h2>
        <p>Volte ao início e selecione uma notícia válida.</p>
        <Link to="/" className="btn btn-outline-dark">
          &larr; Voltar para o início
        </Link>
      </div>
    );
  }

  const {
    title,
    desc,
    date = "XX de XXXX de 2025",
    author = "Equipe PiggyBank",
    img: image,
    intro = "",
    body = [""],
    quote = "",
    conclusion = "",
  } = newsItem;

  return (
    <>
      <section
        id="div1"
        className="d-flex align-items-start bg-dark text-white"
      >
        <div
          className="overlay"
          style={{
            backgroundImage: `url(${bodyImage.bg2})`,
            backgroundPosition: "bottom",
          }}
        />

        <div className="content container-fluid m-5 p-5">
          <div className="row py-5 mt-5">
            <div
              id="pb"
              className={`col-md-6 mt-5 py-5 ${hidePB ? "hidden" : ""}`}
            >
              <h1 className="display-5 mt-5">{title}</h1>
              <p className="lead text-light">{desc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 txtmainclr">
        <div className="container">
          <p className="text-dark">
            Publicado em {date} • Por {author}
          </p>
          <img
            src={image}
            alt="Imagem da notícia"
            className="img-fluid rounded mb-4"
          />
          <div className="lead mb-4">{intro}</div>
          <hr className="my-4" />
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <blockquote className="blockquote my-4 px-3 border-start border-4 border-primary">
            <p className="mb-0">{quote}</p>
            <footer className="blockquote-footer text-dark mt-3">
              {author}
            </footer>
          </blockquote>

          <p>{conclusion}</p>

          <div className="mt-5">
            <Link to="/" className="btn btn-outline-dark">
              &larr; Voltar para o início
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default News;
