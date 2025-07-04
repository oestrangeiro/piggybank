function Footer() {
  return (
    <>
      <section id="div3" className="text-light bg-dark py-5">
        <div className="container">
          <h1 className="mb-3">Sobre nós</h1>
          <p className="mb-4 text-light">redes sociais</p>
          <div className="row gy-4">
            <div className="col-12 col-md-4">
              <p className="text-light">
                Em um mundo cheio de desafios, a generosidade é a força que move
                mudanças reais. Aqui no <strong>PiggyBank</strong>, acreditamos
                que cada doação – não importa o tamanho – é uma semente de
                esperança, capaz de transformar vidas.
              </p>
            </div>
            <div className="col-12 col-md-4">
              <p className="text-light">
                Nossa plataforma foi criada para conectar pessoas como você a
                causas urgentes e inspiradoras. Seja ajudando famílias em
                situação de vulnerabilidade, apoiando educação ou o meio
                ambiente, sua contribuição faz parte de uma rede poderosa de
                impacto.
              </p>
            </div>
            <div className="col-12 col-md-4">
              <p className="text-light">
                <strong>Por que doar aqui?</strong>
                <br />✔ <strong>Transparência:</strong> Acompanhe o uso das
                doações.
                <br />✔ <strong>Diversidade:</strong> Escolha entre projetos
                verificados.
                <br />✔ <strong>Segurança:</strong> Processo 100% seguro.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark text-light text-center py-1">
        <div>&copy; 2025 PiggyBank - All Rights Reserved</div>
      </footer>
    </>
  );
}

export default Footer;
