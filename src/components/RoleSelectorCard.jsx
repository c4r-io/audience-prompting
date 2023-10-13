import { UserContext } from "@/contextapi/UserContext";
import React, { useContext, useState } from "react";

const RoleSelectorCard = () => {
  const [otp, setOtp] = useState(null);
  const { userData, setUserData } = useContext(UserContext);

  const otpHandler = () => {
    console.log("otp added");
    const userInfo = JSON.parse(localStorage.getItem("ap-au-in"));
    if (userInfo) {
      userInfo.code = otp;
      userInfo.role = "audience";
      const userInfoUpdated = { ...userData, userInfo };

      setUserData(userInfoUpdated);
      localStorage.setItem("ap-au-in", JSON.stringify(userInfo));
    }
  };
  const presenterRole = () => {
    const userInfo = JSON.parse(localStorage.getItem("ap-au-in"));
    if (userInfo) {
      userInfo.role = "presenter";
      const userInfoUpdated = { ...userData, userInfo };

      setUserData(userInfoUpdated);
      localStorage.setItem("ap-au-in", JSON.stringify(userInfo));
    }
  };
  return (
    <div className="p-2">
      <div className="w-full bg-white text-black rounded-sm p-3">
        <div>
          <p className="font-medium">
            If you are not a presenter then enter participant code and press
            Enter button
          </p>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-gray-900">
            Participation Code
          </label>
          <input
            type="text"
            onInput={(e) => setOtp(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="flex space-x-2">
          <button
            className="bg-ui-dark-orange  hover:scale-[1.02] w-full mt-1 px-2 py-1 text-[16px] text-white font-bold rounded-md"
            onClick={presenterRole}
          >
            Presenter
          </button>
          <button
            className={`${
              otp ? "bg-ui-violate" : "bg-ui-violate/50"
            } hover:scale-[1.02] w-full mt-1 px-2 py-1 text-[16px] text-white font-bold rounded-md`}
            disabled={otp ? false : true}
            onClick={otpHandler}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectorCard;
