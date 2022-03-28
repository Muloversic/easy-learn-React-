export default function ExtraTranslation({id, getData}) {
  return (
    <div className="form__word-secondary">
      <label className="form__label form__label--new-word">
        Extra Determination
      </label>
      <input
        type="text"
        name="extraTranslation"
        className="form__input form__input--new-word"
        onChange={(event) => getData(event.target, id)}
      />
      <button className="form__btn-lang">Choose language</button>
    </div>
  );
}
