import React, { useState } from "react";
import TextEditor from "../texteditor/textEditor";
import Questions from "../question/questions";
import axios from "axios";
import "./interview.css"
import { useEffect } from "react"
import Video from "../videocall/video"
import PrimarySearchAppBar from "./appbar";
import { useLocation } from "react-router-dom";
import headers from "../config.js"
require('dotenv').config()


export default function InterviewPage() {
  const location = useLocation()
  const { constraints } = location.state
  const [questionid, setquestionid] = useState();
  const [questions, setquestions] = useState();
  const header = headers(); 
  useEffect(() => {
      if(header !== undefined) {
      const url = 'http://localhost:3001' + "/question/get";
       axios.get(
          url, header)
        .then((res) => {
          setquestions(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
      } 

    if (questions && questions.length > 0) {
      for (let i = 0; i < questions.length; i++) {
        setquestionid((pre) => [...pre, questions["id"]]);
      }
    }
  }, []);

  useEffect(() => {
  }, [questions])

  return (
    <div className="container">
      <div className="TextArea ">
        <TextEditor />
      </div>
      <div className="buttons">
        <PrimarySearchAppBar />
      </div>
      <div className="Video-Call"> </div>
      <div className="Questions"><Questions questions={questions} /></div>
      <div className="VideoCall "><Video constraints={constraints} /></div>
      <div className="messages">
        {/* <div className="Final-Messages ">
          <ChatRoom />
        </div> */}
      </div>
    </div>
  );
}



