import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
export default function StudySet({ wordsToLearn }) {
  const [inputData, setInputData] = useState([]);
  const [wordsData, setWordsData] = useState([]);
  function getData(target, id) {
    if (target.name === "Determination") {
      setInputData((prevData) => {
        return {
          ...prevData,
          translation: target.value,
          id: id,
        };
      });
    }
  }

  useEffect(() => {
    setWordsData((prevData) => {
      return {
        ...prevData,
        [inputData.id]: inputData,
      };
    });
  }, [inputData]);

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

  const wordsElements = wordsToLearn.data.map((word) => {
    return (
      <div className="study__word">
        <label className="study__word-label">{word.word}</label>
        <input
          type="text"
          name="Determination"
          className="study__word-input"
          onChange={(event) => getData(event.target, word.id)}
        />
      </div>
    );
  });



  function checkAnswers(event) {
    event.preventDefault();
    console.log(filterWordsData());
  }

  return (
    <main>
      <form className="study" onSubmit={checkAnswers}>
        <div className="study__elements">{wordsElements}</div>
        <button className="study__button">Submit answers</button>
      </form>
    </main>
  );
}
