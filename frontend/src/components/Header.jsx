import { useEffect, useState } from "react";
import logo from "../assets/pb logo.png";
import { Link } from "react-router-dom";

function Header() {
  const [hideNav, setHideNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      setHideNav(scrollTop > 700);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        id="nav"
        className={`navbar fixed-top navbar-expand-sm navbar-dark p-1 ${
          hideNav ? "hidden" : ""
        }`}
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-light mx-5">
            PiggyBank
            <img src={logo} width="45px" height="45px" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse mx-5 g-5" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item mx-5">
                <Link to="/campanhas" className="nav-link text-light" href="#">
                  Campanhas
                </Link>
              </li>
              <li className="nav-item mx-5">
                <Link to="/divulgue" className="nav-link text-light" href="#">
                  Divulgue Conosco
                </Link>
              </li>
              <li className="nav-item mx-5">
                <a className="nav-link text-light" href="#carouselNoticias">
                  Notícias
                </a>
              </li>
              <li className="nav-item mx-5">
                <a className="nav-link text-light" href="#div3">
                  Sobre nós
                </a>
              </li>
              <li className="nav-item mx-5">
                <Link to="/suporte" className="nav-link text-light">
                  Suporte
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
