import PropTypes from 'prop-types';

const CampaignProgressBar = ({ meta, arrecadado }) => {
  const percentualPreenchido = meta > 0 ? (arrecadado / meta) * 100 : 0;
  const percentualFormatado = Math.min(100, Math.max(0, percentualPreenchido));

  return (
    <div className="progress" role="progressbar" aria-label="Progresso da Meta" aria-valuenow={percentualFormatado} aria-valuemin="0" aria-valuemax="100">
      <div
        className="progress-bar"
        style={{ width: `${percentualFormatado}%` }} 
      >
        {`${percentualFormatado.toFixed(0)}%`} {/* Opcional: Mostra o percentual dentro da barra */}
      </div>
    </div>
  );
};

CampaignProgressBar.propTypes = {
  meta: PropTypes.number.isRequired,       
  arrecadado: PropTypes.number.isRequired,
};

export default CampaignProgressBar;