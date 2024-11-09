// eslint-disable-next-line
//const contactRegex: any = "^[+]{1}(?:[0-9-() /.]s?){6,15}[0-9]{1}$";
const emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const contactRegex= /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/

const StringError = "Must be a string";
const NumberError = "Must be a valid number";


export {
    NumberError,
    StringError,
    contactRegex,emailRegex,
    passwordRegex,
}