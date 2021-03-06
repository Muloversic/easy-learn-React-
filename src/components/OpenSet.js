import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
export default function OpenSet({
    collectionData,
    setWordsToLearn,
    setStudyPresets,
}) {
    const wordsElements = collectionData.data.map((word) => {
        return (
            <div className="info__word" key={nanoid()}>
                <div className="info__word-block">
                    <h3 className="info__word-label">Term {word.progress}%</h3>
                    <h4 className="info__word-input">{word.word}</h4>
                </div>
                <div className="info__word-block">
                    <h3 className="info__word-label">Translation</h3>
                    <h4 className="info__word-input">{word.translation}</h4>
                </div>
                {word.extraTranslation && (
                    <div className="info__word-secondary">
                        <h3 className="info__word-label">Extra Translation</h3>
                        <h4 className="info__word-input">
                            {word.extraTranslation}
                        </h4>
                    </div>
                )}
                {word.progress === 100 ? (
                    <span className="info__word-done">learned</span>
                ) : null}
            </div>
        );
    });

    function handleClick(mode) {
        setWordsToLearn(collectionData);
        setStudyPresets(mode);
    }

    return (
        <main className="main">
            <div className="main__container">
                <div className="main__info info">
                    <div className="info__set-info">
                        <h2 className="info__set-title">
                            {collectionData.setName}
                        </h2>
                        <p className="info__set-description">
                            {collectionData.description}
                        </p>
                        {/* ATm - All together mode*/}
                        <button
                            className="info__set-button"
                            onClick={() => handleClick("ATm")}
                        >
                            <Link to="/learning">
                                Study words (all together mode)
                            </Link>
                        </button>
                        {/* OBOm - One by one mode*/}
                        <button
                            className="info__set-button"
                            onClick={() => handleClick("OBOm")}
                        >
                            <Link to="/learning">
                                Study words (one by one mode)
                            </Link>
                        </button>
                        <div className="info__words">{wordsElements}</div>
                    </div>
                </div>
            </div>
        </main>
    );
}
