"use client";
import Image from "next/image";
import React, { useContext } from "react";
import PresenterQuestionCard from "./presenter/PresenterQuestionCard";
import PresenterTimeUpCard from "./presenter/PresenterTimeUpCard";
import PresenterInitialCard from "./presenter/PresenterInitialCard";
import PresenterPromptEndingTip from "./presenter/PresenterPromptEndingTip";
import PresenterPromptView from "./presenter/PresenterAnswerView";
import PresenterComputationalQ from "./presenter/PresenterComputationalQ.jsx";
import {
  AudienceAnswersContext,
  PresenterContext,
} from "@/contextapi/UserContext";
const PresenterView = () => {
  const { presenterStep, setPresenterStep } = useContext(PresenterContext);
  const { audienceAnswers, setAudienceAnswers } = useContext(
    AudienceAnswersContext
  );
  return (
    <>
      {/* {presenterStep} */}
      {presenterStep == 1 && <PresenterComputationalQ />}
      {presenterStep == 2 && <PresenterInitialCard />}
      {presenterStep == 3 && <PresenterQuestionCard />}
      {presenterStep == 4 && <PresenterTimeUpCard />}

      {audienceAnswers &&
        audienceAnswers.map((audienceAnswer, index) => (
          <>
            <PresenterPromptView right={index % 2 == 0}>
              {audienceAnswer.answer}
            </PresenterPromptView>
          </>
        ))}
      {audienceAnswers && <PresenterPromptEndingTip />}
    </>
  );
};

export default PresenterView;
