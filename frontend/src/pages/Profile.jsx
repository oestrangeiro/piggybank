import { userData } from "../data/data";
import { body } from "../data/data";

function Profile() {
  const {
    username,
    status,
    avatar,
    since,
    bio,
    email,
    interests,
    notifications,
    activity,
    recentCampaigns,
  } = userData;

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
            <div className="col-md-6">
              <img
                src={avatar}
                className="rounded-circle mb-3"
                alt="Foto do usuário"
                width={"200px"}
                height={"200px"}
              />
              <h1 className="display-3">{username}</h1>
              <p className="lead">{status}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="p-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4 mt-4">
              <div className="card text-center shadow-sm py-5 mt-5">
                <div
                  className="card-body py-5"
                  style={{ color: "rgb(15, 55, 63)" }}
                >
                  <h4 className="card-title">{username}</h4>
                  <p className="text-muted">Usuário desde {since}</p>
                  <p>{bio}</p>
                  <a href="#" className="btn btn-outline-warning w-100 mt-3">
                    Editar Perfil
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="card shadow-sm mb-4">
                <div
                  className="card-header text-white"
                  style={{ backgroundColor: "rgb(15, 55, 63)" }}
                >
                  <strong>Resumo de Atividades</strong>
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
                  <strong>Campanhas Recentemente Apoiadas</strong>
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
                  <strong>Preferências do Usuário</strong>
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
    </>
  );
}

export default Profile;
