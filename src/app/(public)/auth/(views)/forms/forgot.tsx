"use client"
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authRoutes } from "@/routes";
import Button from "@/shared/components/button";
import FormInput from "@/shared/components/central-fields-control-unit/input/form-input";
import { ForgotPasswordFormValidation } from "./validations";
import useAuth from "@/shared/firebase-services/useAuth";

const ForgotForm = () => {
  const { isProcessing, forgotPassword } = useAuth();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(ForgotPasswordFormValidation),
    defaultValues: {},
  });
  const onSubmit = async (data: any) => {
    forgotPassword(data?.Email);
  };
  return (
    <>
      <h4>Forgot Password</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex justify-content-center flex-column gap-3"
        autoComplete="off"
      >
        <FormInput
          error={errors}
          control={control}
          type="text"
          name="Email"
          placeholder="example@example.com"
          required
          label={"Email"}
          defaultValue={""}
          inputCssClass="border-white"
          formGroupClass="white-shade-placeholder"
        />

        <span className="link">
          Remembered Password?{" "}
          <Link href={authRoutes.login}>
            Log In
          </Link>
        </span>

        <Button
          className="w-100 button-class"
          type="submit"
          disabled={isProcessing}
          loading={isProcessing}
        >
          Log In
        </Button>
      </form>
    </>
  );
};

export default ForgotForm;
