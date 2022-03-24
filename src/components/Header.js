export default function Header({ links, subLinks }) {
  const page = window.location.pathname.slice(1);
  const subItemLinks = subLinks.map((links) => {
    return (
      <li className="navigation__item">
        <a href={links.href} className="navigation__link">
          <i className="large material-icons">{links.icon}</i>
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
        }
      }
    }

    return (
      <li className="navigation__item">
        <a href={href} className="navigation__link">
          {title}
          <i className="large material-icons">{icon}</i>
        </a>
      </li>
    );
  });

  return (
    <header className="header">
      <nav className="header__navigation navigation">
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
