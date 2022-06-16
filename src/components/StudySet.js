import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, update } from 'firebase/database';
import StudySetPresets from './StudySetPresets';
export default function StudySet({ wordsToLearn, studyPresets }) {
  const [inputData, setInputData] = useState([]);
  const [wordsData, setWordsData] = useState([]);
  const [rightAnswersToDisplay, setRightAnswersToDisplay] = useState([]);
  const [isWordsToDb, setIsWordsToDb] = useState(false);
  let [wordOrder, setWordOrder] = useState(0);

  useEffect(() => {
    if (studyPresets === 'OBOm') {
      const buttonNext = document.querySelector('.study__button--next');
      buttonNext.setAttribute('disabled', '');
    }
  }, [wordOrder]);

  function getData(target, id, isExtraTranslation) {
    // write input values to the state
    if (target.name === 'Determination') {
      setInputData((prevData) => {
        return {
          ...prevData,
          translation: target.value,
          extraTranslation: '',
          id: id,
        };
      });
    }

    if (isExtraTranslation) {
      if (target.name === 'extraTranslation') {
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
    // update words data when input was triggered
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
      // removing duplicates
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

  function nextWord(event) {
    // show next word
    event.preventDefault();
    setWordOrder((prevValue) => prevValue + 1);
    // clean old answer hint. Enable submit button, so user can check answer(One by one mode)
    setRightAnswersToDisplay(null);
    const buttonSubmit = document.querySelector('.study__button');
    buttonSubmit.removeAttribute('disabled');
  }

  function checkAnswers(event) {
    // check user answers and create arrays with wrong and right
    event.preventDefault();
    const userAnswers = filterWordsData();
    let rightAnswers = [];
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
            (word) => word.extraTranslation !== userWord.extraTranslation && word.id === userWord.id
          )
        );
      } else {
        if (studyPresets === 'OBOm') {
          rightAnswers.length = 0;
          wrongAnswers.length = 0;
        }

        rightAnswers.push(
          ...wordsToLearn.data.filter((word) => word.translation === userWord.translation && word.id === userWord.id)
        );

        wrongAnswers.push(
          ...wordsToLearn.data.filter((word) => word.translation !== userWord.translation && word.id === userWord.id)
        );
      }
    });

    const inputs = document.querySelectorAll('.study__word-input');
    [...inputs].forEach((input) => {
      if (input.value === '') {
        wrongAnswers.push(
          ...wordsToLearn.data.filter((word) => word.id === input.id || `${word.id}-extr` === input.id)
        );
      }
    });
    // disable button when user click "Submit answers"
    const buttonSubmit = document.querySelector('.study__button--check');
    buttonSubmit.setAttribute('disabled', '');
    if (studyPresets === 'OBOm') {
      //enable 'next button' if mode is 'One by one'
      const buttonNext = document.querySelector('.study__button--next');
      buttonNext.removeAttribute('disabled');
    }

    wrongAnswers = Array.from(new Set(wrongAnswers)); // removing duplicated arrays

    updateResult(rightAnswers, wrongAnswers);
    displayResult(rightAnswers, wrongAnswers);
    setIsWordsToDb((prevValue) => !prevValue); // allow db update
  }

  function displayResult(rightAnswers, wrongAnswers) {
    // looping through arrays, getting inputs and mark them as right or wrong
    rightAnswers.forEach((answer) => {
      const rightInput = document.querySelector(`#${answer.id}`);
      const rightInputExtr = document.querySelector(`#${answer.id}-extr`);
      colorizeInputs(rightInput, rightInputExtr, 'green');
    });

    wrongAnswers.forEach((answer) => {
      const wrongInput = document.querySelector(`#${answer.id}`);
      const wrongInputExtr = document.querySelector(`#${answer.id}-extr`);
      colorizeInputs(wrongInput, wrongInputExtr, 'red');
    });

    function colorizeInputs(input, inputExtr, color) {
      if (input) input.style.borderColor = color;
      if (inputExtr) {
        inputExtr.style.borderColor = color;
      }
    }

    function drawResult() {
      // show right answers to user
      if (wrongAnswers.length > 0) {
        const rightAnswerElement = wrongAnswers.map((answer) => {
          let hint = '';
          let hintExtra = '';
          if (answer.extraTranslation) {
            hint = `Translation - ${answer.translation}`;
            hintExtra = `Extra translation - ${answer.extraTranslation}`;
          } else {
            hint = `Translation - ${answer.translation}`;
          }

          return (
            <div className="study__result" key={answer.id}>
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
          // if all answers were correct
          <span className="study__word-done">You're doing great! Progress changed</span>
        );
      }
    }

    const drawResultElement = drawResult();
    setRightAnswersToDisplay(drawResultElement);
  }

  function updateResult(rightAnswers, wrongAnswers) {
    // updating each word progress
    wordsToLearn.data.forEach((word) => {
      rightAnswers.forEach((rightWord) => {
        if (word.id === rightWord.id) {
          if (word.rightAnswers < 14) {
            word.progress += 5;
            console.log(word);
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
    // update db when user click "Submit answer"
    const db = getDatabase();
    const currentUser = localStorage.getItem('User');
    const updates = {};
    updates[`UsersList/${currentUser}/sets/` + wordsToLearn.setName] = wordsToLearn;
    update(ref(db), updates);
  }, [isWordsToDb]);

  return (
    <main className="main">
      <div className="main__container">
        <div className="main__study study">
          <form className="study__form">
            <div className="study__elements">
              {rightAnswersToDisplay}
              <StudySetPresets
                wordsToLearn={wordsToLearn}
                wordOrder={wordOrder}
                getData={getData}
                studyPresets={studyPresets}
                checkAnswers={checkAnswers}
                nextWord={nextWord}
              />
              <Link to="/open-set" className="study__link">
                Go back to set
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
