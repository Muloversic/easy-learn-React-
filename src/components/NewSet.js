import { React, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NewWord from "./NewWord";
import { getDatabase, ref, set } from "firebase/database";

export default function NewSet(props) {
  const [newWordElement, setNewWordElement] = useState([
    <NewWord
      key={nanoid()}
      id={nanoid()}
      removeWord={removeWord}
      getData={getData}
    />,
  ]);
  const [inputData, setInputData] = useState([]);
  function addWord(event) {
    event.preventDefault();
    setNewWordElement((prevState) => [
      ...prevState,
      <NewWord
        key={nanoid()}
        id={nanoid()}
        removeWord={removeWord}
        getData={getData}
      />,
    ]);
  }
  function removeWord(event, id) {
    setNewWordElement((prevState) =>
      prevState.filter((element) => element.props.id !== id)
    );
  }
  function getData(target, id) {
    if (target.name === "Term") {
      setInputData((prevData) => {
        return {
          ...prevData,
          word: target.value,
        };
      });
    }
    if (target.name === "Determination") {
      setInputData((prevData) => {
        return {
          ...prevData,
          translation: target.value,
        };
      });
    }
  }
  console.log(inputData);
  function createSet(setName, id, word, transl, extrTransl) {
    const db = getDatabase();
    set(ref(db, "sets/" + setName), {
      [id]: {
        word: [word],
        translation: [transl],
        extraTranslation: [extrTransl],
      },
    });
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
          {newWordElement}
          <button onClick={addWord} className="material-icons form__button-add">
            add_circle_outline
          </button>
          <button
            onClick={createSet}
            className="material-icons form__button-create"
          >
            Create new set
          </button>
        </div>
      </form>
    </main>
  );
}
