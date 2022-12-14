// React
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
// Component
import BackgroundImage from "../../components/BackgroundImage";
import ProgressBar from "../../components/ProgressBar";
import { stepOne, stepTwo, stepThree, stepFour, stepFive } from "./Steps";
// Style
import style from "./Tutorial.module.css";
import appStyle from "../../App.module.css";
// Icons
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const Tutorial = () => {
  const [step, setStep] = useState(0);
  const [prevBtn, setPrevBtn] = useState("");
  const [nextBtn, setNextBtn] = useState("");
  const allSteps = [stepOne, stepTwo, stepThree, stepFour, stepFive];
  // check and lock buttons
  useEffect(() => {
    step === 0 ? setPrevBtn(style.locked) : setPrevBtn("");
    step >= allSteps.length - 1 ? setNextBtn(style.locked) : setNextBtn("");
  }, [step]);
  // Button handler
  const previousStep = () => {
    step <= 0 ? setStep(0) : setStep(step - 1);
  };
  const nextStep = () => {
    step >= allSteps.length - 1
      ? setStep(allSteps.length - 1)
      : setStep(step + 1);
  };

  return (
    <div className={style.tutorialPage}>
      <ProgressBar />
      <BackgroundImage still={true} />
      <div className={style.tutContainer}>
        <div className={style.tutContent}>{allSteps[step]}</div>
        <div className={style.buttonsDiv}>
          <div className={style.singleButton}>
            <button onClick={previousStep} className={prevBtn}>
              <BsFillArrowLeftCircleFill />
            </button>
          </div>
          <p className={appStyle.body}>
            {step + 1}/{allSteps.length}
          </p>
          <Link className={appStyle.body} to="/feed">
            {step === allSteps.length - 1 ? "Finish tutorial" : "Skip tutorial"}
          </Link>
          <div className={style.singleButton}>
            <button onClick={nextStep} className={nextBtn}>
              <BsFillArrowRightCircleFill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
