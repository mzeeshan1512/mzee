import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { authRoutes } from "@/routes";
import useAuth from "@/shared/firebase-services/useAuth";
import Button from "@/shared/components/button";
import FormInput from "@/shared/components/central-fields-control-unit/input/form-input";
import { resetFormValidation } from "./validations";
import { resetForm } from "./list";

const RestPassword = ({ passwordCode }: { passwordCode: string }) => {
  const { isProcessing, resetPassword } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(resetFormValidation),
    defaultValues: {},
  });
  const onSubmit = async (data: any) => {
    resetPassword(passwordCode, data?.password);
  };
  return (
    <>
      <h4>Forgot Password</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex justify-content-center flex-column gap-3"
        autoComplete="off"
      >
        {resetForm?.map((item, index) => (
          <FormInput
            key={index}
            error={errors}
            control={control}
            type={item?.type}
            name={item?.name}
            placeholder={item?.placeholder}
            label={item.label}
            required={item?.required}
            inputCssClass="border-white"
            formGroupClass="white-shade-placeholder"
            disabled={isProcessing}
          />
        ))}
        <span className="link">
          Remembered Password? <Link href={authRoutes.login}>Log In</Link>
        </span>
        <Button
          className="w-100 button-class"
          type="submit"
          disabled={isProcessing}
          loading={isProcessing}
        >
          Reset Password
        </Button>
      </form>
    </>
  );
};

export default RestPassword;
