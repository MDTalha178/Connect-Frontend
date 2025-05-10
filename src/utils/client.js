import { showToast } from "../component/Toast";
import { getUserCredentials } from "./localStorage";


export const serverCall = async (url, method, data={}, headers = {}, isAuth = false, message={}) => {
    switch (method) {
        case 'POST':
            return await postClient(url, data, headers, isAuth, message);
        case 'GET':
            return await getClient(url, headers, isAuth, message);
        default:
            throw new Error("Method not supported");
    }
};

const postClient = async (url, data, headers = {}, isAuth, message) => {
    try {
        if (isAuth) {
            const user = getUserCredentials();
            headers['Authorization'] = `Bearer ${user?.access_token}`;
        }
    
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            ...headers,
            },
            body: JSON.stringify(data),
        });
    
        const result = await response.json();
        console.log(result);
    
        if (result.status_code === 200) {
            showToast(message?.success || 'Success', 'success');
        } 
        else if (result.status_code === 401 && result?.data?.email) {
            showToast('Unable to verify your credentials. Please try again later.', 'error');
        }
    
        return result;
    } 
    catch (error) {
      console.error('POST request error:', error);
      showToast('Something went wrong. Please try again later.', 'error');
      return { status_code: 500, error: true, message: error.message };
    }
};
  


const getClient = async (url, headers = {}, isAuth = false) => {
    let isToastShow = false;

    try {
        if (isAuth) {
            const user = getUserCredentials();
            headers['Authorization'] = `Bearer ${user?.access_token}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        });

        // Handle unauthorized
        if (response.status === 401 && !isToastShow) {
            isToastShow = true;
            showToast('Credentials are expired! Please login again..', 'error');
        }

        let result = {};
        try {
            result = await response.json();
        } catch (jsonErr) {
            if (!isToastShow) {
                showToast('Server is responding correctly. Please try after some time.', 'error');
                isToastShow = true;
            }
        }

        if (result.status_code === 500 && !isToastShow) {
            isToastShow = true;
            showToast(result.message || 'Something went wrong', 'error');
        }

        return {
            status_code: response.status,
            ...result,
            isToastShow: isToastShow
        };

    } catch (error) {
        // Catch network or fetch errors
        if(!isToastShow){
            showToast('Failed to connect to server. Please try again later.', 'error');
        }
        
        isToastShow = true;
        return {
            status_code: 0,
            message: 'Network error',
            data: null,
            isToastShow: isToastShow
        };
    }
};
