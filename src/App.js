import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./scss/index.scss";
import Header from "./components/Header";
import Settings from "./components/Settings";
import Sets from "./components/Sets";
function App() {
  const subLinks = [
    {
      subSets: {
        href: "/sets",
        icon: "format_align_left",
      },
      subProfile: {
        href: "/profile",
        icon: "person_outline",
      },
      subSettings: {
        href: "/settings",
        icon: "settings",
      },
    },
  ];
  const links = [
    {
      value: "EasyLearn",
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
  // const links = [
  //   {
  //     value: "EasyLearn",
  //     href: "/",
  //     icon: "",
  //   },
  //   {
  //     value: {
  //       settings: "settings",
  //       profile: "profile",
  //       new: "add new set +",
  //     },
  //     href: {
  //       settings: "settings",
  //       profile: "profile",
  //       new: "/",
  //     },
  //   },
  //   {
  //     submenu: {
  //       sets: {
  //         value: "sets",
  //         href: "/",
  //         icon: "",
  //       },
  //       profile: {
  //         value: "profile",
  //         href: "/profile",
  //         icon: "",
  //       },
  //       settings: {
  //         value: "settings",
  //         href: "/settings",
  //         icon: "",
  //       },
  //     },
  //   },
  // ];
  return (
    <div className="App">
      <Router>
        <Header links={links} subLinks={subLinks}/>
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
