export const userCredentials = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const getUserCredentials = () => {
    return JSON.parse(localStorage.getItem('user'));
}