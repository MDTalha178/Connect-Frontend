// toastUtil.js
import { toast } from 'react-toastify';

export const showToast = (message, type = 'success') => {
  toast(message, {
    type: type,
    position: 'top-right',
    autoClose: 3000,
  });
};
