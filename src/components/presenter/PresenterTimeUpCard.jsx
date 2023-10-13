import Image from "next/image";
import React, { useContext, useState } from "react";
import PresenterCardLayout from "./PresenterCardLayout";
import { AudienceAnswersContext, PresenterContext, TimeUpCodeContext } from "@/contextapi/UserContext";
import api from "@/config/axiosconfig";
import { toast } from "react-toastify";

const PresenterTimeUpCard = () => {
  const [loading, setLoading] = useState(false);
  const [answerShow, setAnswerShow] = useState(false);

  const { audienceAnswers, setAudienceAnswers } = useContext(AudienceAnswersContext);
  const { presenterStep, setPresenterStep } = useContext(PresenterContext);
  const { timeUpCode, setTimeUpCode } = useContext(TimeUpCodeContext);

  const toggleAnswerShow = () => {
    if(answerShow){
      setAnswerShow(false);
      setAudienceAnswers(null)
    }else{
      setAnswerShow(true);
      getAnswers()
    }
  };
  
  const getAnswers = async () => {
    const userInfo = JSON.parse(localStorage.getItem("ap-au-in"));
    setLoading(true);
    const config = {
      method: "get",
      url: "api/audience/answers/"+userInfo.code,
      headers: {
        "content-type": "application/json",
      },
    };
    try {
      const response = await api.request(config);
      setAudienceAnswers(response.data.audienceAnswers)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const updatePrompt = async (timeUp) => {
    const userInfo = JSON.parse(localStorage.getItem("ap-au-in"));
    setLoading(true);
    const config = {
      method: "patch",
      url: "api/presenter/generate_new_link",
      headers: {
        "content-type": "application/json",
      },
      data: {
        timeUp: timeUp,
        code: userInfo.code
      },
    };
    try {
      const response = await api.request(config);
      setCodeHandler(response.data.createdLink.code);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const timeUpHandler =()=>{
    updatePrompt(true)
    setPresenterStep(3)
    toast.warning("Time&apos;s up!");
    setTimeUpCode(true)
  }
  const extendHandler =()=>{
    setTimeUpCode(false)
    updatePrompt(false)
    setAnswerShow(false);
    setAudienceAnswers(null)
    setPresenterStep(2)
    toast.success("Time extended!");
  }
  return (
    <PresenterCardLayout imageurl={"/imoje-charecters/Raven-Stop.png"}>
      <h4 className="text-[16px] text-center font-bold">
        Thanks for participating!
      </h4>
      <div className="flex space-x-2">
        <button
          className="bg-ui-dark-orange w-full mt-1 px-2 py-1 text-[16px] hover:scale-[1.02] text-white font-bold rounded-md"
          onClick={timeUpHandler}
        >
          Time Up!
        </button>
        <button
          className="bg-ui-violate w-full mt-1 px-2 py-1 text-[16px] hover:scale-[1.02] text-white font-bold rounded-md"
          onClick={ extendHandler}
        >
          Extend
        </button>
      </div>
      <button
        className="bg-ui-violate w-full mt-1 px-2 py-1 text-[16px] hover:scale-[1.02] text-white font-bold rounded-md"
        onClick={toggleAnswerShow}
      >
        {answerShow ? "Hide Answers" : "Show Answers"}
      </button>
    </PresenterCardLayout>
  );
};

export default PresenterTimeUpCard;
