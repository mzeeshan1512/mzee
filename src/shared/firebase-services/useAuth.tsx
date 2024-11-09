"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  applyActionCode,
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import emailjs from "emailjs-com";
//utils
import { CollectionIDs } from "@/shared/constants/collection-ids";
import { authProtect, authRoutes, cookiesName } from "@/routes";
import { showError, showSuccess } from "@/shared/utils/toast";
import { getHtmlStringFromObject, getUserLogOut } from "@/shared/utils/common";
import { auth, fireStore } from "@/shared/config/firebase";
import { chatLogo } from "@/shared/config";
import { AuthContext } from "../context";
import { delete_Doc } from "./useCollections";

const useAuth = () => {
  const navigate = useRouter();
  const { setUser: SaveUser, user: User } = useContext(AuthContext);
  const [isProcessing, setProcessing] = useState<boolean>(false);
  // 2fa verification
  const verify2FA = async (payload: any) => {
    try {
      const documents: any = [];
      const q = query(
        collection(fireStore, CollectionIDs._2fa),
        where("Email", "==", payload?.Email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      return documents;
    } catch (error) {
      showError(error);
      return false;
    }
  };
  // create3FA
  const create2FA = async (payload: any) => {
    try {
      const result = await verify2FA(payload);
      let isVerified = result?.length > 0 ? result[0] : false;
      if (isVerified) {
        await delete_Doc({
          collectionType: CollectionIDs._2fa,
          id: isVerified?.id || "1",
        });
      }
      const serviceId: any = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID;
      const emailTemplate: any =
        process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_WEB_VISIT;
      const publicKey: any = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY;
      const auth2FACode: any = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      await addDoc(collection(fireStore, CollectionIDs._2fa), {
        ...payload,
        auth2FACode: auth2FACode,
      });
      await emailjs.send(
        serviceId,
        emailTemplate,
        {
          message: getHtmlStringFromObject(payload),
          text:
            "We have detected a login attempt from your account. Please enter the following code to verify your identity: " +
            auth2FACode,
          subject: "2FA Verification (mzee.vercel.app)",
        },
        publicKey
      );
      showSuccess("Verification Token sent Successfully");
    } catch (error) {
      showError(error);
    }
  };
  // register
  const registerUser = async (
    payload: RegisterUser,
    reset: (e?: any) => void = () => {}
  ) => {
    setProcessing(true);
    const { first_name, last_name, email, contact_no, dob, password, role } =
      payload;
    try {
      const response: any = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (response?.user?.uid) {
        await updateProfile(response.user, {
          displayName: `${first_name} ${last_name}`,
          photoURL: process.env.NEXT_PUBLIC_APP_CHAT_LOGO || chatLogo?.src,
        });
        const userDocRef = doc(fireStore, "users", response?.user?.uid);
        await setDoc(userDocRef, {
          first_name,
          last_name,
          email,
          contact_no,
          dob: dob ? dob! : null,
          role: role ? "admin" : "user",
          profile_pic: process.env.NEXT_PUBLIC_APP_CHAT_LOGO,
          userId: response?.user?.uid,
        });
        await sendEmailVerification(response?.user);
        showSuccess("User Created Successfully, Verify your email");
        SaveUser(response?.user);
        setCookie("accessToken", response?.user?.accessToken, {
          maxAge: 60 * 60 * 24,
        });
        sessionStorage.setItem("user", JSON.stringify(response?.user));
        setCookie("emailVerified", response?.user?.emailVerified, {
          maxAge: 60 * 60 * 24,
        });
        reset({});
        navigate.push(authProtect.verifyEmail);
      } else throw new Error("Something went wrong while creating a user");
    } catch (error: any) {
      showError(error);
    } finally {
      setProcessing(false);
    }
  };
  // login
  const loginUser = async (
    payload: LoginUser,
    setUser: (e?: any) => void = () => {},
    toggle: (e?: any) => void = () => {}
  ) => {
    setProcessing(true);
    const { email, password } = payload;
    try {
      const response: any = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (response?.user) {
        setUser(response?.user);
        await create2FA({
          Email: payload?.email,
          Date: new Date()?.toDateString(),
        });
        toggle(true);
      } else throw Error("User not found");
    } catch (errors: any) {
      showError(errors);
      toggle(false);
    } finally {
      setProcessing(false);
    }
  };
  // resend email link
  const resendEmailLink = async (user: any = User) => {
    setProcessing(true);
    try {
      await sendEmailVerification(user);
      showSuccess("Verification Email send successfully");
    } catch (errors: any) {
      if (Object?.keys?.(user)?.length < 1) {
        showError("User not found");
      } else showError(errors);
    } finally {
      setProcessing(false);
    }
  };
  // forgot
  const forgotPassword = async (email: string) => {
    setProcessing(true);
    try {
      await sendPasswordResetEmail(auth, email);
      navigate.push("/auth/login");
    } catch (errors: any) {
      showError(errors?.message);
    } finally {
      setProcessing(false);
    }
  };
  // save user
  const saveCookie = async (obj?: { [key: string]: any }) => {
    try {
      setProcessing(true);
      const accessToken = obj
        ? obj.accessToken
        : getCookie(cookiesName?.accessToken);
      if (accessToken) {
        const userInfo = jwtDecode(accessToken);

        if (userInfo && Object.keys(userInfo)?.length > 1) {
          SaveUser({ ...userInfo });
          setCookie(cookiesName?.accessToken, accessToken, {
            maxAge: 60 * 60 * 24, // 1 day
          });
          const path: any = getCookie(cookiesName.redirect);
          let redirectUrl: any = "/";
          //console.log({path})
          //debugger
          if (path && !["", " ", "undefined", "null"]?.includes(path!)) {
            redirectUrl = path;
          }
         /*  navigate.replace("/"); */
         typeof window!=="undefined" && window.location?.replace(redirectUrl)
        }
      }
    } catch (error) {
      console.error("Error decoding JWT:", error);
    } finally {
      setProcessing(false);
    }
  };
  // verify email
  const verifyEmail = async (emailVerificationCode: string) => {
    setProcessing(true);
    try {
      const isVerified = await applyActionCode(auth, emailVerificationCode);
      if (isVerified!) {
        navigate.push(authRoutes.login);
      }
    } catch (error) {
      showError(error);
      navigate.push(authProtect.verifyEmail);
    } finally {
      setProcessing(false);
    }
  };
  // reset-password
  const resetPassword = async (passwordResetCode: string, password: string) => {
    setProcessing(true);
    try {
      const isVerified = await verifyPasswordResetCode(auth, passwordResetCode);
      if (isVerified) {
        await confirmPasswordReset(auth, passwordResetCode, password);
        showSuccess("Password Reset Successfully");
        navigate.push(authRoutes.login);
      } else throw new Error("Invalid Reset Code");
    } catch (error) {
      showError(error);
      navigate.replace(authProtect.verifyEmail);
    } finally {
      setProcessing(false);
    }
  };
  
  // sign-out
  const handleSignOut = async () => {
    try {
      setProcessing(true);
      await signOut(auth);
      await getUserLogOut();
      typeof window!=="undefined" && window.location?.replace("/")
    } catch (error) {
      showError(error)
    }finally{
      setProcessing(false);
    }
  };
  return {
    isProcessing,
    setProcessing,
    verify2FA,
    create2FA,
    registerUser,
    loginUser,
    resendEmailLink,
    forgotPassword,
    saveCookie,
    verifyEmail,
    resetPassword,
    handleSignOut,
  };
};

export default useAuth;
