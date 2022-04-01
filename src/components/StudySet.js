import { nanoid } from "nanoid";
export default function StudySet({ wordsToLearn }) {
  const wordElement = wordsToLearn.data.map((word) => {
    return (
      <div className="study__word" key={nanoid()}> 
        <label className="study__label">Term: {word.word}</label>
        <input
          type="text"
          name="translation"
          className="study__input"
          placeholder="Translation"
          //   onChange={(event) => getData(event.target, props.id)}
        />
        {word.extraTranslation && <input
          type="text"
          name="extraTranslation"
          className="study__input"
          placeholder="extraTranslation"
          //   onChange={(event) => getData(event.target, props.id)}
        />}
      </div>
    );
  });

  return (
    <main className="study">
      <div className="study__words">{wordElement}</div>
      <button className="study__button">Confirm</button>
    </main>
  );
}
