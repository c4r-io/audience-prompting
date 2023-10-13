"use client";
import React, { useContext } from "react";
import AudienceQuestionCard from "./audience/AudienceQuestionCard";
import AudienceAnswerWriter from "./audience/AudienceAnswerWriter";
import AudienceAnswerView from "./audience/AudienceAnswerView";
import AudienceSubmissionGreet from "./audience/AudienceSubmissionGreet";
import AudienceQuestionEditButton from "./audience/AudienceQuestionEditRequestButton.jsx";
import {
  AudienceAnswerContext,
  AudienceAnswersContext,
  AudienceStepsContext,
  PresenterContext,
  TimeUpCodeContext,
  UserContext,
} from "@/contextapi/UserContext";

const AudienceView = () => {
  const { audienceSteps, setAudienceSteps } = useContext(AudienceStepsContext);
  const { audienceAnswer, setAudienceAnswer } = useContext(
    AudienceAnswerContext
  );

  const { timeUpCode, setTimeUpCode } = useContext(TimeUpCodeContext);
  const { presenterStep, setPresenterStep } = useContext(PresenterContext);
  const { userData, setUserData } = useContext(UserContext);
  const { audienceAnswers, setAudienceAnswers } = useContext(
    AudienceAnswersContext
  );
  const clearSession = () => {
    setAudienceAnswers(null)
    setTimeUpCode(false);
    redirectBackToInsertCode()
  };
  const redirectBackToInsertCode = () => {
    const userInfo = JSON.parse(localStorage.getItem("ap-au-in"));
    if (userInfo) {
      delete userInfo.code;
      delete userInfo.role;
      const userInfoUpdated = { ...userData, userInfo };

      setUserData(userInfoUpdated);
      localStorage.setItem("ap-au-in", JSON.stringify(userInfo));
    }
  };
  return (
    <div>
      {audienceSteps == 1 && (
        <div>
          <AudienceQuestionCard />
          <AudienceAnswerWriter />
        </div>
      )}
      {audienceSteps == 2 && (
        <div>
          <AudienceSubmissionGreet />
          <AudienceAnswerView right>{audienceAnswer}</AudienceAnswerView>
          <AudienceQuestionEditButton />
        </div>
      )}
      <div className="w-full text-center mt-5">
        <button
          className="text-white bg-ui-orange px-3 py-1 rounded-md hover:scale-[1.02]"
          onClick={() => clearSession()}
        >
          Clear session
        </button>
      </div>
    </div>
  );
};

export default AudienceView;
