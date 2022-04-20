import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
export default function Welcome() {
  const [user, setUser] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    const currentUser = localStorage.getItem("User");
    setUser(currentUser);
  }, [user]);

  return (
    <main className="main">
      <div className="main__welcome welcome">
        {user ? (
          <div className="welcome__default">
            <h1 className="welcome__title">Welcome to Easy Learn app!</h1>
            <ul className="welcome__list">
              <li className="welcome__list-item">
                <Link to="/settings">You can visit the settings page here</Link>
              </li>
              <li className="welcome__list-item">
                <Link to="/sets">
                  You can visit the sets page and create new set or learn that
                  you have here
                </Link>
              </li>
              <li className="welcome__list-item">
                <Link to="/profile">
                  You can visit the your profile page here
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="welcome__new">
            <h1 className="welcome__title">
              Looks like you're new here, go to settings to keep your progress
            </h1>
            <button
              className="welcome__button"
              onClick={() => navigate("/settings")}
            >
              Go to settings
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
