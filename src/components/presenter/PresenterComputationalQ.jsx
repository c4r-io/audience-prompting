import React, { useContext, useState } from "react";
import Checkbox from "../initials/Checkbox";
import { PresenterContext } from "@/contextapi/UserContext";

const PresenterComputationalQ = () => {
  const { presenterStep, setPresenterStep } = useContext(PresenterContext);
  const [computationalLab, setComputationalLab] = useState(false);
  const computationalLabHandler = (e) => {
    setComputationalLab(e);
    const userInfo = JSON.parse(localStorage.getItem("ap-au-in"))
    userInfo.computational_lab= e;
    localStorage.setItem("ap-au-in", JSON.stringify(userInfo));
  };
  const handleNext =()=>{
    setPresenterStep(2)
}
  return (
    <div className="flex justify-center w-full">
      <div className="min-w-[270px]">
        <div className="flex justify-center">
          <Checkbox handleChecked={computationalLabHandler}>
            Computational Lab
          </Checkbox>
        </div>

        <div className="w-full flex justify-center mt-10">
          <button
            className="bg-ui-gray-2 hover:bg-ui-gray-1  hover:scale-[1.02] min-w-[100px] px-2 py-1 rounded-md text-black"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresenterComputationalQ;
