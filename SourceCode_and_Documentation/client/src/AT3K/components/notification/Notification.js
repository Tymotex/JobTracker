import React from 'react';
import toast, { Toaster } from 'react-hot-toast';



function delay(t) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, t)
    });
}


const myPromise = delay(2000);

// const spawnNotification = () => toast.promise(myPromise, {
//     loading: 'Loading',
//     success: 'Got the data',
//     error: 'Error when fetching',
// });

// Documentation: https://react-hot-toast.com/docs/toast

class Notification extends React.Component {
    static spawnNotification(promiseObj, loadingMessage, successMessage, errorMessage) {
        toast.promise(promiseObj, {
            loading: loadingMessage,
            success: successMessage,
            error: errorMessage,
        });
    }
    static spawnSuccess(message) {
        toast.success(message);
    }
    static spawnError(err) {
        try {
            if (err) {
                if (err.response && err.response.data) {
                    const message = (err.response.data.message) ? (err.response.data.message) : "Something went horribly wrong!"; 
                    toast.error(message);
                } else {
                    toast.error("No error response was found. The server is offline most likely");
                }
            } else {
                toast.error("Unknown error");
            }
        } catch {
            toast.error("The server is offline most likely");
        }
    }
    static spawnInvalid(message) {
        toast.error(message);
    }
    static spawnRegisterError() {
        toast.error("Please register or log in first!");
    }
}

export default Notification;
