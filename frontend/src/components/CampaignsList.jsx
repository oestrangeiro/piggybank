import earthImage from '../assets/earth.jpg';
import {useRef, useEffect} from 'react';

export default function CampaignsList() {
  const listRef = useRef(null);

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

    return (
        <div className="campaigns-list" ref={listRef}>
          {
          [1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13].map((item, index) => (
          <div className="campaign-container" key={index}>
            <div className="campaign-content">
              <div className="campaign-image">
                <img src={earthImage} alt="Earth" />
              </div>
              <div className="campaign-info">
                <h5>Título da Campanha</h5>
                <p className="text-muted">Entidade X • Localização</p>
                <p>Descrição curta da campanha...</p>
                <div className='donation-progress mt-2'>
                  <p>
                    <strong>Meta:</strong> R$ 10.000 <strong>Arrecadado:</strong> R$ 3.200
                  </p>
                  <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar w-25"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
        }
        </div>
    )
}