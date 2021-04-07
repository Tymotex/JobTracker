import { AwesomeButton } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";

function PrimaryButton({ onClick, children }) {
  return (
    <AwesomeButton 
        onClick={onClick} 
        // cssModule={AwesomeButtonStyles} 
        type="primary"
        ripple
    >
      {children}
    </AwesomeButton>
  );
};

export default PrimaryButton;
