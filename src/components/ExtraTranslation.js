export default function ExtraTranslation({ id, getData, isRemoveExrtTranslation }) { 
  // console.log(isRemoveExrtTranslation)
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

      <div className="form__buttons-lang form__buttons-lang--extra">
        <button className="form__btn-lang">Choose language</button>
        {/* <button
          className="form__btn-lang"
          onClick={(event) => removeExtraTrasnl(event)}
          // onClick={(event) => removeExtraTrasnl(event)}
        >
          Remove translations
        </button> */}
      </div>
    </div>
  );
}
