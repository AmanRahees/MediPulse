import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleInfo,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

export const ApprovedIcon = () => {
  return (
    <FontAwesomeIcon
      icon={faCircleCheck}
      className="mx-1 text-green-400"
      size="sm"
    />
  );
};

export const ErrorInfo = () => {
  return <FontAwesomeIcon icon={faCircleInfo} className="text-red-600" />;
};
export const LoadSpinner = () => {
  return <FontAwesomeIcon icon={faSpinner} className="animate-spin" />;
};
