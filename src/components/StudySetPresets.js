export default function StudySetPresets({ wordsToLearn, wordOrder, getData, studyPresets }) {
  console.log(studyPresets)
  // Option 1
  const wordsAllElements = wordsToLearn.data.map((word) => {
    if (word.progress !== 100) {
      return wordBody(word);
    }
  });

  // Option 2
  const wordOneByOneElement = wordsToLearn.data.map((word, i) => {
    if (word.progress !== 100 && wordOrder === i) {
      return wordBody(word);
    }
  });

  function wordBody(word) {
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
  }

  return <>{wordsAllElements}</>;
}
