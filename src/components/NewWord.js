import { useState } from "react";
import ExtraTranslation from "./ExtraTranslation";
export default function NewWord(props) {
  const [extraTransl, setExtraTransl] = useState();
  function addExtraTrasnl(event) {
    event.preventDefault();
    setExtraTransl(<ExtraTranslation id={props.id} getData={props.getData} />);
  }
  return (
    <div className="form__word">
      <button
        onClick={(event) => {
          event.preventDefault();
          return props.removeWord(event, props.id);
        }}
        className="material-icons form__button-remove"
      >
        clear
      </button>
      <div className="form__word-data">
        <div className="form__word-input">
          <label className="form__label form__label--new-word">Term</label>
          <input
            type="text"
            name="Term"
            className="form__input form__input--new-word"
            onChange={(event) => props.getData(event.target, props.id)}
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
            onChange={(event) => props.getData(event.target, props.id)}
          />
          <div className="form__buttons-lang">
            <button className="form__btn-lang" onClick={addExtraTrasnl}>
              Add one more language
            </button>
            <button className="form__btn-lang">Choose language</button>
          </div>
        </div>
        {extraTransl}
      </div>
    </div>
  );
}
