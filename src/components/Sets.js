import { getDatabase, ref, onValue } from "firebase/database";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Sets({ setCollectionData }) {
  const db = getDatabase();
  const sets = ref(
    db,
    `UsersList/${window.localStorage.getItem("User")}/sets/`
  );
  const [data, setData] = useState();
  useEffect(() => {
    onValue(sets, (snapshot) => {
      const data = snapshot.val();
      setData((prevData) => {
        return {
          ...prevData,
          data,
        };
      });
    });
  }, []);

  const dataArray = [];

  if (data) {
    for (let set in data.data) {
      dataArray.push(data.data[set]);
    }

    var setElement = dataArray.map((set) => {
      let setProgress = 0;
      set.data.forEach((element) => {
        setProgress += element.progress;
      });

      setProgress = (setProgress / set.data.length).toFixed(2);

      return (
        <div className="sets__item" key={nanoid()}>
          <Link
            onClick={(event) => editSet(event, set)}
            to="/open-set"
            className="sets__item-link"
          ></Link>
          <h2 className="sets__item-info">{set.setName}</h2>
          <p className="sets__item-info">{set.description}</p>
          <span className="sets__item-info">Phreases {set.data.length}</span>
          <span className="sets__item-info">Set progress {setProgress}%</span>
        </div>
      );
    });
  }

  function editSet(event, set) {
    setCollectionData(set);
  }
  return (
    <>
      <main className="sets">{setElement}</main>
    </>
  );
}
