"use client"
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authRoutes } from "@/routes";
import useAuth from "@/shared/firebase-services/useAuth";
import { Row, Col } from "@/shared/components/row-cols";
import FormInput from "@/shared/components/central-fields-control-unit/input/form-input";
import Button from "@/shared/components/button";
import { RegisterFormValidation } from "./validations";
import { registrationForm } from "./list";

const RegistrationForm = () => {
  const { isProcessing, registerUser } = useAuth();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterFormValidation),
    defaultValues: {},
  });
  const onSubmit = (data: RegisterUser) => {
    registerUser(
      { ...data, role: "admin" },
      reset,
    );
  };
  return (
    <form
      className="d-flex flex-column gap-3 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Row
        styles={{
          maxHeight: "350px",
          overflow: "auto",
        }}
      >
        {registrationForm?.map((item, index) => (
          <Col key={index} lg={item?.col || "6"} className="my-1">
            <FormInput
              control={control}
              error={errors}
              type={item?.type}
              name={item?.name}
              placeholder={item?.placeholder}
              label={item.label}
              required={item?.required}
              inputCssClass="border-white"
              formGroupClass="white-shade-placeholder"
              disabled={isProcessing}
            />
          </Col>
        ))}
      </Row>
      <span className="link">
        Already Have an Account? <Link href={authRoutes.login}>Log In</Link>
      </span>
      <Button type="submit" disabled={isProcessing} loading={isProcessing}>
        Sign Up
      </Button>
    </form>
  );
};

export default RegistrationForm;
