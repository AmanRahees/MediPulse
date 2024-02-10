/* eslint-disable no-unused-vars */
import { useState } from "react";
import Layout from "@/components/frontend/Layout/Layout";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";

function Setup() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7];
  const handleStepCompletion = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      console.log(currentStep);
    }
  };
  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      console.error("Cannot go back from the first step.");
    }
  };
  const StepComponent = steps[currentStep - 1];
  return (
    <Layout>
      <div className="grid place-items-center min-h-screen">
        <StepComponent
          onComplete={handleStepCompletion}
          onBack={handleStepBack}
        />
      </div>
    </Layout>
  );
}

export default Setup;
