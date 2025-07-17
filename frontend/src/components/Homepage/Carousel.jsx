import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { carousel } from "../../data/data";

function Carousel() {
  const [hideCarousel, setHideCarousel] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollBot = window.scrollY;
      setHideCarousel(scrollBot < 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-5 text-dark bgsecclr">
      <div className="container">
        <h2 className="mb-4 txtmainclr text-center">{carousel.title}</h2>

        <div
          id="carouselNoticias"
          className={`carousel slide ${hideCarousel ? "hidden" : ""}`}
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {carousel.car.map((item, i) => (
              <div
                className={`carousel-item txtmainclr ${
                  i === 0 ? "active" : ""
                }`}
                key={i}
              >
                <div className="row justify-content-center align-items-center">
                  <div className="col-md-5">
                    <img
                      src={item.img}
                      className="d-block w-100 rounded"
                      alt={item.title}
                    />
                  </div>
                  <div className="col-md-4">
                    <div className="p-4">
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                      <Link
                        to="/noticias"
                        state={{ newsItem: item }}
                        className="btn btn-outline-dark"
                      >
                        {carousel.btn}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselNoticias"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon bg-dark rounded"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselNoticias"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon bg-dark rounded"></span>
            <span className="visually-hidden">Próximo</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Carousel;
