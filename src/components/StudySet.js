import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, update } from "firebase/database";
export default function StudySet({ wordsToLearn }) {
  const [inputData, setInputData] = useState([]);
  const [wordsData, setWordsData] = useState([]);
  const [rightAnswersToDisplay, setRightAnswersToDisplay] = useState([]);
  const [isWordsToDb, setIsWordsToDb] = useState(false);
  function getData(target, id, isExtraTranslation) {
    if (target.name === "Determination") {
      setInputData((prevData) => {
        return {
          ...prevData,
          translation: target.value,
          extraTranslation: "",
          id: id,
        };
      });
    }

    if (isExtraTranslation) {
      if (target.name === "extraTranslation") {
        setInputData((prevData) => {
          return {
            ...prevData,
            extraTranslation: target.value,
            id: id,
          };
        });
      }
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
    let isExtraTranslation = false;
    if (word.progress !== 100) {
      return (
        <div className="study__word">
          <label className="study__word-label">{word.word}</label>
          <input
            id={word.id}
            type="text"
            name="Determination"
            className="study__word-input"
            onChange={(event) =>
              getData(event.target, word.id, isExtraTranslation)
            }
          />
          {word.extraTranslation && (
            <>
              <label className="study__word-label">Second translation</label>
              <input
                id={word.id + "-extr"}
                type="text"
                name="extraTranslation"
                className="study__word-input"
                onChange={(event) =>
                  getData(event.target, word.id, (isExtraTranslation = true))
                }
              />
            </>
          )}
        </div>
      );
    }
  });

  function checkAnswers(event) {
    event.preventDefault();
    const userAnswers = filterWordsData();
    const rightAnswers = [];
    let wrongAnswers = [];
    userAnswers.forEach((userWord) => {
      if (userWord.extraTranslation) {
        rightAnswers.push(
          ...wordsToLearn.data.filter(
            (word) =>
              word.extraTranslation === userWord.extraTranslation &&
              word.translation === userWord.translation &&
              word.id === userWord.id
          )
        );

        wrongAnswers.push(
          ...wordsToLearn.data.filter(
            (word) =>
              word.extraTranslation !== userWord.extraTranslation &&
              // word.translation !== userWord.translation &&
              word.id === userWord.id
          )
        );
      } else {
        rightAnswers.push(
          ...wordsToLearn.data.filter(
            (word) =>
              word.translation === userWord.translation &&
              word.id === userWord.id
          )
        );

        wrongAnswers.push(
          ...wordsToLearn.data.filter(
            (word) =>
              word.translation !== userWord.translation &&
              word.id === userWord.id
          )
        );
      }
    });

    const inputs = document.querySelectorAll(".study__word-input");
    [...inputs].forEach((input) => {
      if (input.value === "") {
        wrongAnswers.push(
          ...wordsToLearn.data.filter(
            (word) => word.id === input.id || `${word.id}-extr` === input.id
          )
        );
      }
    });

    const buttonSubmit = document.querySelector(".study__button");
    buttonSubmit.setAttribute("disabled", true);

    wrongAnswers = Array.from(new Set(wrongAnswers));
    updateResult(rightAnswers, wrongAnswers);
    displayResult(rightAnswers, wrongAnswers);
    setIsWordsToDb((prevValue) => !prevValue);
  }

  function displayResult(rightAnswers, wrongAnswers) {
    rightAnswers.forEach((answer) => {
      const rightInput = document.querySelector(`#${answer.id}`);
      const rightInputExtr = document.querySelector(`#${answer.id}-extr`);
      colorizeInputs(rightInput, rightInputExtr, "green");
    });

    wrongAnswers.forEach((answer) => {
      const wrongInput = document.querySelector(`#${answer.id}`);
      const wrongInputExtr = document.querySelector(`#${answer.id}-extr`);
      colorizeInputs(wrongInput, wrongInputExtr, "red");
    });

    function colorizeInputs(input, inputExtr, color) {
      input.style.borderColor = color;
      if (inputExtr) {
        inputExtr.style.borderColor = color;
      }
    }

    function drawResult() {
      if (wrongAnswers.length > 0) {
        const rightAnswerElement = wrongAnswers.map((answer) => {
          let hint = "";
          let hintExtra = "";
          if (answer.extraTranslation) {
            hint = `Translation - ${answer.translation}`;
            hintExtra = `Extra translation - ${answer.extraTranslation}`;
          } else {
            hint = `Translation - ${answer.translation}`;
          }

          return (
            <div className="study__result">
              <h4 className="study__word-heading">Right answer for:</h4>
              <span className="study__word-studying"> {answer.word}</span>
              <span className="study__word-hint">{hint}</span>
              <span className="study__word-hint">{hintExtra}</span>
            </div>
          );
        });
        return rightAnswerElement;
      } else {
        return (
          <span className="study__word-done">
            You're doing great, go back to set and repeat! Progress +
          </span>
        );
      }
    }

    const drawResultElement = drawResult();
    setRightAnswersToDisplay(drawResultElement);
  }

  function updateResult(rightAnswers, wrongAnswers) {
    wordsToLearn.data.forEach((word) => {
      rightAnswers.forEach((rightWord) => {
        if (word.id === rightWord.id) {
          if (word.rightAnswers < 14) {
            word.progress += 5;
          } else {
            word.progress += 10;
          }

          word.rightAnswers += 1;
        }
      });

      wrongAnswers.forEach((wrongWord) => {
        if (word.id === wrongWord.id && word.progress > 0) {
          if (word.rightAnswers > 14) {
            word.progress -= 10;
          } else {
            word.progress -= 5;
          }

          word.rightAnswers -= 1;
        }
      });
    });
  }

  useEffect(() => {
    const db = getDatabase();
    const updates = {};
    updates["/sets/" + wordsToLearn.setName] = wordsToLearn;
    update(ref(db), updates);
  }, [isWordsToDb]);

  return (
    <main>
      <form className="study" onSubmit={checkAnswers}>
        <div className="study__elements">
          {wordsElements}
          {rightAnswersToDisplay}
        </div>
        <button className="study__button">Submit answers</button>
        <Link to="/open-set" className="study__link">
          Go back to set
        </Link>
      </form>
    </main>
  );
}
