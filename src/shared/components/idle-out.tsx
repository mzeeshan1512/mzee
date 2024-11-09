import React, { useEffect, useState } from "react";
import FallBackLayout from "../layouts/fall-back-layout";
import { deleteCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import { GreetingClock } from "./clock";
import FormInput from "./central-fields-control-unit/input/form-input";
import useAuth from "../firebase-services/useAuth";
import { getUserInfo } from "../utils/common";
import Button from "./button";

const ReAuthForm = () => {
  const {
    isProcessing,
    loginUser,
    setProcessing,
    verify2FA,
    handleSignOut,
  } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [is2FA, toggle] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  }) as any;
  const onSubmit = async (data: any) => {
    const user = getUserInfo();
    if (user) {
      loginUser({ ...data, email: user?.email }, setUser, toggle);
    } else handleSignOut();
  };

  const handle2FALogin = async () => {
    setProcessing(true);
    const is2FAVerified = await verify2FA({ Email: user?.email });
    if (is2FAVerified) {
      deleteCookie("sy1h");
    }
    setProcessing(false)
  };

  const watch2fa = watch("_2FA");

  useEffect(() => {
    if (is2FA && watch2fa?.length === 6) {
      handle2FALogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is2FA, watch2fa]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="d-flex justify-content-center flex-column gap-3"
      autoComplete="off"
    >
      <FormInput
        control={control}
        error={errors}
        type={"password"}
        name={"password"}
        placeholder={"*********"}
        label={"Password"}
        defaultValue={""}
        valid={false}
        inputCssClass="border-white  clr"
        formGroupClass="white-shade-placeholder"
        disabled={isProcessing || is2FA}
      />

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
          valid={false}
          inputCssClass="border-white"
          formGroupClass="white-shade-placeholder"
          autoFocus
        />
      )}

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

const IdleOut = () => {
  return (
    <FallBackLayout customContent>
      <div className="d-flex flex-column gap-3 justify-content-center align-items-center w-full h-full glassomorhpic-effect">
        <div className="d-flex flex-column gap-3 justify-content-center align-items-center w-full">
          <GreetingClock />
          <h3
            style={{
              maxWidth: "50vw",
              whiteSpace: "pre-wrap",
              textAlign: "center",
            }}
          >
            You have been Idle for more than 2 minutes, Please login again
          </h3>
          <ReAuthForm />
        </div>
      </div>
    </FallBackLayout>
  );
};

export default IdleOut;
