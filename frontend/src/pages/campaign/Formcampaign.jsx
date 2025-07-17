import { useRef, useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

//tera alteracoes com o back, pois ta usando um user do authcontext

export default function NovaCampanha() {
  const form = useRef();
  const { usuario } = useContext(AuthContext);
  const [sucesso, setSucesso] = useState(false);

  const [imagemTipo, setImagemTipo] = useState("upload"); // 'upload' ou 'url'
  const [imagemPreview, setImagemPreview] = useState(null);

  const navigate = useNavigate();

  const enviarCampanha = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);

    //INTEGRAR AINDA

    console.log("Dados da campanha:", Object.fromEntries(formData));

    setSucesso(true);
    form.current.reset();
    setImagemPreview(null);

    setTimeout(() => {
      navigate("/divulgue");
    }, 2000);
  };

  const handleImagemUploadChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemPreview(URL.createObjectURL(file));
    } else {
      setImagemPreview(null);
    }
  };

  const handleImagemUrlChange = (e) => {
    const url = e.target.value;
    setImagemPreview(url);
  };

  const [hidePB, setHidePB] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setHidePB(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="nova-campanha-page">
      {sucesso && (
        <div className="success-overlay">
          <div className="success-modal">
            <p className="success-text">🎉 Campanha criada com sucesso!</p>
          </div>
        </div>
      )}

      <div
        id="pb"
        className={`mt-5 container d-flex flex-column align-items-center justify-content-center ${
          hidePB ? "hidden" : ""
        }`}
      >
        <div className="form-header text-center">
          <h2 className="fw-bold">Divulgue sua Campanha</h2>
          <p className="text">Compartilhe sua causa conosco</p>
        </div>

        <div className="form-container">
          <form ref={form} onSubmit={enviarCampanha}>
            <input type="hidden" name="name" value={usuario?.username} />
            <input type="hidden" name="email" value={usuario?.email} />

            <div className="mb-3">
              <label className="form-label">Título da campanha:</label>
              <input
                type="text"
                name="titulo"
                className="form-control"
                placeholder="Ex: Projeto de doações"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Local:</label>
              <input
                type="text"
                name="local"
                className="form-control"
                placeholder="Cidade / Estado"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Meta de arrecadação (R$):</label>
              <input
                type="number"
                name="meta"
                className="form-control"
                placeholder="Ex: 1000"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descrição:</label>
              <textarea
                name="descricao"
                rows="4"
                className="form-control"
                placeholder="Conte mais sobre sua campanha"
                required
              ></textarea>
            </div>

            {/* Imagem com botões estilo original */}
            <div className="mb-3">
              <label className="form-label">Imagem: </label>
              <div
                className="btn-group mb-2"
                role="group"
                aria-label="Tipo de imagem"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="imagemTipo"
                  id="uploadRadio"
                  autoComplete="off"
                  checked={imagemTipo === "upload"}
                  onChange={() => {
                    setImagemTipo("upload");
                    setImagemPreview(null);
                  }}
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor="uploadRadio"
                >
                  Upload
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="imagemTipo"
                  id="urlRadio"
                  autoComplete="off"
                  checked={imagemTipo === "url"}
                  onChange={() => {
                    setImagemTipo("url");
                    setImagemPreview(null);
                  }}
                />
                <label className="btn btn-outline-primary" htmlFor="urlRadio">
                  URL
                </label>
              </div>

              {imagemTipo === "upload" ? (
                <input
                  type="file"
                  name="imagemUpload"
                  accept="image/*"
                  className="form-control"
                  onChange={handleImagemUploadChange}
                  required
                />
              ) : (
                <input
                  type="url"
                  name="imagemUrl"
                  className="form-control"
                  placeholder="Cole o link da imagem"
                  onChange={handleImagemUrlChange}
                  required
                />
              )}

              {imagemPreview && (
                <img
                  src={imagemPreview}
                  alt="Preview"
                  className="img-preview mt-2"
                />
              )}
            </div>

            {/* PIX */}
            <div className="mb-3">
              <label className="form-label">Qual sua chave PIX?</label>
              <input
                type="text"
                name="pix"
                className="form-control"
                placeholder="Digite sua chave PIX"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn-login w-100 rounded p-2 shadow"
              >
                Publicar Campanha
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
