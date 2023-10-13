import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import PresenterCardLayout from "./PresenterCardLayout";
import {
  PresenterContext,
  TimeUpCodeContext,
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
  const [getResponse, setGetResponse] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const { userData, setUserData } = useContext(UserContext);
  const { presenterStep, setPresenterStep } = useContext(PresenterContext);

  const { timeUpCode, setTimeUpCode } = useContext(TimeUpCodeContext);
  const setCodeHandler = (code) => {
    const userInfo = JSON.parse(localStorage.getItem("ap-au-in"));
    if (userInfo) {
      userInfo.code = code;
      const userInfoUpdated = { ...userData, userInfo };
      setLinkCode(code);
      setUserData(userInfoUpdated);
      localStorage.setItem("ap-au-in", JSON.stringify(userInfo));
    }
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

  const checkPrompt = async () => {
    const userInfo = JSON.parse(localStorage.getItem("ap-au-in"));
    if (userInfo.code) {
      setLoading(true);
      const config = {
        method: "get",
        url: "api/presenter/generate_new_link/" + userInfo.code +"/",
        headers: {
          "content-type": "application/json",
        },
        params: { code: userInfo.code, question },
      };
      try {
        const response = await api.request(config);
        if (!response.data.timeUp) {
          setLinkCode(userInfo.code);
          setIsCopied(true);
          setLoading(false);
        } else {
          setLoading(false);
          // setPresenterStep(3);
          setTimeUpCode(true);
          redirectBackToInsertCode()
        }
        setGetResponse(true);
      } catch (error) {
        console.log(error);
        setGetResponse(true);
        // setPresenterStep(1);
        setTimeUpCode(false);
        setLoading(false);

        redirectBackToInsertCode()
      }
    } else {
      return;
    }
  };
  useEffect(() => {
    if (!linkCode) {
      if (!getResponse) {
        setTimeout(() => {
          checkPrompt();
        }, 1000);
      }
    }
  });
  const createPrompt = async () => {
    setLoading(true);
    const config = {
      method: "post",
      url: "api/presenter/generate_new_link",
      headers: {
        "content-type": "application/json",
      },
      data: {
        question: question ? question : "What is your favorite ice cream?",
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
  const copyToClipboard = () => {
    navigator.clipboard.writeText(linkCode);
    setIsCopied(true);
    toast("Link copied to clipboard");
  };
  const handleStart = () => {
    if (isCopied) {
      setPresenterStep(2);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "First copy the link",
      });
    }
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
