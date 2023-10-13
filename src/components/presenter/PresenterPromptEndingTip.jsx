import Image from "next/image";
import React, { useState } from "react";
import PresenterCardEndTipLayout from "./PresenterCardEndTipLayout";

const PresenterPromptEndingTip = () => {
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
        Did anyone&apos;s answer surprise you? <br />
        How do your answers differ? Why? <br />
        How do lab practices factor into these answers? <br />
        What about lab culture?
      </p>
    </PresenterCardEndTipLayout>
  );
};

export default PresenterPromptEndingTip;
