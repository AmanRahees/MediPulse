import PropTypes from "prop-types";
import { Terminal, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/widgets/ui/alert";

const AlertInfo = ({ type, message, classValues }) => {
  const GetIcon = () => {
    if (type === "warning") {
      return <AlertTriangle className="h-4 w-4" color="#ca8a04" />;
    } else if (type === "info" || type === "warningInfo") {
      return (
        <Info
          className="h-4 w-4"
          color={`${type === "info" ? "#075985" : "#ca8a04"}`}
        />
      );
    } else if (type === "success") {
      return <CheckCircle className="h-4 w-4" color="#32a852" />;
    }
  };
  return (
    <Alert className={classValues}>
      {type ? <GetIcon /> : <Terminal className="h-4 w-4" />}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

AlertInfo.propTypes = {
  type: PropTypes.string,
  message: PropTypes.any.isRequired,
  classValues: PropTypes.string,
};

export default AlertInfo;
