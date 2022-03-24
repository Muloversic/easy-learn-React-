export default function NewSet(props) {
  return (
    <main className="main main-new_set new-set">
      <form className="new-set__form form">
        <label htmlFor="setName" className="form__label">
          Give a name to your set
        </label>
        <input
          type="text"
          placeholder="Name of set"
          name="setName"
          id="setName"
          className="form__input"
        />
        <label htmlFor="setInfo" className="form__label">
          Write any info about set
        </label>
        <input
          type="text"
          placeholder="Info"
          name="setInfo"
          id="setInfo"
          className="form__input"
        />
        <div className="form__words">
          <div className="form__word">
            <div className="from__word-input">
              <label className="form__label">Term</label>
              <input
                type="text"
                placeholder="Term"
                name="Term"
                className="form__input"
              />
            </div>
            <div className="from__word-input">
              <label className="form__label">Determination</label>
              <input
                type="text"
                placeholder="Determination"
                name="Determination"
                className="form__input"
              />
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
