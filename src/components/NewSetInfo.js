export default function NewSetInfo(props) {
  return (
    <>
      <label htmlFor="setName" className="form__label">
        Give a name to your set
      </label>
      <input
        type="text"
        placeholder="Name of set"
        name="setName"
        id="setName"
        className="form__input"
        onChange={(event)=> props.getData(event.target)}
      />
      <label htmlFor="setInfo" className="form__label">
        Write any info about set
      </label>
      <input
        type="text"
        placeholder="Info"
        name="setInfo"
        id="setInfo"
        className="form__input"
        onChange={(event)=> props.getData(event.target)}
      />
    </>
  );
}
