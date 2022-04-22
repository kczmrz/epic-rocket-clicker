import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toast_theme.css';


toast.configure();
const notify = (message)=> {
    toast.dark(message, { position: toast.POSITION.BOTTOM_LEFT });
}

const green_notify = (message)=> {
    toast.success(message, { position: toast.POSITION.BOTTOM_LEFT });
}

export {notify, green_notify};