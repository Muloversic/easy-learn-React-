import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
export default function StudySet({ wordsToLearn }) {
  const [inputData, setInputData] = useState([]);
  const [wordsData, setWordsData] = useState([]);
  const [rightAnswersToDisplay, setRightAnswersToDisplay] = useState();
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
          ...wordsToLearn.data.filter((word) => word.id === input.id)
        );
      }
    });

    wrongAnswers = Array.from(new Set(wrongAnswers));
    updateResult(rightAnswers, wrongAnswers);
    displayResult(rightAnswers, wrongAnswers);
  }

  function displayResult(rightAnswers, wrongAnswers) {
    wrongAnswers.forEach((answer) => {
      const wrongInput = document.querySelector(`#${answer.id}`);
      const wrongInputExtr = document.querySelector(`#${answer.id}-extr`);
      colorizeInputs(wrongInput, wrongInputExtr, "red");
    });

    rightAnswers.forEach((answer) => {
      const rightInput = document.querySelector(`#${answer.id}`);
      const rightInputExtr = document.querySelector(`#${answer.id}-extr`);
      colorizeInputs(rightInput, rightInputExtr, "green");
    });

    function colorizeInputs(rightInput, rightInputExtr, color) {
      rightInput.style.borderColor = color;
      if (rightInputExtr) {
        rightInputExtr.style.borderColor = color;
      }
    }

    const rightAnswerElement = wrongAnswers.map((answer) => {
      let hint = "";
      if (answer.extraTranslation) {
        hint = `extra translation ${answer.extraTranslation} translation ${answer.word}`;
      } else {
        hint = `translation ${answer.word}`;
      }

      return (
        <p className="study__result">
          Right answer for{" "}
          <span className="study__word-studying">{answer.word}</span>: {hint}
        </p>
      );
    });

    setRightAnswersToDisplay(rightAnswerElement);
  }

  function updateResult(rightAnswers, wrongAnswers) {
    wordsToLearn.data.forEach((word) => {
      rightAnswers.forEach((rightWord) => {
        if (word.id === rightWord.id) {
          word.progress += 10;
          word.rightAnswers += 1;
        }
      });

      wrongAnswers.forEach((wrongWord) => {
        if (word.id === wrongWord.id && word.progress > 0) {
          word.progress -= 10;
          word.rightAnswers -= 1;
        }
      });
    });

    // console.log(wordsToLearn.data);
  }

  return (
    <main>
      <form className="study" onSubmit={checkAnswers}>
        <div className="study__elements">
          {wordsElements}
          {rightAnswersToDisplay}
        </div>
        <button className="study__button">Submit answers</button>
      </form>
    </main>
  );
}
