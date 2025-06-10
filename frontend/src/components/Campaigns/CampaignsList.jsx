import earthImage from '../../assets/earth.jpg';
import GeoIcon from '../../assets/geo.svg?react';
import ProgressBar from '../CampaignProgressBar';
import {useRef, useEffect, useState} from 'react';
import axios from 'axios';

export default function CampaignsList() {
  const [campanhas, setCampanhas] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const listRef = useRef(null);

  const URL = 'http://localhost/piggybank/backend/public/campanhas'

  const handleScroll = () => {
    const list = listRef.current;
    if (list) {
      const isAtBottom = list.scrollHeight - list.scrollTop <= list.clientHeight + 1;
      if (isAtBottom) {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
            try {
                const response = await axios.get(URL);
                setCampanhas(response.data);
            } catch (err) {
                console.error('Erro ao buscar dados:', err);
                setErro('Não foi possível carregar os dados. Verifique o console.');
            } finally {
                setCarregando(false);
            }
        };
    fetchData()
    const list = listRef.current;
    if (list) {
      list.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (list) {
        list.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

    if (carregando) return <p>Carregando dados da API...</p>;
    if (erro) return <p style={{ color: 'red' }}>{erro}</p>;

    return (
        <div className="campaigns-list" ref={listRef}>
          {
          campanhas.map((camp, index) => (
          <div className="campaign-container" key={index}>
            <div className="campaign-content">
              <div className="campaign-image">
                <img src={earthImage} alt="Earth" />
              </div>
              <div className="campaign-info">
                <h5>{camp.titulo}</h5>
                <p className="text-muted"> <GeoIcon/> Entidade X • Localização</p>
                <p>{camp.descricao}</p>
                <div className='donation-progress mt-2'>
                  <p>
                    <strong>Meta:</strong> R$ {camp.meta} <strong>Arrecadado:</strong> R$ {camp.recebido}
                  </p>
                  <ProgressBar meta={camp.meta} arrecadado={camp.recebido} />
                </div>
              </div>
            </div>
          </div>
        ))
        }
        </div>
    )
}