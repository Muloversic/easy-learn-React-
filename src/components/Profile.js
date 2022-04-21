import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
export default function Profile() {
  const [stats, setStats] = useState({
    words: 0,
    learnedWords: 0,
    sets: 0,
    setsProgress: 0,
  });
  useEffect(() => {
    const user = localStorage.getItem("User");
    const db = getDatabase();
    const sets = ref(db, `UsersList/${user}/sets/`);
    onValue(sets, (snapshot) => {
      const dataDb = snapshot.val();
      let words = 0;
      let learnedWords = 0;
      let allWordsProgress = 0;
      let setsAmount = 0;
      for (let sets in dataDb) {
        const set = dataDb[sets].data;
        words += set.length;
        setsAmount += 1;
        for (let setData in set) {
          allWordsProgress += set[setData].progress;
          if (set[setData].progress === 100) {
            learnedWords += 1;
          }
        }
      }
      allWordsProgress = (allWordsProgress / words).toFixed(2);
      setStats({
        words: words,
        learnedWords: learnedWords,
        sets: setsAmount,
        setsProgress: allWordsProgress,
      });
      return () => null;
    });
  }, []);

  return (
    <main className="main">
      <div className="main__profile profile">
        <div className="profile__user">
          {window.localStorage.getItem("UserPhoto") !== "" &&
          window.localStorage.getItem("UserPhoto") !== "undefined" ? (
            <img
              className="settings__preview-photo"
              src={window.localStorage.getItem("UserPhoto")}
              alt="user"
            />
          ) : (
            <i className="material-icons settings__preview-photo settings__preview-photo--default">
              person_outline
            </i>
          )}
          <p className="profile__user-name">
            {window.localStorage.getItem("User") || "GoodLearner7"}
          </p>
        </div>
        <div className="profile__statistic">
          <h2 className="profile__statistic-title">Your statistics</h2>
          <ul className="profile__list">
            <li className="profile__list-item">Words in total: {stats.words}</li>
            <li className="profile__list-item">Learned words: {stats.learnedWords}</li>
            <li className="profile__list-item">Amount of sets: {stats.sets}</li>
            <li className="profile__list-item">
              Average percent of sets progress: {stats.setsProgress} %
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
