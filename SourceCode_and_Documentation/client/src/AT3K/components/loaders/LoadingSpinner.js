import Loader from "react-loader-spinner";

// Documentation: https://www.npmjs.com/package/react-loader-spinner
const LoadingSpinner = ({ type }) => {
    return (
        <Loader
            type={type}
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
        />
    );
};

LoadingSpinner.defaultProps = {
    type: "Circles"
}

export default LoadingSpinner;
