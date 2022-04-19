import { React, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NewWord from "./NewWord";
import NewSetInfo from "./NewSetInfo";
import { getDatabase, ref, set } from "firebase/database";
import { Link } from "react-router-dom";

export default function NewSet({ user }) {
  const [wordsData, setWordsData] = useState([]);
  const [collectionInfo, setCollectionInfo] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [newWordElement, setNewWordElement] = useState([
    <NewWord
      key={nanoid()}
      id={nanoid()}
      removeWord={removeWord}
      setWordsData={setWordsData}
    />,
  ]);
  useEffect(() => {
    const errorMessage = document.querySelector(".new-set__error");
    if (isShowAlert) {
      errorMessage.classList.add("new-set__error--fade");
      setTimeout(() => {
        setIsShowAlert(false);
      }, 4000);
    }
  }, [isShowAlert]);

  function addWord(event) {
    event.preventDefault();
    setNewWordElement((prevState) => [
      ...prevState,
      <NewWord
        key={nanoid()}
        id={nanoid()}
        removeWord={removeWord}
        setWordsData={setWordsData}
      />,
    ]);
  }

  function removeWord(event, id) {
    setNewWordElement((prevState) =>
      prevState.filter((element) => element.props.id !== id)
    );
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
    console.log(collectionInfo);
    console.log(data);
    const db = getDatabase();
    const user = window.localStorage.getItem("User");
    try {
      set(ref(db, `UsersList/${user}/sets/${collectionInfo.setName}`), {
        description: collectionInfo.setInfo,
        setName: collectionInfo.setName,
        data,
      });
      setIsSuccess(true);
    } catch (err) {
      setIsShowAlert(true);
    }
  }

  return (
    <main className="main main-new_set new-set">
      <form className="new-set__form form">
        <NewSetInfo setCollectionInfo={setCollectionInfo} />
        <div className="form__words">
          {newWordElement}
          <button onClick={addWord} className="material-icons form__button-add">
            add_circle_outline
          </button>
          <button onClick={createSet} className="form__button-create">
            {isSuccess ? "Go to sets" : "Create new set"}
            {isSuccess && <Link to="/sets" className="form__link"></Link>}
          </button>
        </div>
      </form>
      {isShowAlert && (
        <div className="new-set__error">
          <p className="new-set__error-message">An error occured!</p>
        </div>
      )}
    </main>
  );
}
