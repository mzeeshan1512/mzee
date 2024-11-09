"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "@/shared/firebase-services/useAuth";
import FormInput from "@/shared/components/central-fields-control-unit/input/form-input";
import Button from "@/shared/components/button";
import { LoginFormValidation } from "./validations";
import { loginForm } from "./list";
import { saveLoginInfo } from "@/shared/firebase-services/useVisit";
import { setCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import { cookiesName } from "@/routes";

const LoginForm = () => {
  const { isProcessing, loginUser, setProcessing, saveCookie, verify2FA } =
    useAuth();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [is2FA, toggle] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginFormValidation(is2FA)),
    defaultValues: {},
  });
  const onSubmit = async (data: any) => {
    loginUser(data, setUser, toggle);
  };

  const handle2FALogin = async () => {
    setProcessing(true);
    const is2FAVerified = await verify2FA({ Email: user?.email });
    if (is2FAVerified) {
      saveCookie(user);
    }
  };

  const watch2fa = watch("_2FA");

  useEffect(() => {
    if (is2FA && watch2fa?.length === 6) {
      handle2FALogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is2FA, watch2fa]);

  useEffect(() => {
    if (searchParams?.get(cookiesName.redirect)) {
      setCookie(
        cookiesName.redirect,
        searchParams?.get(cookiesName.redirect) || ""
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.get(cookiesName.redirect)]);

  useEffect(() => {
    saveLoginInfo("login");
    saveCookie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="d-flex justify-content-center flex-column gap-3"
      autoComplete="off"
    >
      {loginForm?.map((item, index) => (
        <FormInput
          control={control}
          error={errors}
          type={item?.type}
          name={item?.name}
          placeholder={item?.placeholder}
          label={item.label}
          required={item?.required}
          defaultValue={""}
          inputCssClass="border-white  clr"
          formGroupClass="white-shade-placeholder"
          disabled={isProcessing || is2FA}
          key={index}
        />
      ))}

      {is2FA && (
        <FormInput
          error={errors}
          control={control}
          type="text"
          name="_2FA"
          placeholder="000000"
          required
          label={"2FA"}
          defaultValue={""}
          max={6}
          min={6}
          inputCssClass="border-white"
          formGroupClass="white-shade-placeholder"
          autoFocus
          disabled={isProcessing}
        />
      )}
      {/*  <div className="d-flex justify-content-between text-wrapper flex-column flex-lg-row link">
        <span>
          {"Don't Have an Account? "}
          <Link href={authProtect.register}>Register</Link>
        </span>
        <Link href={authProtect.forgotPassword}>Forgot Password?</Link>
      </div> */}

      <Button
        className="w-100 button-class"
        type="submit"
        disabled={isProcessing || is2FA}
        loading={isProcessing}
      >
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
