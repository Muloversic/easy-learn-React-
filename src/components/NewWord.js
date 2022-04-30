import { useEffect, useState } from "react";
import ExtraTranslation from "./ExtraTranslation";
import { nanoid } from "nanoid";
export default function NewWord(props) {
    const [extraTransl, setExtraTransl] = useState([]);
    const [isRemoveExrtTranslation, setIsRemoveExtrTranslation] =
        useState(false);
    const [inputData, setInputData] = useState([]);
    useEffect(() => {
        props.setWordsData((prevData) => {
            return {
                ...prevData,
                [nanoid()]: inputData,
            };
        });
    }, [inputData]);

    function addExtraTrasnl(event) {
        event.preventDefault();
        setIsRemoveExtrTranslation(true);
        setExtraTransl(
            <ExtraTranslation
                id={props.id}
                getData={getData}
                removeExtraTrasnl={removeExtraTrasnl}
                isRemoveExrtTranslation={isRemoveExrtTranslation}
            />
        );
    }

    function removeExtraTrasnl(event, id) {
        event.preventDefault();
        setIsRemoveExtrTranslation(false);
        setExtraTransl([]);
        setInputData((prevData) => {
            return {
                ...prevData,
                extraTranslation: "",
                id: id,
            };
        });
    }

    function getData(target, id) {
        if (target.name === "Term") {
            setInputData((prevData) => {
                return {
                    ...prevData,
                    word: target.value,
                    id: id,
                    progress: 0,
                    rightAnswers: 0,
                    extraTranslation: "",
                };
            });
        }

        if (target.name === "Determination") {
            setInputData((prevData) => {
                return {
                    ...prevData,
                    translation: target.value,
                    id: id,
                };
            });
        }

        if (target.name === "extraTranslation") {
            if (isRemoveExrtTranslation) {
                setInputData((prevData) => {
                    return {
                        ...prevData,
                        extraTranslation: "",
                        id: id,
                    };
                });
            } else {
                setInputData((prevData) => {
                    return {
                        ...prevData,
                        extraTranslation: target.value,
                        id: id,
                    };
                });
            }
        }

        if (target.name === "setName") {
            setInputData((prevData) => {
                return {
                    ...prevData,
                    setName: target.value,
                    id: id,
                };
            });
        }

        if (target.name === "setInfo") {
            setInputData((prevData) => {
                return {
                    ...prevData,
                    setInfo: target.value,
                    id: id,
                };
            });
        }
    }

    return (
        <div className="form__word">
            <button
                onClick={(event) => {
                    event.preventDefault();
                    return props.removeWord(event, props.id);
                }}
                className="material-icons form__button-remove"
            >
                clear
            </button>
            <div className="form__word-data">
                <div className="form__word-input">
                    <label className="form__label form__label--new-word">
                        Term
                    </label>
                    <input
                        type="text"
                        name="Term"
                        className="form__input form__input--new-word"
                        onChange={(event) => getData(event.target, props.id)}
                    />
                </div>
                <div className="form__word-input">
                    <label className="form__label form__label--new-word">
                        Determination
                    </label>
                    <input
                        type="text"
                        name="Determination"
                        className="form__input form__input--new-word"
                        onChange={(event) => getData(event.target, props.id)}
                    />
                    <div className="form__buttons-lang">
                        <button
                            className="form__btn-lang"
                            onClick={addExtraTrasnl}
                        >
                            Add one more language
                        </button>
                    </div>
                </div>
                {extraTransl}
            </div>
        </div>
    );
}
