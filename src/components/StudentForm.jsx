import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const StudentForm = () => {
  // using useNavigate hook for redirect to other page
  const navigate = useNavigate();
  // states
  const [img, setImg] = useState("");
  const [msg, setMsg] = useState("");
  const [pdf, setPdf] = useState("");
  const [pdfName, setPdfName] = useState("");
  // regex for checking the file extension
  let allowedExtensionsForImg = /(\.png)$/i;
  let allowedExtensionsForPdf = /(\.pdf)$/i;
  // Ref for form input
  const pdfRef = useRef();
  const name = useRef();
  const age = useRef();
  const Qualification = useRef();
  // input box handler
  const handler = () => {
    if (!isNaN(name.current.value)) {
      name.current.value = "";
      setMsg("Name should be string");
    }
    if (isNaN(age.current.value)) {
      age.current.value = "";
      setMsg("Age will be number always");
    }
  };
  // upload image handler
  const UploadImgHandler = (event) => {
    if (allowedExtensionsForImg.test(event.target.value)) {
      let p1 = URL.createObjectURL(event.target.files[0]);
      if (
        event.target.files[0].size / 1024 >= 50 &&
        event.target.files[0].size / 1024 <= 200
      ) {
        setImg(p1);
        setMsg("");
      } else {
        setMsg(
          "Size of image should be less than 200kb and greater then 50 kb"
        );
        setImg("");
        event.target.value = "";
      }
    } else {
      setMsg("image should be in .png formate");
    }
  };
  // Upload Id proof which is pdf handler
  const UploadPdfHandler = (e) => {
    setPdfName(e.target.files[0].name);
    if (allowedExtensionsForPdf.test(e.target.value)) {
      if (
        e.target.files[0].size / 1024 >= 100 &&
        e.target.files[0].size / 1024 <= 500
      ) {
        setPdf(e.target.value);
        setMsg("");
      } else {
        setMsg("Size of pdf should be less than 500kb and greater then 100 kb");
        setImg("");
        e.target.value = "";
      }
    } else {
      setMsg("extension will always .png");
      e.target.value = "";
    }
  };
  // submit button functionality
  const SubmitHandler = () => {
    // Validation for input form
    if (name.current.value === "") {
      setMsg("Please write name");
      name.current.focus();
    } else if (age.current.value === "") {
      setMsg("Please enter age");
      age.current.focus();
    } else if (Qualification.current.value === "") {
      setMsg("Please select qualification");
      Qualification.current.focus();
    } else if (img === "") {
      setMsg("Please upload your image");
    } else if (pdf === "") {
      setMsg("Please upload Your Id proof");
    } else {
      // after validation setting data in local storage
      let obj = {
        name: name.current.value,
        age: age.current.value,
        Qualification: Qualification.current.value,
        img: img,
        pdfName: pdfName,
      };
      localStorage.setItem("StudentData", JSON.stringify(obj));
      // Navigating to other page
      navigate("/Detail");
    }
  };
  //   closing validation msg functonality
  const CloseHandler = () => {
    setMsg("");
  };
  return (
    <>
      <h2 className="heading">Student registration form</h2>
      <div className="form">
        <div className="input-group mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Write your name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            ref={name}
            onChange={handler}
          />
        </div>
        <div className="input-group mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter your age "
            aria-label="Username"
            aria-describedby="basic-addon1"
            ref={age}
            onChange={handler}
          />
        </div>
        <div className="input-group mb-3 mt-3">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Qualification
          </label>
          <select
            className="form-select"
            id="inputGroupSelect01"
            ref={Qualification}
          >
            <option value={""}>Select your qualification</option>
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="Graduation">Graduation</option>
            <option value="Post Graduation">Post Graduation</option>
          </select>
        </div>
        <label>Please upload your image</label>
        <div className="input-group">
          <input
            type="file"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            multiple
            accept=".png"
            onChange={UploadImgHandler}
          />
        </div>
        <label className="mt-3">Please upload Your Id proof</label>
        <div className="input-group ">
          <input
            type="file"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            ref={pdfRef}
            onChange={UploadPdfHandler}
            accept=".pdf"
          />
        </div>
        <button className="btn btn-info w-100 mt-3" onClick={SubmitHandler}>
          Submit
        </button>
        {msg === "" ? (
          ""
        ) : (
          <div
            className="alert alert-warning alert-dismissible fade show mt-4"
            role="alert"
          >
            {msg}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={CloseHandler}
            ></button>
          </div>
        )}
      </div>
    </>
  );
};
