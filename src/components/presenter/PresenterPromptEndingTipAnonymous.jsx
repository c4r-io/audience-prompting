import Image from "next/image";
import React, { useState } from "react";
import PresenterCardEndTipLayout from "./PresenterCardEndTipLayout";

const PresenterPromptEndingTipAnonymous = () => {
  const [answerShow, setAnswerShow] = useState(false);
  const toggleAnswerShow = () => {
    setAnswerShow(!answerShow);
  };
  return (
    <PresenterCardEndTipLayout imageurl={"/imoje-charecters/Raven-Eureka.png"}>
      <h4 className="text-[16px] text-center font-bold">
        Ask yourselves:
      </h4>
      <p className="text-[10px] text-center">
      Did any of the answers surprise you?<br/>
Why do you think we let you answer anonymously?
      </p>
    </PresenterCardEndTipLayout>
  );
};

export default PresenterPromptEndingTipAnonymous;
