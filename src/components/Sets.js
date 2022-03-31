import { getDatabase, ref, onValue } from "firebase/database";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
export default function Sets() {
  const db = getDatabase();
  const sets = ref(db, "sets/");
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
      console.log(set);
      return (
        <div className="sets__item" key={nanoid()}>
          <h2 className="sets__item-info">{set.setName}</h2>
          <span className="sets__item-info">Phreases {set.data.length}</span>
          <span className="sets__item-info">hard coded pr</span>
        </div>
      );
    });
  }

  return <main className="sets">{setElement}</main>;
}
