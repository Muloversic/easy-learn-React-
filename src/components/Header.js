import { nanoid } from "nanoid";
import { React, useState, useEffect } from "react";
export default function Header({ links, subLinks }) {
  const [burger, setBurger] = useState(false);
  const page = window.location.pathname.slice(1);
  const subItemLinks = subLinks.map((links) => {
    return (
      <li className="navigation__item" key={nanoid()}>
        <a href={links.href} className="navigation__link">
          <i className=" material-icons">{links.icon}</i>
        </a>
      </li>
    );
  });

  const linkItems = links.map((link) => {
    let title = "";
    let href = "";
    let icon = "";

    if (typeof link.value === "string") {
      title = link.value;
      href = link.href;
      icon = link.icon;
    } else {
      for (let subItem in link.value) {
        if (subItem === page) {
          title = link.value[subItem].subValue;
          href = link.value[subItem].href;
        }
      }
    }

    return (
      <li className="navigation__item" key={nanoid()}>
        <a href={href} className="navigation__link">
          {title}
          <i className="material-icons">{icon}</i>
        </a>
      </li>
    );
  });

  let navItems = [];
  useEffect(() => {
    navItems = document.querySelectorAll(".navigation__item");
  }, [burger]);

  //logic for burger menu
  useEffect(() => {
    const burgerItem = document.querySelector(".navigation__burger");
    [...navItems].forEach((navItem, index) => {
      if (index === 2) {
        navItem.classList.add("navigation__item--active");
      }

      if (burger) {
        navItem.classList.remove("navigation__item--active");
        burgerItem.classList.remove("navigation__burger--active");
        if (index === 2) {
          navItem.classList.add("navigation__item--active");
        }
      } else {
        navItem.classList.add("navigation__item--active");
        burgerItem.classList.add("navigation__burger--active");
        if (index === 2) {
          navItem.classList.remove("navigation__item--active");
        }
      }
    });
  }, [burger]);

  function openMenu() {
    setBurger((prevState) => !prevState);
  }

  return (
    <header className="header">
      <nav className="header__navigation navigation">
        <button
          onClick={openMenu}
          className="material-icons navigation__burger-btn"
        >
          drag_handle
        </button>
        <div className="navigation__burger"></div>
        <ul className="navigation__list">
          {linkItems}
          <li className="navigation__item">
            <ul className="navigation__sublist">{subItemLinks}</ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
