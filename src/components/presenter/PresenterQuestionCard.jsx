import Image from "next/image";
import React, { useContext, useState } from "react";
import PresenterCardLayout from "./PresenterCardLayout";
import Countdown from "react-countdown";
import { PresenterContext } from "@/contextapi/UserContext";

import { useSearchParams } from "next/navigation";
const PresenterQuestionCard = () => {

  const searchParams = useSearchParams();
  const question = searchParams.get("q");
  const [timer, setTimer] = useState(60000);
  const [date, setDate] = useState(Date.now());
  const resetTimer = () => {
    setDate(Date.now());
  };
  const { presenterStep, setPresenterStep } = useContext(PresenterContext);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      setPresenterStep(3);
      return <span>0</span>;
    } else {
      // Render a countdown
      return <span>{seconds}</span>;
    }
  };
  return (
    <PresenterCardLayout imageurl={"/imoje-charecters/Raven-writing.png"}>
      <h4 className="text-[16px] text-center font-bold">
        {question?question:"What is your favorite ice cream?"}
      </h4>
      <p className="text-[10px] text-center">(Answer on your own device!)</p>
      <div className="flex space-x-2">
        <button className="bg-ui-orange w-full mt-1 px-2 py-1 text-[16px] hover:scale-[1.02] text-white font-bold rounded-md">
          <Countdown renderer={renderer} date={date + timer} /> sec
        </button>
        <button
          className="bg-ui-violate w-full mt-1 px-2 py-1 text-[16px] hover:scale-[1.02] text-white font-bold rounded-md"
          onClick={() => setPresenterStep(3)}
        >
          Done
        </button>
      </div>
    </PresenterCardLayout>
  );
};

export default PresenterQuestionCard;
