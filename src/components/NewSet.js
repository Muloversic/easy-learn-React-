import { React, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NewWord from "./NewWord";
import NewSetInfo from "./NewSetInfo";
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
  const [wordsData, setWordsData] = useState([]);

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

  useEffect(() => {
    setWordsData((prevData) => {
      return {
        ...prevData,
        [nanoid()]: inputData,
      };
    });
  }, [inputData]);

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
          id: id,
        };
      });
    }

    if (target.name === "Determination") {
      setInputData((prevData) => {
        return {
          ...prevData,
          translation: target.value,
          id: id,
        };
      });
    }

    if (target.name === "extraTranslation") {
      setInputData((prevData) => {
        return {
          ...prevData,
          extraTranslation: target.value,
          id: id,
        };
      });
    }

    if (target.name === "setName") {
      setInputData((prevData) => {
        return {
          ...prevData,
          setName: target.value,
          id: id,
        };
      });
    }

    if (target.name === "setInfo") {
      setInputData((prevData) => {
        return {
          ...prevData,
          setInfo: target.value,
          id: id,
        };
      });
    }
  }

  function filterWordsData() {
    const allData = [];
    for (let data in wordsData) {
      allData.push(wordsData[data]);
    }

    const tmpArray = [];
    function itemCheck(item) {
      if (tmpArray.indexOf(item.id) === -1) {
        tmpArray.push(item.id);
        return true;
      }
      return false;
    }

    const data = allData.reverse().filter((item) => item.id !== undefined);
    const dataReady = data.filter((item) => itemCheck(item));
    return dataReady.reverse();
  }

  function createSet(event) {
    event.preventDefault();
    const data = filterWordsData();
    console.log(data);
    const db = getDatabase();
    // set(ref(db, "sets/" + data[0].setName), {
    //  data
    // });
  }
  return (
    <main className="main main-new_set new-set">
      <form className="new-set__form form">
        <NewSetInfo getData={getData} />
        <div className="form__words">
          {newWordElement}
          <button onClick={addWord} className="material-icons form__button-add">
            add_circle_outline
          </button>
          <button
            onClick={createSet}
            className="form__button-create"
          >
            Create new set
          </button>
        </div>
      </form>
    </main>
  );
}
