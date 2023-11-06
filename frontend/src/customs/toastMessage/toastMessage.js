import { toast } from 'react-toastify';

const config = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
};

export const getToastSuccess = (message = 'Successfully') => {
    return toast.success(message, config);
};

export const getToastError = (message = 'Successfully') => {
    return toast.error(message, config);
};

export const getToastWarning = (message = 'Successfully') => {
    return toast.warning(message, config);
};
