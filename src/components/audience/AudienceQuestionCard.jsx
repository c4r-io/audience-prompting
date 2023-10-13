import Image from "next/image";
import React, { useContext, useState } from "react";
import AudienceCardLayout from "./AudienceCardLayout";
import { AudienceQuestionContext } from "@/contextapi/UserContext";

const PresenterTimeUpCard = () => {
  const question = "hello";
  const [answerShow, setAnswerShow] = useState(false);
  const toggleAnswerShow = () => {
    setAnswerShow(!answerShow);
  };
  const { audienceQuestion, setAudienceQuestion } = useContext(
    AudienceQuestionContext
  );
  return (
    <AudienceCardLayout imageurl={"/imoje-charecters/raven-prof.png"}>
      <h4 className="text-3xl leading-[34px] text-center font-bold text-outline-white">
        {audienceQuestion
          ? audienceQuestion
          : "What is your favorite ice cream?"}
      </h4>
    </AudienceCardLayout>
  );
};

export default PresenterTimeUpCard;
