export default function Profile() {
  return (
    <main className="main">
      <div className="main__profile profile">
        <div className="profile__user">
          <img className="profile__user-photo" src="../images/IMG_20220403_103746.jpg" alt="user" />
          <p className="profile__user-name">Oleh Nikulin</p>
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
