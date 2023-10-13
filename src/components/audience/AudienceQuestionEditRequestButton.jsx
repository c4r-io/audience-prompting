import React, { useContext } from "react";
import Image from "next/image";
import { AudienceStepsContext } from "@/contextapi/UserContext";

const AudienceQuestionEditRequestButton = () => {
  const { audienceSteps, setAudienceSteps } = useContext(AudienceStepsContext);

  return (
    <div className="relative p-3 pb-[35px] overflow-hidden">
      <div className="relative p-2">
        <div className="bg-white absolute top-0 right-0 w-[90%] h-full z-0 rounded-sm"></div>
        <div className="flex relative">
          <div className="w-[80px] relative">
            <Image
              className="max-w-[139px] absolute left-[-43px] top-[-39px]"
              src="/imoje-charecters/Raven-investigating.png"
              width={400}
              height={450}
              alt="Raven Stop"
            />
          </div>
          <button
            className="bg-ui-violate px-3 py-5 hover:scale-[1.02] rounded-md text-xl font-bold w-full"
            type="button"
            onClick={()=>setAudienceSteps(1)}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudienceQuestionEditRequestButton;
