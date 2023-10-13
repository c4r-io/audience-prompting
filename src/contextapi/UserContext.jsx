import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    userExists: false,
    userInfo: null,
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const PresenterContext = createContext(null);

export const PresenterContextProvider = ({ children }) => {
  const [presenterStep, setPresenterStep] = useState(1);

  return (
    <PresenterContext.Provider value={{ presenterStep, setPresenterStep }}>
      {children}
    </PresenterContext.Provider>
  );
};

export const AudienceAnswersContext = createContext(null);

export const AudienceAnswersContextProvider = ({ children }) => {
  const [audienceAnswers, setAudienceAnswers] = useState(null);

  return (
    <AudienceAnswersContext.Provider
      value={{ audienceAnswers, setAudienceAnswers }}
    >
      {children}
    </AudienceAnswersContext.Provider>
  );
};

export const AudienceStepsContext = createContext(null);

export const AudienceStepsContextProvider = ({ children }) => {
  const [audienceSteps, setAudienceSteps] = useState(1);

  return (
    <AudienceStepsContext.Provider value={{ audienceSteps, setAudienceSteps }}>
      {children}
    </AudienceStepsContext.Provider>
  );
};

export const AudienceAnswerContext = createContext(null);

export const AudienceAnswerContextProvider = ({ children }) => {
  const [audienceAnswer, setAudienceAnswer] = useState(null);

  return (
    <AudienceAnswerContext.Provider
      value={{ audienceAnswer, setAudienceAnswer }}
    >
      {children}
    </AudienceAnswerContext.Provider>
  );
};

export const AudienceQuestionContext = createContext(null);

export const AudienceQuestionContextProvider = ({ children }) => {
  const [audienceQuestion, setAudienceQuestion] = useState(null);

  return (
    <AudienceQuestionContext.Provider
      value={{ audienceQuestion, setAudienceQuestion }}
    >
      {children}
    </AudienceQuestionContext.Provider>
  );
};

export const TimeUpCodeContext = createContext(null);

export const TimeUpCodeContextProvider = ({ children }) => {
  const [timeUpCode, setTimeUpCode] = useState(false);

  return (
    <TimeUpCodeContext.Provider
      value={{ timeUpCode, setTimeUpCode }}
    >
      {children}
    </TimeUpCodeContext.Provider>
  );
};

export const AllContextProviders = ({ children }) => {
  return (
    <UserContextProvider>
      <PresenterContextProvider>
        <AudienceAnswersContextProvider>
          <AudienceStepsContextProvider>
            <AudienceQuestionContextProvider>
            <AudienceAnswerContextProvider>
              <TimeUpCodeContextProvider>
              {children}
              </TimeUpCodeContextProvider>
            </AudienceAnswerContextProvider>
            </AudienceQuestionContextProvider>
          </AudienceStepsContextProvider>
        </AudienceAnswersContextProvider>
      </PresenterContextProvider>
    </UserContextProvider>
  );
};
