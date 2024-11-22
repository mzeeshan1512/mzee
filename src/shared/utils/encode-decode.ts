import CryptoJS from 'crypto-js';

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "0.01.10.34"
const encryptData = (
  data: unknown,
) => {
 return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

const decryptData = (encryptedData:string)=> {
 const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
};

export { decryptData, encryptData };
