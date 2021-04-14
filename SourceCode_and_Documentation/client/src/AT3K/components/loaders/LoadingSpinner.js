import Loader from "react-loader-spinner";

// Documentation: https://www.npmjs.com/package/react-loader-spinner
// https://mhnpd.github.io/react-loader-spinner/
const LoadingSpinner = ({ type }) => {
    return (
        <Loader
            type={type}
            color="#00BFFF"
            height={30}
            width={30}
        />
    );
};

LoadingSpinner.defaultProps = {
    type: "Circles"
}

export default LoadingSpinner;
