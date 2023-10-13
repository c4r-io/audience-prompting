"use client";
import React, { useContext } from "react";
import AudienceQuestionCard from "./audience/AudienceQuestionCard";
import AudienceAnswerWriter from "./audience/AudienceAnswerWriter";
import AudienceAnswerView from "./audience/AudienceAnswerView";
import AudienceSubmissionGreet from "./audience/AudienceSubmissionGreet";
import AudienceQuestionEditButton from "./audience/AudienceQuestionEditRequestButton.jsx";
import {
  AudienceAnswerContext,
  AudienceStepsContext,
  UserContext,
} from "@/contextapi/UserContext";

const AudienceView = () => {
  const { audienceSteps, setAudienceSteps } = useContext(AudienceStepsContext);
  const { audienceAnswer, setAudienceAnswer } = useContext(
    AudienceAnswerContext
  );
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
          <AudienceAnswerView right>
            {audienceAnswer}
          </AudienceAnswerView>
          <AudienceQuestionEditButton />
        </div>
      )}

    </div>
  );
};

export default AudienceView;
