import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faBuilding,
  faCircleCheck,
  faCircleInfo,
  faEnvelope,
  faHouseChimneyMedical,
  faLocationDot,
  faMapLocationDot,
  faMars,
  faMoneyBill1Wave,
  faPhone,
  faSchool,
  faSpinner,
  faStar,
  faStethoscope,
  faVenus,
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
export const RatingStar = () => {
  return <FontAwesomeIcon icon={faStar} />;
};
export const DocSpeciality = () => {
  return <FontAwesomeIcon icon={faStethoscope} />;
};
export const Location = () => {
  return <FontAwesomeIcon icon={faLocationDot} />;
};
export const DocFee = () => {
  return <FontAwesomeIcon icon={faMoneyBill1Wave} />;
};
export const Mail = () => {
  return <FontAwesomeIcon icon={faEnvelope} />;
};
export const Phone = () => {
  return <FontAwesomeIcon icon={faPhone} />;
};
export const Men = () => {
  return <FontAwesomeIcon icon={faMars} />;
};
export const Women = () => {
  return <FontAwesomeIcon icon={faVenus} />;
};
export const Clinic = () => {
  return <FontAwesomeIcon icon={faHouseChimneyMedical} />;
};
export const ClinicAddress = () => {
  return <FontAwesomeIcon icon={faMapLocationDot} />;
};
export const School = () => {
  return <FontAwesomeIcon icon={faSchool} />;
};
export const Company = () => {
  return <FontAwesomeIcon icon={faBuilding} />;
};
export const Award = () => {
  return <FontAwesomeIcon icon={faAward} />;
};
