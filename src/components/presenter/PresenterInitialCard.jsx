import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import PresenterCardLayout from "./PresenterCardLayout";
import {
  PresenterContext,
  UserContext,
} from "@/contextapi/UserContext";
import api from "@/config/axiosconfig";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";

const PresenterInitialCard = () => {
  const searchParams = useSearchParams();
  const question = searchParams.get("q");
  const [linkCode, setLinkCode] = useState(null);
  const [loading, setLoading] = useState(false);

  const { userData, setUserData } = useContext(UserContext);
  const { presenterStep, setPresenterStep } = useContext(PresenterContext);

  const setCodeHandler = (code) => {
    if (userData) {
      const userInfoUpdated = { ...userData, code:code };
      setLinkCode(code);
      setUserData(userInfoUpdated);
    }
  };
console.log("user data: ", userData);
  const createPrompt = async () => {
    toast.info("Wait a moment while generating link/code")
    setLoading(true);
    const config = {
      method: "post",
      url: "api/presenter/generate_new_link",
      headers: {
        "content-type": "application/json",
      },
      data: {
        question: question ? question : "What is your favorite ice cream?",
        role: userData.role,
        userInfo: userData.userInfo,
        uid: userData.uid,
      },
    };
    try {
      const response = await api.request(config);
      setCodeHandler(response.data.createdLink.code);
      setLoading(false);
      toast.success("Code created successfully. Share the code to audiences.")
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleStart = () => {
    setPresenterStep(4);
  };
  return (
    <PresenterCardLayout imageurl={"/imoje-charecters/Raven-Stop.png"}>
      <h4 className="text-[16px] text-center font-bold">
        Time to hear your thoughts!
      </h4>
      <p className="text-[10px] text-center cursor-pointer">
        Click the button below to generate a link/code your lab mates can use to
        participate in the lesson by offering their own answers.
      </p>
      {!linkCode ? (
        <button
          className="bg-ui-violate w-full mt-1 px-2 py-1 text-[16px] hover:scale-[1.02] text-white font-bold rounded-md"
          onClick={createPrompt}
          disabled={loading ? true : false}
        >
          Generate Link/Code
        </button>
      ) : (
        <div className="flex space-x-2">
          <div
            className="bg-ui-dark-violate text-center cursor-text w-full mt-1 px-2 py-1 text-[16px] text-white font-bold rounded-md"
            
          >
            {linkCode}
          </div>
          <button
            className="bg-ui-violate w-full mt-1 px-2 py-1 text-[16px] hover:scale-[1.02] text-white font-bold rounded-md"
            onClick={handleStart}
          >
            Start
          </button>
        </div>
      )}
    </PresenterCardLayout>
  );
};

export default PresenterInitialCard;
