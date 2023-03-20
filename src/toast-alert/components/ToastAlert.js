import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';

function ToastAlert(){

    const notifier = useSelector(state => state.notifier.alertInfo);

    useEffect(() => {
        if(notifier.showAlert == true){
            toast?.[notifier.type](notifier.message);
        }
    }, [notifier]);

    return (
        <ToastContainer
            position="top-center"
            autoClose={1000}
            limit={1}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    )
}


export default ToastAlert;