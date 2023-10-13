"use client";
import Image from "next/image";
import React, { useContext } from "react";
import PresenterQuestionCard from "./presenter/PresenterQuestionCard";
import PresenterTimeUpCard from "./presenter/PresenterTimeUpCard";
import PresenterInitialCard from "./presenter/PresenterInitialCard";
import PresenterPromptEndingTip from "./presenter/PresenterPromptEndingTip";
import PresenterPromptView from "./presenter/PresenterAnswerView";
import {
  AudienceAnswersContext,
  PresenterContext,
  TimeUpCodeContext,
  UserContext,
} from "@/contextapi/UserContext";
const PresenterView = () => {
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
    <>
      {/* {presenterStep} */}
      {presenterStep == 1 && <PresenterInitialCard />}
      {presenterStep == 2 && <PresenterQuestionCard />}
      {presenterStep == 3 && <PresenterTimeUpCard />}

      {audienceAnswers &&
        audienceAnswers.map((audienceAnswer, index) => (
          <>
            <PresenterPromptView right={index % 2 == 0}>
              {audienceAnswer.answer}
            </PresenterPromptView>
          </>
        ))}
      {audienceAnswers && <PresenterPromptEndingTip />}
        <div className="w-full text-center mt-5">
          <button
            className="text-white bg-ui-orange px-3 py-1 rounded-md hover:scale-[1.02]"
            onClick={() => clearSession()}
          >
            Clear session
          </button>
        </div>
      {/* {timeUpCode && (
      )} */}
    </>
  );
};

export default PresenterView;
