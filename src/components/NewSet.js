import { React, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NewWord from "./NewWord";
import NewSetInfo from "./NewSetInfo";
import { getDatabase, ref, set } from "firebase/database";
import { Link } from "react-router-dom";

export default function NewSet(props) {
  const [wordsData, setWordsData] = useState([]);
  const [collectionInfo, setCollectionInfo] = useState([]);
  const [newWordElement, setNewWordElement] = useState([
    <NewWord
      key={nanoid()}
      id={nanoid()}
      removeWord={removeWord}
      setWordsData={setWordsData}
    />,
  ]);

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
    try{
      set(ref(db, "sets/" + collectionInfo.setName), {
        description: collectionInfo.setInfo,
        setName: collectionInfo.setName,
        data,
      });
    }
    catch(err){
      console.log(err)
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
            Create new set
            <Link to='/sets' className="form__link"></Link>
          </button>
        </div>
      </form>
    </main>
  );
}
