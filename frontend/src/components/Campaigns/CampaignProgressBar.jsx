import PropTypes from 'prop-types';

const CampaignProgressBar = ({ meta, arrecadado }) => {
  // Calcula o percentual preenchido
  const percentualPreenchido = meta > 0 ? (arrecadado / meta) * 100 : 0;

  // Garante que o percentual não ultrapasse 100 e não seja negativo
  const percentualFormatado = Math.min(100, Math.max(0, percentualPreenchido));

  return (
    <div className="progress" role="progressbar" aria-label="Progresso da Meta" aria-valuenow={percentualFormatado} aria-valuemin="0" aria-valuemax="100">
      <div
        className="progress-bar"
        style={{ width: `${percentualFormatado}%` }} // Aplica o estilo dinâmico
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