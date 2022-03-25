export default function NewWord(props) {
  return (
    <div className="form__word">
      <div className="form__word-data">
        <div className="form__word-input">
          <label className="form__label form__label--new-word">Term</label>
          <input
            type="text"
            name="Term"
            className="form__input form__input--new-word"
          />
          <button className="form__btn-lang">Choose language</button>
        </div>
        <div className="form__word-input">
          <label className="form__label form__label--new-word">
            Determination
          </label>
          <input
            type="text"
            name="Determination"
            className="form__input form__input--new-word"
          />
          <div className="form__buttons-lang">
            <button className="form__btn-lang">Add one more language</button>
            <button className="form__btn-lang">Choose language</button>
          </div>
        </div>
      </div>
    </div>
  );
}