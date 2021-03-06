import {
    getStorage,
    ref as ref_storage,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

import {
    getDatabase,
    ref as ref_database,
    onValue,
    set,
} from "firebase/database";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Settings() {
    const [file, setFile] = useState("");
    const [downloadProgress, setDownloadProgress] = useState("");
    const [preview, setPreview] = useState({
        userNickname: window.localStorage.getItem("User") || "GoodLearner7",
        userPhoto: window.localStorage.getItem("UserPhoto") || "",
    });

    useEffect(() => {
        const storage = getStorage();
        const currentUser = localStorage.getItem("User");
        const storageRef = ref_storage(storage, `${currentUser}`);
        if (file !== "") {
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number
                    // of bytes to be uploaded
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setDownloadProgress(
                        "Upload is " + progress.toFixed(2) + "% done"
                    );
                },
                (error) => {
                    switch (error.code) {
                        case "storage/unauthorized":
                            // User doesn't have permission to access the object
                            break;
                        case "storage/unknown":
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                        case "storage/retry-limit-exceeded":
                            // The maximum time limit on an operation (upload, download, delete, etc.)
                            // has been excceded. Try uploading again.
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (userPhotoURL) => {
                            localStorage.setItem("UserPhoto", userPhotoURL);
                            setPreview((userData) => ({
                                ...userData,
                                userPhoto: userPhotoURL,
                            }));
                        }
                    );
                }
            );
        }
    }, [file]);

    useEffect(() => {
        const localStorage = window.localStorage;
        if (preview.userNickname !== "GoodLearner7") {
            localStorage.setItem("User", preview.userNickname);
        }

        const db = getDatabase();
        const users = ref_database(db, `UsersList/`);
        onValue(users, (snapshot) => {
            const data = snapshot.val();
            const currentUser = localStorage.getItem("User");
            for (let userNickname in data) {
                if (userNickname === currentUser) {
                    localStorage.setItem(
                        "UserPhoto",
                        data[userNickname].userPhotoURL
                    );
                    setPreview((userData) => ({
                        ...userData,
                        userPhoto: data[userNickname].userPhotoURL,
                    }));
                }
            }
        });
    }, [preview.userNickname]);

    useEffect(() => {
        // get array of users from db
        const db = getDatabase();
        const localStorage = window.localStorage;
        const users = ref_database(db, `UsersList/`);
        const usersArray = [];
        onValue(users, (snapshot) => {
            const data = snapshot.val();
            for (let userNickname in data) {
                usersArray.push(userNickname);
            }

            const currentUser = localStorage.getItem("User");
            // if user from LS doesn't match with db users - create new user
            if (!usersArray.includes(currentUser)) {
                set(ref_database(db, `/UsersList/${currentUser}`), {
                    sets: "",
                    userPhotoURL: preview.userPhoto,
                });
            }
        });
    }, []);

    function handleFiles(event) {
        setFile(document.querySelector(".settings__input-file").files[0]);
    }

    function handleInput(event) {
        setPreview((userData) => ({
            ...userData,
            userNickname: event.target.value || "GoodLearner7",
        }));
    }

    return (
        <main className="main">
            <div className="main__container">
                <div className="main__settings settings">
                    <div className="settings__user">
                        <h2 className="settings__user-title">
                            Choose profile photo and wirte your nickname
                            <br />
                            <span className="settings__user-info settings__user-info--danger">
                                *all changes are automatically saved
                            </span>
                            <br />
                            <span className="settings__user-info settings__user-info--danger">
                                **WARNING! Editing nickname will create new
                                user, to see previous sets change back your
                                nickname
                            </span>
                        </h2>
                        <div className="settings__preview">
                            <h3 className="settings__preview-title">Preview</h3>
                            <div className="settings__preview-block">
                                {preview.userPhoto ? (
                                    <img
                                        className="settings__preview-photo"
                                        src={preview.userPhoto}
                                        alt="user"
                                    />
                                ) : (
                                    <i className="material-icons settings__preview-photo settings__preview-photo--default">
                                        person_outline
                                    </i>
                                )}
                                <p className="settings__preview-name">
                                    {preview.userNickname}
                                </p>
                            </div>
                        </div>
                        <div className="settings__user-data">
                            <label
                                htmlFor="userName"
                                className="settings__user-name"
                            >
                                Write your nickname here
                            </label>
                            <input
                                type="text"
                                className="settings__input"
                                id="userName"
                                onChange={handleInput}
                            />
                        </div>
                        <div className="settings__input-wrapper">
                            <input
                                name="file"
                                type="file"
                                id="input__file"
                                className="settings__input-file"
                                accept="image/*"
                                onChange={handleFiles}
                            />
                            <label
                                htmlFor="input__file"
                                className="settings__input-button"
                            >
                                <span className="settings__icon-wrapper">
                                    <i className="settings__icon-file Small material-icons">
                                        arrow_downward
                                    </i>
                                </span>
                                <span className="settings__input-text">
                                    Choose file
                                </span>
                            </label>
                        </div>
                        <p className="settings__download-progress">
                            {downloadProgress}
                        </p>
                        <button className="settings__button">
                            Go to sets as you're done here
                            <Link
                                to="/sets"
                                className="settings__button-link"
                            ></Link>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
