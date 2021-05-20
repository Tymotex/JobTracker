import Cookie from "js-cookie";
import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import api from "../../constants/api";

const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
};

const activeStyle = {
    borderColor: "#2196f3",
};

const acceptStyle = {
    borderColor: "#00e676",
};

const rejectStyle = {
    borderColor: "#ff1744",
};

function ResumeDropZone({ setResume, setResumeBinaryFile }) {
    const onDrop = useCallback(
        (acceptedFiles) => {
            // console.log(acceptedFiles);
            acceptedFiles.forEach((file) => {
                const reader = new FileReader();
                setResumeBinaryFile(file);

                reader.onabort = () => console.log("file reading was aborted");
                reader.onerror = () => console.log("file reading has failed");
                reader.onload = () => {
                    const binaryStr = reader.result;
                    setResume(binaryStr);
                };
                reader.readAsArrayBuffer(file);
            });
        },
        [setResumeBinaryFile, setResume]
    );
    // const {getRootProps, getInputProps} = useDropzone({onDrop})

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({ onDrop });

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept]
    );

    const userId = Cookie.get("user_id");
    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps({ style })} />
                {/* <p>Drag and drop some your resume here, or click to select.</p> */}
            </div>
            <div>
                Click{" "}
                <a href={`${api.BASE_URL}/api/user/resume?user_id=${userId}`}>
                    here
                </a>{" "}
                to view resume
            </div>
        </div>
    );
}

export default ResumeDropZone;
