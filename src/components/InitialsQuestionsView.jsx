"use client";
import React, { useContext, useEffect, useState } from "react";
import Checkbox from "./initials/Checkbox";
import Selector from "./initials/Selector";
import MultipleSelector from "./initials/MultipleSelector";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "@/contextapi/UserContext";

const InitialsQuestionsView = () => {
  const [formSequence, setFormSequence] = useState(1);
  const [researchData, setResearchData] = useState(null);
  const [carearStageData, setCarearStageData] = useState(null);
  const [computationalLab, setComputationalLab] = useState(false);
  const [labRole, setLabRole] = useState(null);
  const { userData, setUserData } = useContext(UserContext);

  const formLength = Array.from({ length: 4 }, (v, i) => i);
  const handleFormSequence = () => {
    if (formSequence == 1) {
      setFormSequence(formSequence + 1);
    }
    if (formSequence == 2 && researchData) {
      setFormSequence(formSequence + 1);
    }
    if (formSequence == 3 && carearStageData) {
      setFormSequence(formSequence + 1);
    }
    if (formSequence == 4 && labRole?.length !== 0) {
      setFormSequence(formSequence + 1);
    const userInfo = JSON.parse(localStorage.getItem("ap-au-in"));
      const contextUpdatedData = {...userData, userInfo, userExists: true}
      setUserData(contextUpdatedData)
    }
  };
  const computationalLabHandler = (e) => {
    setComputationalLab(e);
    const userInfo = {
      computational_lab: e,
    };
    localStorage.setItem("ap-au-in", JSON.stringify(userInfo));
  };
  const researchFeilds = [
    "Neurobio",
    "Cog Neuro",
    "Neuroimaging",
    "Computational Neuro",
    "Deep Learning",
    "Other",
  ];
  const researchSelectionHandler = (e) => {
    setResearchData(e);
    const userInfo = JSON.parse(localStorage.getItem("ap-au-in"));
    userInfo.research = e;
    localStorage.setItem("ap-au-in", JSON.stringify(userInfo));
  };
  const carearStageFeilds = [
    "Professor",
    "Postdoc",
    "PhD",
    "Masters",
    "Undergraduate",
    "Other",
  ];
  const carearStageHandler = (e) => {
    setCarearStageData(e);
    const userInfo = JSON.parse(localStorage.getItem("ap-au-in"));
    userInfo.carear_stage = e;
    localStorage.setItem("ap-au-in", JSON.stringify(userInfo));
  };
  const labRoleFeilds = [
    "Administrative",
    "Managerial",
    "Wet bench",
    "Computational",
    "Other",
  ];
  const labRoleSelectionHandler = (e) => {
    setLabRole(e);
    const userInfo = JSON.parse(localStorage.getItem("ap-au-in"));
    userInfo.lab_role = e;
    localStorage.setItem("ap-au-in", JSON.stringify(userInfo));
  };
  const generateGuestUId = () => {
    const guestUserId = localStorage.getItem("ap-guest-id");
    if (!guestUserId) {
      const id = uuidv4();
      localStorage.setItem("ap-guest-id", id);
      console.log("creating guest user id", id);
    }
  };
  useEffect(() => {
    generateGuestUId();
  });

  return (
    <div className="flex justify-center w-full">

    <div className="min-w-[270px]">
      <div className="flex justify-center mb-4">
        <div className="flex h-4 space-x-1">
          {formLength.map((e, index) => (
            <div
              key={index}
              className={`w-10 h-2 ${
                formSequence == index + 1 ? " bg-white" : "bg-ui-gray-2"
              }`}
            ></div>
          ))}
        </div>
      </div>
      {formSequence === 1 && (
        <div className="flex justify-center">
          <Checkbox handleChecked={computationalLabHandler}>
            Computational Lab
          </Checkbox>
        </div>
      )}
      {formSequence === 2 && (
        <div className="">
          <Selector
            feilds={researchFeilds}
            handleSelected={researchSelectionHandler}
          >
            Field of Research
          </Selector>
        </div>
      )}
      {formSequence === 3 && (
        <div className="">
          <Selector
            feilds={carearStageFeilds}
            handleSelected={carearStageHandler}
          >
            Career Stage
          </Selector>
        </div>
      )}

      {formSequence === 4 && (
        <div className="">
          <MultipleSelector
            feilds={labRoleFeilds}
            handleSelected={labRoleSelectionHandler}
          >
            Laboratory Role
          </MultipleSelector>
        </div>
      )}
      <div className="w-full flex justify-center mt-10">
        <button
          className="bg-ui-gray-2 hover:bg-ui-gray-1  hover:scale-[1.02] min-w-[100px] px-2 py-1 rounded-md text-black"
          onClick={handleFormSequence}
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default InitialsQuestionsView;
