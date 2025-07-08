import { userData } from "../data/data";
import { body } from "../data/data";
import { useEffect, useState } from "react";

function Profile() {
  const {
    username,
    since,
    bio,
    email,
    interests,
    notifications,
    activity,
    recentCampaigns,
  } = userData;

  const [avatar, setAvatar] = useState(userData.avatar);
  const [showEditModal, setShowEditModal] = useState(false);
  const [hidePB, setHidePB] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setHidePB(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section id="div1" className="d-flex align-items-start text-white">
        <div
          className="overlay"
          style={{
            backgroundImage: `url(${body.bg3})`,
            backgroundPosition: "center",
          }}
        />

        <div className="content container-fluid m-5 p-5">
          <div className="row mt-5">
            <div id="pb" className={`col-md-6 mt-5 ${hidePB ? "hidden" : ""}`}>
              <img
                src={avatar}
                className="rounded-circle mb-3"
                alt="Foto do usuário"
                width={"200px"}
                height={"200px"}
              />
              <h1 className="display-3">{username}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="p-5 bgsecclr">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4 mt-4">
              <div className="card text-center shadow-sm py-5 mt-5">
                <div
                  className="card-body py-5"
                  style={{ color: "rgb(15, 55, 63)" }}
                >
                  <h4 className="card-title">{username}</h4>
                  <p className="text-muted"> {since}</p>
                  <p>{bio}</p>
                  <button
                    className="btn btn-outline-warning w-100 mt-3"
                    onClick={() => setShowEditModal(true)}
                  >
                    {userData.btn}
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="card shadow-sm mb-4">
                <div
                  className="card-header text-white"
                  style={{ backgroundColor: "rgb(15, 55, 63)" }}
                >
                  <strong>{userData.desc}</strong>
                </div>
                <div className="card-body">
                  <div className="row text-center">
                    <div className="col-md-4">
                      <h5>{activity.donations}</h5>
                      <p className="text-muted">Doações</p>
                    </div>
                    <div className="col-md-4">
                      <h5>{activity.total}</h5>
                      <p className="text-muted">Total Contribuído</p>
                    </div>
                    <div className="col-md-4">
                      <h5>{activity.favorites}</h5>
                      <p className="text-muted">Causas Favoritas</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card shadow-sm mb-4">
                <div
                  className="card-header text-white"
                  style={{ backgroundColor: "rgb(15, 55, 63)" }}
                >
                  <strong>{userData.desc2}</strong>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {recentCampaigns.map((c, i) => (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        {c.title}{" "}
                        <span className="badge text-dark bg-warning">
                          {c.amount}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card shadow-sm">
                <div
                  className="card-header text-white"
                  style={{ backgroundColor: "rgb(15, 55, 63)" }}
                >
                  <strong>{userData.desc3}</strong>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Áreas de interesse:</strong> {interests.join(", ")}
                  </p>
                  <p>
                    <strong>Notificações:</strong>{" "}
                    {notifications ? "Ativadas" : "Desativadas"}
                  </p>
                  <p>
                    <strong>Contato:</strong> {email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showEditModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                }}
              >
                <h5 className="modal-title">Editar Perfil</h5>
                <button
                  type="button"
                  className="btn-close bg-light"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3 text-center">
                  <img
                    src={avatar}
                    alt="Avatar atual"
                    className="rounded-circle mb-3"
                    width="100"
                    height="100"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control mb-3"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setAvatar(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={username}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    defaultValue={email}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Biografia</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    defaultValue={bio}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-success">Salvar Alterações</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
