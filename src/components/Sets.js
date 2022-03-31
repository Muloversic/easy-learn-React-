import { getDatabase, ref, onValue } from "firebase/database";
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

  console.log(data);
  return <div className="sets"></div>;
}
