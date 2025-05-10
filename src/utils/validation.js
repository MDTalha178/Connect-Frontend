export const checkEmailValidation = (email) =>{
    if(email === '') return "Email is required";
    const EMAIL_REGEX  = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/;


    if (!EMAIL_REGEX.test(email)) return "Email format is Invalid Format"
    return null;

}

export const checkFisrNameValidation = (firstName) =>{
    if(firstName == '') return 'Fisrt Name is Required'

    return null;
}   

export const lastNameValidation = (firstName) =>{
    if(firstName == '') return 'Fisrt Name is Required'

    if(firstName.length <= 2) return "Length should greater than 2"

    return null;
}

export const PhoneValidation = (phone) => {
    if (phone === '') return "Phone Number is Required";

    const PhoneRegex = /^\+91[6-9]\d{9}$/;
    if (!PhoneRegex.test(phone)) return "Phone Number is Invalid";

    return null;
};
