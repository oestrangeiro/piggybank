import { useEffect, useState } from "react";
import { body } from "../data/data";

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
              <a href="#" className="btn btn-outline-light rounded mt-2">
                {body.btn}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Body;
