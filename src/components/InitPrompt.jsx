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
  const getUserInfo = () => {
    const userInfo = JSON.parse(localStorage.getItem("ap-au-in"));
    if (userInfo &&
      userInfo.computational_lab &&
      userInfo.carear_stage && 
      userInfo.research &&
      userInfo.lab_role
      
      ) {
      setHasLocalStorageData(true);
      setUserData({
        ...userData,
        userInfo,
        userExists: true,
      });
      if (Object.keys(userInfo).length == 4) {
      }
    }
  };
  useEffect(() => {
    getUserInfo();
  }, [hasLocalStorageData]);

  return (
    <div>
      {/* <div className="w-10">{JSON.stringify(userData)}</div> */}
      {!userData.userExists ? (
        <InitialsQuestionsView />
      ) : (
        <>
          {!userData.userInfo?.role ? (
            <RoleSelectorCard></RoleSelectorCard>
          ) : (
            <>
              {userData.userInfo?.role == "presenter" ? (
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
