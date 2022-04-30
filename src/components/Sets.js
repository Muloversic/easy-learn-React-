import { getDatabase, ref, onValue } from "firebase/database";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
export default function Sets({ setCollectionData }) {
    const [data, setData] = useState();
    let navigate = useNavigate();
    const user = localStorage.getItem("User");
    useEffect(() => {
        const db = getDatabase();
        const sets = ref(db, `UsersList/${user}/sets/`);
        onValue(sets, (snapshot) => {
            const dataDb = snapshot.val();
            setData((prevData) => {
                return {
                    ...prevData,
                    dataDb,
                };
            });
        });
    }, []);

    const dataArray = [];
    if (data) {
        for (let set in data.dataDb) {
            dataArray.push(data.dataDb[set]);
        }
    }

    const setElement = dataArray.map((set) => {
        let setProgress = 0;
        set.data.forEach((element) => {
            setProgress += element.progress;
        });

        setProgress = (setProgress / set.data.length).toFixed(2);
        return (
            <div className="sets__item" key={nanoid()}>
                <Link
                    onClick={() => setCollectionData(set)}
                    to="/open-set"
                    className="sets__item-link"
                ></Link>
                <h2 className="sets__item-info">{set.setName}</h2>
                <p className="sets__item-info">{set.description}</p>
                <span className="sets__item-info">
                    Phreases {set.data.length}
                </span>
                <span className="sets__item-info">
                    Set progress {setProgress}%
                </span>
            </div>
        );
    });

    return (
        <main className="main">
            <div className="main__container">
                <div className="sets__sets sets">
                    {dataArray.length === 0 ? (
                        <div className="sets__empty">
                            <p className="sets__suggest">
                                Your don't have any sets. Create one.
                            </p>
                            <button
                                className="sets__button-create"
                                onClick={() => navigate("/new-set")}
                            >
                                Create set
                            </button>
                        </div>
                    ) : (
                        setElement
                    )}
                </div>
            </div>
        </main>
    );
}
