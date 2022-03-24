import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./scss/index.scss";
import Header from "./components/Header";
import Settings from "./components/Settings";
import Sets from "./components/Sets";
function App() {
  const subLinks = [
    {
      href: "/sets",
      icon: "format_align_left",
    },
    {
      href: "/profile",
      icon: "person_outline",
    },
    {
      href: "/settings",
      icon: "settings",
    },
  ];

  const links = [
    //value should be string
    {
      value: "EasyLearn",
      href: "/",
    },
    {
      value: "",
      href: "/",
      icon: "book",
    },
    {
      value: {
        //key represtns current page
        settings: {
          subValue: "settings",
        },
        sets: {
          subValue: "Add new set +",
        },
        profile: {
          subValue: "profile",
        },
      },
    },
  ];

  return (
    <div className="App">
      <Router>
        <Header links={links} subLinks={subLinks} />
        <Routes>
          <Route path="/" />
          <Route path="/settings" element={<Settings />} />
          <Route path="/sets" element={<Sets />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
