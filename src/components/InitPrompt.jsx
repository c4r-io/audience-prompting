"use client";
import AudienceView from "@/components/AudienceView";
import InitialsQuestionsView from "@/components/InitialsQuestionsView";
import PresenterView from "@/components/PresenterView";
import {
  UserContext,
  AllContextProviders,
} from "@/contextapi/UserContext";
import { useContext, useEffect, useState } from "react";
import RoleSelectorCard from "./RoleSelectorCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

export default function InitPrompt() {
  return (
    <AllContextProviders>
      <AllViews />
      <ToastContainer position="top-center" />
    </AllContextProviders>
  );
}

const AllViews = () => {
  const [hasLocalStorageData, setHasLocalStorageData] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  const guestUid = () => {
    const guestUserId = localStorage.getItem("ap-guest-id");
    if (!guestUserId) {
      const id = uuidv4();
      localStorage.setItem("ap-guest-id", id);
      return id
    }
    return guestUserId
  };

  const getUserInfo = () => {
    const userInfo = JSON.parse(localStorage.getItem("ap-au-in"));
    if (userInfo &&
      userInfo?.lab_role &&
      userInfo.lab_role.length > 0 &&
      userInfo.carear_stage && 
      userInfo.research
      ) {
      setHasLocalStorageData(true);
      setUserData({
        ...userData,
        userInfo,
        userExists: true,
        uid:guestUid()
      });
    }
  };
  useEffect(() => {
    getUserInfo();
  }, [hasLocalStorageData]);

  return (
    <div>
      {/* <div className="w-10">{JSON.stringify(userData)}</div> */}
      {!userData.userExists ? (
        <>
        <div className="text-white mb-2 text-center">Let&apos;s get to know your profession</div>
        <InitialsQuestionsView />
        </>
      ) : (
        <>
          {!userData?.role ? (
            <RoleSelectorCard></RoleSelectorCard>
          ) : (
            <>
              {userData?.role == "presenter" ? (
                <PresenterView />
              ) : (
                <AudienceView />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
