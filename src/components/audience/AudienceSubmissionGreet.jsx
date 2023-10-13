import React from "react";
import Image from "next/image";
const AudienceSubmissionGreet = () => {
  return (
    <div className="p-3">
      <div className="flex items-center min-h-[110px] bg-white rounded-sm p-2">
        <div className="w-[166px] h-[106px] relative">
          <Image
            className="max-w-[180px] absolute left-[-30px] top-[-40px] scale-x-[-1]"
            src="/imoje-charecters/Raven-ice-cream.png"
            width={400}
            height={450}
            alt="Raven Stop"
          />
        </div>
        <div className="w-full">
          <h5 className="text-xl text-center font-bold text-black">
            Thank you for
            <br />
            Participating!
          </h5>
        </div>
      </div>
    </div>
  );
};

export default AudienceSubmissionGreet;
