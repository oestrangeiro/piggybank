import earthImage from '../../assets/earth.jpg';
import GeoIcon from '../../assets/geo.svg?react';


export default function CampaignsList() {
    return (
        <div className="campaigns-list">
          {
          [1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13].map((item, index) => (
          <div className="campaign-container" key={index}>
            <div className="campaign-content">
              <div className="campaign-image">
                <img src={earthImage} alt="Earth" />
              </div>
              <div className="campaign-info">
                <h4>Título da Campanha</h4>
                <p className="text-muted my-1"> <GeoIcon/> Entidade X • Localização</p>
                <p>Descrição curta da campanha...</p>
                <div className='donation-progress mt-2'>
                  <p className='mb-3'>
                    <strong>Meta:</strong> R$ 10.000 <strong>Arrecadado:</strong> R$ 3.200
                  </p>
                  <div className="progress-and-text">
                    <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                      <div className="progress-bar" style={{ width: '25%' }}></div>
                    </div>
                    <span className="progress-percentage">25%</span>
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