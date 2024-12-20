"use client";
import React, { useTransition } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Glassmorphism from "@/shared/components/glassmorphism";
import { AppIcon } from "@/shared/layouts/app-logo";
import SocialIcons from "@/shared/components/social-share";
import toast from "@/shared/components/toast";
import { signInWithGoogle } from "@/shared/firebase/config";

const LoginPage = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleLogin = async () => {
    toast.dismiss();
    debugger;
    try {
      const resp: any = await signInWithGoogle();
      const token = resp.user.accessToken;
      if (token) {
        setCookie("access_token", token, {
          maxAge: 60 * 60 * 24
        });
        toast.success("Successfully Login");
        router.replace("/");
      }
    } catch (error: any) {
      console.log({ error });
      // toast.error(error);
    }
  };
  return (
    <Glassmorphism className="w-[90%] md:w-[50%] flex justify-center items-center flex-col gap-4">
      <AppIcon />
      <button
        className={`rounded-full p-3 min-w-48 min-h-8 bg-white text-black border hover:border-primary-500 hover:text-primary-500 flex justify-center items-center gap-2 ${
          isPending
            ? "!bg-[#8D8D8D] !border-none !cursor-progress !text-[#000000]"
            : ""
        }`}
        onClick={() => startTransition(handleLogin)}
        disabled={isPending}
      >
        {isPending ? (
          <svg
            aria-hidden="true"
            className={`w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary-600 shrink-0 ${
              isPending ? "block" : "hideen"
            }`}
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        ) : (
          <>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="shrink-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.64 9.20456C17.64 8.56637 17.5827 7.95274 17.4764 7.36365H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8196H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20456Z"
                fill={isPending ? "#8D8D8" : "#4285F4"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8373 3.96409 10.71H0.957272V13.0418C2.43818 15.9832 5.48182 18 9 18Z"
                fill={isPending ? "#8D8D8" : "#34A853"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.96409 10.71C3.78409 10.17 3.68182 9.59319 3.68182 9.00001C3.68182 8.40683 3.78409 7.83001 3.96409 7.29001V4.95819H0.957273C0.347727 6.17319 0 7.54774 0 9.00001C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z"
                fill={isPending ? "#8D8D8" : "#FBBC05"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957272 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
                fill={isPending ? "#8D8D8" : "#EA4335"}
              />
            </svg>
            <span className="font-bold">Sign in with Google</span>
          </>
        )}
      </button>
      <small className="font-bold text-wrap">Login before you continue.</small>
      <SocialIcons />
    </Glassmorphism>
  );
};

export default LoginPage;
