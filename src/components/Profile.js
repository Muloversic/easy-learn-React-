export default function Profile() {
  return (
    <main className="main">
      <div className="main__profile profile">
        <div className="profile__user">
          {window.localStorage.getItem("UserPhoto") !== null ? (
            <img
              className="settings__preview-photo"
              src={window.localStorage.getItem("UserPhoto")}
              alt="user"
            />
          ) : (
            <i className="material-icons settings__preview-photo settings__preview-photo--default">
              person_outline
            </i>
          )}
          <p className="profile__user-name">
            {window.localStorage.getItem("User") || "GoodLearner7"}
          </p>
        </div>
        <div className="profile__statistic">
          <h2 className="profile__statistic-title">Your statistics</h2>
          <ul className="profile__list">
            <li className="profile__list-item">Words in total:</li>
            <li className="profile__list-item">Learned words:</li>
            <li className="profile__list-item">Amount of sets:</li>
            <li className="profile__list-item">
              Average percent of sets progress:
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
