export default function Settings() {
  const inputFile = document.querySelector(".settings__input-file");
  const preview = document.querySelector(".settings__img-preview");

  function handleFiles(files) {
    console.log(files);
    
  }
  return (
    <main className="main">
      <div className="main__settings settings">
        <div className="settings__user">
          <h2 className="settings__user-title">
            Choose profile photo and wirte your name
          </h2>
          <div className="settings__user-data">
            <label htmlFor="userName" className="settings__user-name">
              Write your name here
            </label>
            <input type="text" className="settings__input" id="userName" />
          </div>
          <div className="settings__input-wrapper">
            <input
              name="file"
              type="file"
              id="input__file"
              className="settings__input-file"
              accept="image/*"
              onChange={handleFiles}
            />
            <label htmlFor="input__file" className="settings__input-button">
              <span className="settings__icon-wrapper">
                <i className="settings__icon-file Small material-icons">
                  arrow_downward
                </i>
              </span>
              <span className="settings__input-text">Choose file</span>
            </label>
            <div className="settings__img-preview"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
