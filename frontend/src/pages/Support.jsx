import { useRef, useContext, useState } from 'react';
import emailjs from 'emailjs-com';
import { AuthContext } from '../contexts/AuthContext.js';

export default function Support() {
  const form = useRef();
  const { usuario } = useContext(AuthContext);
  const [sucesso, setSucesso] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_vf96ner',    
      'template_xrkm4em', 
      form.current,
      'HrBzxSCXcg_Lh3dE9'
    ).then(
      () => {
        setSucesso(true);
        form.current.reset();
      },
      (error) => {
        alert('Erro ao enviar. Tente novamente.');
        console.error(error);
      }
    );
  };

  return (
    <div className='min-vh-100 d-flex justify-content-center align-items-center' style={{ backgroundColor: '#0f373f', minHeight: '100vh', padding: '3rem 1rem', position: 'relative' }}>
      {sucesso && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="bg-white p-4 rounded shadow text-center" style={{ maxWidth: '400px' }}>
            <p className="mb-3 fw-bold text-success">Mensagem enviada com sucesso!</p>
            <button className="btn btn-outline-success" onClick={() => setSucesso(false)}>OK</button>
          </div>
        </div>
      )}

      {/* Formulário */}
      <div className="mt-5 container d-flex flex-column align-items-center justify-content-center">
        <div className="text-center text-light mb-4">
          <h2 className="fw-bold">Entre em contato conosco</h2>
          <p className="text-muted">Estamos prontos para ouvir você</p>
        </div>

        <div className="p-4 rounded shadow-lg" style={{ backgroundColor: '#f4f8f9', width: '100%', maxWidth: '700px' }}>
          <form ref={form} onSubmit={sendEmail}>
            {/* Campos ocultos com dados do usuário logado, ele n vai precisar add nome email, vem de perfil*/}
            <input type="hidden" name="name" value={usuario?.username} />
            <input type="hidden" name="email" value={usuario?.email} />

            <div className="mb-3">
              <label className="form-label text-dark">Assunto:</label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Digite o assunto"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-dark">Mensagem:</label>
              <textarea
                name="message"
                rows="5"
                className="form-control"
                placeholder="Escreva sua mensagem"
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-success w-100 shadow">Enviar</button>
            </div>
          </form>
        </div>

        {/* Link ara as nossas redes sociais */}
        <div className="text-center mt-4 fs-4 text-light">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="me-3 text-light">
                <i className="bi bi-instagram"></i>
            </a>
            <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=piggybankweb1@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="me-3 text-light"
                >
                <i className="bi bi-envelope-fill"></i>
            </a>
            <a href="https://github.com/VorAd2/piggybank" target="_blank" rel="noreferrer" className="text-light">
                <i className="bi bi-github"></i>
            </a>
        </div>
      </div>
    </div>
  );
}