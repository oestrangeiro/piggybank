import earthImage from "../../assets/earth.jpg";
import CampaignCard from "./CampaignCard";
import { useRef, useEffect, useState } from "react";

export default function CampaignsList({campaigns, withDelete = false}) {
  const listRef = useRef(null);
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
    <div className="campaigns-list my-5" ref={listRef}>
      {campaigns && campaigns.map((camp) => 
        <CampaignCard campanha={camp} withDelete={withDelete} key={camp.id}/>
      )}
    </div>
  );
}
