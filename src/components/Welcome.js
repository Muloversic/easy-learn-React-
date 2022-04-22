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
// https://codepen.io/sirnightowl/pen/XWbZjZN
  return (
    <main className="main">
      <div className="main__welcome welcome">
        {user ? (
          <div className="welcome__default">
            <h1 className="welcome__title">Welcome to Easy Learn app!</h1>
            <ul className="welcome__list">
              <li className="welcome__list-item">
                <div className="welcome__list-wrap">
                  <div className="welcome__list-decor welcome__list-decor--left">
                    <Link to="/settings">You can visit the settings page</Link>
                  </div>
                  <div className="welcome__list-decor welcome__list-decor--right">
                    <Link to="/settings">here</Link>
                  </div>
                </div>
              </li>
              <li className="welcome__list-item">
                <div className="welcome__list-wrap">
                  <div className="welcome__list-decor welcome__list-decor--left">
                    <Link to="/sets">
                      You can visit the sets page and create new set or learn
                      that you have
                    </Link>
                  </div>
                  <div className="welcome__list-decor welcome__list-decor--right">
                    <Link to="/sets">here</Link>
                  </div>
                </div>
              </li>
              <li className="welcome__list-item">
                <div className="welcome__list-wrap">
                  <div className="welcome__list-decor welcome__list-decor--left">
                    <Link to="/profile">
                      You can visit the your profile page
                    </Link>
                  </div>
                  <div className="welcome__list-decor welcome__list-decor--right">
                    <Link to="/profile">here</Link>
                  </div>
                </div>
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
