import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
export default function NewSetInfo({ setCollectionInfo, id }) {
  const [inputData, setInputData] = useState();
  useEffect(() => {
    setCollectionInfo((prevData) => {
      return {
        ...prevData,
        ...inputData,
      };
    });
  }, [inputData]);

  function getData(target, id) {
    if (target.name === "setName") {
      setInputData((prevData) => {
        return {
          ...prevData,
          setName: target.value,
        };
      });
    }

    if (target.name === "setInfo") {
      setInputData((prevData) => {
        return {
          ...prevData,
          setInfo: target.value,
        };
      });
    }
  }
  
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
        className="form__input form__input--info"
        onChange={(event) => getData(event.target)}
      />
      <label htmlFor="setInfo" className="form__label">
        Write any info about set
      </label>
      <input
        type="text"
        placeholder="Info"
        name="setInfo"
        id="setInfo"
        className="form__input form__input--info"
        onChange={(event) => getData(event.target)}
      />
    </>
  );
}
