import { React, useState, useEffect } from "react";
import NewWord from "./NewWord";
export default function NewSet(props) {
  const [NewWordElement, setNewWordElement] = useState();
  function addWord(event) {
    event.preventDefault();
    setNewWordElement((prevElem) => [prevElem, <NewWord />]);
  }

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
            <div className="form__word-data">
              <div className="form__word-input">
                <label className="form__label form__label--new-word">
                  Term
                </label>
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
                  <button className="form__btn-lang">
                    Add one more language
                  </button>
                  <button className="form__btn-lang">Choose language</button>
                </div>
              </div>
            </div>
          </div>
          {NewWordElement}
          <button onClick={addWord} className="material-icons form__button-add">
            add_circle_outline
          </button>
        </div>
      </form>
    </main>
  );
}
