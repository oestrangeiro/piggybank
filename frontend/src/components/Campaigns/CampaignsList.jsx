import earthImage from "../../assets/earth.jpg";
import GeoIcon from "../../assets/geo.svg?react";
import CampaignProgressBar from "./CampaignProgressBar";
import { useRef, useEffect } from "react";

export default function CampaignsList() {
  const listRef = useRef(null);

  const handleScroll = () => {
    const list = listRef.current;
    if (list) {
      const isAtBottom =
        list.scrollHeight - list.scrollTop <= list.clientHeight + 1;
      if (isAtBottom) {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    const list = listRef.current;
    if (list) {
      list.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (list) {
        list.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="campaigns-list" ref={listRef}>
      {[1, 2, 3, 4, 5, 6].map((camp, index) => (
        <div className="campaign-container" key={index}>
          <div className="campaign-content">
            <div className="campaign-image">
              <img src={earthImage} alt="Earth" />
            </div>
            <div className="campaign-info">
              <h5>Título da Campanha</h5>
              <p className="text-muted">
                {" "}
                <GeoIcon /> Entidade X • Localização
              </p>
              <p>Descrição da campanha</p>
              <div className="donation-progress mt-2">
                <p>
                  <strong>Meta:</strong> R$ 10000 <strong>Arrecadado:</strong>{" "}
                  R$ 4000
                </p>
                <CampaignProgressBar meta={10000} arrecadado={4000} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
