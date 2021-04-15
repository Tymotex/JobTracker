import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Notification } from '../notification';
import api from '../../constants/api';
import Cookie from 'js-cookie';

// Note: Implementing pxFIN's fix: https://github.com/wojtekmaj/react-pdf/issues/321
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ResumeRenderer = ({ file, setFile, resumeBinaryFile, showUploadButton=true, showPages=true }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onFileChange(event) {
        setFile(event.target.files[0]);
    }

    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
        setNumPages(nextNumPages);
    }

    const uploadResume = () => {
        const userId = Cookie.get("user_id");
        if (userId) {
            const formData = new FormData();
            formData.append("user_id", userId);
            formData.append("resume", resumeBinaryFile);
            const postData = {
                method: "post",
                url: `${api.BASE_URL}/api/user/resume`,
                data: formData,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            console.log(postData);
            axios(postData)
            // axios.post(`${api.BASE_URL}/api/user/resume`, formData, {
            //     headers: {
            //       'Content-Type': 'application/json'
            //     }
            // })
                .then((response) => {
                    Notification.spawnSuccess("Saved your resume!")
                })
                .catch((err) => {
                    Notification.spawnError(err);
                })
        } else {
            Notification.spawnRegisterError();
        }
    }

    return (
        <div>
            <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                {
                    Array.from(
                        new Array(numPages),
                        (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                            />
                        ),
                    )
                }
            </Document>
            {showPages && (
                <p>Page {pageNumber} of {numPages}</p>
            )}
            {showUploadButton && (
                <Button variant="outlined" onClick={uploadResume}>Upload Resume</Button>
            )}
        </div>
    );
};

export default ResumeRenderer;
