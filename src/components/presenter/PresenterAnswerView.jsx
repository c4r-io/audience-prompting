import Image from "next/image";
import React from "react";

const PresenterPromptView = ({ children, right }) => {
  return (
    <div className="p-3">
      {right ? (
        <div className="flex relative w-[380px]">
          <Image
            className="max-w-[42px] absolute right-[15px] bottom-[0px] z-10"
            src={"/imoje-charecters/c4r-icon.png"}
            width={400}
            height={450}
            alt="Raven Stop"
          />
          <div className="bg-transparent absolute right-[65px] bottom-[27px] triangel-right"></div>
          <div className="bg-transparent text-ui-dark-gray w-[295px] pb-[27px] relative left-[0px] ">
            <div className="bg-white ml-[0px] p-3 rounded-sm">
              <h4 className="font-bold text-center text-[14px]">{children}</h4>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex relative w-[380px]">
          <Image
            className="max-w-[42px] absolute left-[0px] bottom-[0px] z-10"
            src={"/imoje-charecters/c4r-icon.png"}
            width={400}
            height={450}
            alt="Raven Stop"
          />
          <div className="bg-transparent text-ui-dark-gray w-[330px] pb-[27px] relative left-[50px]">
            <div className="bg-transparent absolute left-0 bottom-[27px] triangel-left"></div>
            <div className=" bg-white ml-[20px] p-3 flex flex-col justify-between rounded-sm">
              <h4 className="font-bold text-center text-[14px]">{children}</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PresenterPromptView;
