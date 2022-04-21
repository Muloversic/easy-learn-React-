export default function StudySetPresets({
  wordsToLearn,
  wordOrder,
  getData,
  studyPresets,
  checkAnswers,
  nextWord,
}) {
  // Option 1
  const wordsAllElements = wordsToLearn.data.map((word) => {
    if (word.progress !== 100) {
      return renderWordBody(word);
    }
  });

  const buttonNext = document.querySelector(".study__button--next");
  const buttonSubmit = document.querySelector(".study__button--check");

  // Option 2
  const wordOneByOneElement = wordsToLearn.data.map((word, i, arr) => {
    if (word.progress !== 100 && wordOrder === i) {
      return renderWordBody(word);
      //else it was the last word show <p> and disable buttons
    } else if (wordOrder === arr.length && i === arr.length - 1) {
      buttonNext.setAttribute("disabled", "");
      buttonSubmit.setAttribute("disabled", "");
      return <p className="study__word-done">You're done!</p>;
    }
  });

  function renderWordBody(word) {
    let isExtraTranslation = false;
    return (
      <div className="study__word" key={word.id}>
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

  let elementToDisplay = [];
  let buttonElements = null;
  if (studyPresets === "OBOm") {
    elementToDisplay = wordOneByOneElement;
    buttonElements = (
      <>
        <button
          className="study__button study__button--check"
          onClick={checkAnswers}
        >
          Submit answers
        </button>
        <button
          className="study__button study__button--next"
          onClick={nextWord}
        >
          Next word
        </button>
      </>
    );
  } else if (studyPresets === "ATm") {
    elementToDisplay = wordsAllElements;
    buttonElements = (
      <button
        className="study__button study__button--check"
        onClick={checkAnswers}
      >
        Submit answers
      </button>
    );
  }
  return (
    <>
      {elementToDisplay}
      {buttonElements}
    </>
  );
}
