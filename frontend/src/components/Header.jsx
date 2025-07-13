import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../assets/pb logo.png";

function Header() {
  const [hideNav, setHideNav] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setHideNav(scrollTop > 700);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Cadastro = location.pathname === "/cadastro";
  const Suporte = location.pathname === "/suporte";

  return (
    <nav
      id="nav"
      className={`navbar fixed-top navbar-expand-sm navbar-dark p-1 ${
        hideNav ? "hidden" : ""
      } ${Cadastro ? "cadastro-header" : ""} ${
        Suporte ? "suporte-header" : ""
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
              <Link to="/campanhas" className="nav-link text-light">
                Campanhas
              </Link>
            </li>
            <li className="nav-item mx-5">
              <Link to="/divulgue" className="nav-link text-light">
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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-1">
              <Link to="/perfil" className="nav-link text-light">
                <i className="bi bi-person-circle fs-4"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
