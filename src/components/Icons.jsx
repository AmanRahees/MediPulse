import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export const ApprovedIcon = () => {
  return (
    <FontAwesomeIcon
      icon={faCircleCheck}
      className="mx-1 text-green-400"
      size="sm"
    />
  );
};
