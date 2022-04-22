import React from "react";
import { useState } from "react";
import './modal.css';
import  { Alert, SetAlert, ShowAlert, SetShowAlert }  from "../AlertValues/alertvalues";
function ModalContainer( { children })
{
    const [isOpen, SetIsOpen] = useState(ShowAlert);
    const handleTogle = () => {SetIsOpen(!isOpen); SetShowAlert(!ShowAlert)};

    return(
        children(isOpen, handleTogle)
    )
}

export default ModalContainer;