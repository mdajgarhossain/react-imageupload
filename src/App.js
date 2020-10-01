import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase";
import { storage } from "./firebase/firebaseConfig";

function App() {
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState({ imgUrl: "" });

  console.log(imageAsUrl);
  console.log(imageAsFile);
  const handleImageAsFile = (event) => {
    // console.log(event.target.files);
    const image = event.target.files[0];
    // console.log(image);
    setImageAsFile((imageFile) => image);
  };

  const handleFirebaseUpload = (event) => {
    event.preventDefault();
    console.log("start upload");
    if (imageAsFile === "") {
      console.error(`not an image. the image file is a ${typeof imageAsFile}`);
    }
    const uploadTask = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);

    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        console.log(snapShot);
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl((prevObject) => ({
              ...prevObject,
              imgUrl: fireBaseUrl,
            }));
          });
      }
    );
  };

  return (
    <div className="App">
      <form onSubmit={handleFirebaseUpload}>
        <input type="file" onChange={handleImageAsFile} />
        <button>Upload to firebase</button>
      </form>
      <img src={imageAsUrl.imgUrl} alt="image tag" />
    </div>
  );
}

export default App;
