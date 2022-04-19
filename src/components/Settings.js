import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useState, useEffect } from "react";

export default function Settings() {
  const [file, setFile] = useState("");
  const [downloadProgress, setDownloadProgress] = useState("");
  const [preview, setPreview] = useState("");
  useEffect(() => {
    const storage = getStorage();
    const storageRef = ref(storage, "user-photo");
    if (file !== "") {
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number
          // of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setDownloadProgress("Upload is " + progress.toFixed(2) + "% done");
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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setPreview(downloadURL)
            console.log("File available at", downloadURL);
          });
        }
      );
    }
  }, [file]);

  function handleFiles(event) {
    setFile(document.querySelector(".settings__input-file").files[0]);
  }

  return (
    <main className="main">
      <div className="main__settings settings">
        <div className="settings__user">
          <h2 className="settings__user-title">
            Choose profile photo and wirte your name
          </h2>
          <div className="settings__user-data">
            <label htmlFor="userName" className="settings__user-name">
              Write your name here
            </label>
            <input type="text" className="settings__input" id="userName" />
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
            <label htmlFor="input__file" className="settings__input-button">
              <span className="settings__icon-wrapper">
                <i className="settings__icon-file Small material-icons">
                  arrow_downward
                </i>
              </span>
              <span className="settings__input-text">Choose file</span>
            </label>
            <div className="settings__img-preview"></div>
          </div>
          <p>{downloadProgress}</p>
          <img className="profile__user-photo" src={preview} alt="user"/>
        </div>
      </div>
    </main>
  );
}
