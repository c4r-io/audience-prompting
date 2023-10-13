import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import api from "@/config/axiosconfig";
import Sweal from "sweetalert2";
import {
  AudienceAnswerContext,
  AudienceQuestionContext,
  AudienceStepsContext,
  UserContext,
} from "@/contextapi/UserContext";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

const AudienceAnswerWriter = () => {
   
  const searchParams = useSearchParams()
  const question = searchParams.get('q')
  const [loading, setLoading] = useState(false);
  const [getResponse, setGetResponse] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const { audienceSteps, setAudienceSteps } = useContext(AudienceStepsContext);
  const { audienceAnswer, setAudienceAnswer } = useContext(
    AudienceAnswerContext
  );
  const { audienceQuestion, setAudienceQuestion } = useContext(
    AudienceQuestionContext
  );

  const [writenAnswer, setWrittenAnswer] = useState(audienceAnswer);

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

  const checkPrompt = async () => {
    const userInfo = JSON.parse(localStorage.getItem("ap-au-in"));
    if (userInfo.code) {
      setLoading(true);
      const config = {
        method: "get",
        url: "api/audience/check_time_up/" + userInfo.code,
        headers: {
          "content-type": "application/json",
        },
        params: { code: userInfo.code },
      };
      try {
        const response = await api.request(config);
        if (response.data.timeUp) {
          redirectBackToInsertCode()
          setLoading(false);
        }
        setGetResponse(true);
        setAudienceQuestion(response.data.question.question)
      } catch (error) {
        redirectBackToInsertCode()
        console.log(error);
        setGetResponse(true)
        setLoading(false);
      }
    } else {
      toast.warning("Time's Up!");
     
      redirectBackToInsertCode()
      return;
    }
  };
  useEffect(() => {
    if (!getResponse) {
      setTimeout(() => {
        checkPrompt();
      }, 1000);
    }
  });
  const submitAnswer = async () => {
    const userInfo = JSON.parse(localStorage.getItem("ap-au-in"));
    const guestUId = localStorage.getItem("ap-guest-id");
    setLoading(true);
    const config = {
      method: "post",
      url: "api/audience/answer",
      headers: {
        "content-type": "application/json",
      },
      data: {
        question: question ? question:"What is your favorite ice cream?",
        answer: writenAnswer,
        userInfo,
        uid: guestUId,
      },
    };
    try {
      const response = await api.request(config);
      if (response.data?.timeUp) {
        toast.warning("Time's Up! Thank you for your approach.");

        redirectBackToInsertCode()
      } else {
        setAudienceAnswer(writenAnswer);
      }
      setAudienceSteps(2);
      setLoading(false);
    } catch (error) {
      console.log("err", error);
      // if (error.response.data.status === 404) {
      // }
      redirectBackToInsertCode();
      setLoading(false);
    }
  };
  const answerSubmitHandler = () => {
    if (writenAnswer) {
      submitAnswer();
    } else {
      Sweal.fire({
        icon: "error",
        text: "Please write your answer",
      });
    }
  };
  return (
    <div className="relative p-3 pb-[35px] overflow-hidden">
      <div className="bg-white p-2 rounded-md space-y-2">
        <div>
          <textarea
            onInput={(e) => setWrittenAnswer(e.target.value)}
            rows="10"
            value={writenAnswer ?? ""}
            className="block p-1 w-full text-[12px] text-gray-900 bg-ui-light-blue-shade rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Leave a comment..."
          ></textarea>
        </div>
        <div className="flex">
          <button
            className="bg-ui-violate px-3 py-5 hover:scale-[1.02] rounded-md text-xl font-bold w-full"
            type="button"
            onClick={answerSubmitHandler}
          >
            Submit
          </button>
          <div className="w-[120px] relative">
            <Image
              className="max-w-[150px] absolute left-[-10px] top-[-20px]"
              src="/imoje-charecters/raven-coding.png"
              width={400}
              height={450}
              alt="Raven Stop"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudienceAnswerWriter;
