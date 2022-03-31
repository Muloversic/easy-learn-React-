import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./scss/index.scss";
import Header from "./components/Header";
import Settings from "./components/Settings";
import Sets from "./components/Sets";
import NewSet from "./components/NewSet";
import OpenSet from "./components/OpenSet";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function App() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAyIMCboUIMW3D6RntFba1uzIoE6gkjoV4",
    authDomain: "easy-learm.firebaseapp.com",
    databaseURL: "https://easy-learm-default-rtdb.firebaseio.com",
    projectId: "easy-learm",
    storageBucket: "easy-learm.appspot.com",
    messagingSenderId: "606003653726",
    appId: "1:606003653726:web:c60c75b6676cb64c3098cf",
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const [collectionData, setCollectionData] = useState(1);
  // const [openSetPage, setOpenSetPage] = useState();
  // console.log(collectionData);

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
          href: "/new-set",
        },
        profile: {
          subValue: "profile",
        },
        ["new-set"]: {
          subValue: "Creating new set",
        },
        ["open-set"]: {
          subValue: "Editing",
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
          <Route
            path="/sets"
            element={<Sets setCollectionData={setCollectionData} />}
          />
          <Route path="/new-set" element={<NewSet />} />
          <Route path="/open-set" element={<OpenSet />} />
          
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
