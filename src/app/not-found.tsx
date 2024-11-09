"use client"
import Button from "@/shared/components/button";
import { useRouter } from "next/navigation";
import FallBackError from "@/shared/layouts/fall-back-layout";

const Error = () => {
  const navigate = useRouter();
  return (
    <FallBackError message="The page you are looking for, not found">
      <div className="d-flex justify-content-center">
        <Button
          className="me-1"
          outline
          variant="success"
          onClick={() => navigate.back()}
          style={{ color: "white" }}
        >
          Go Back
        </Button>
        <Button
          className="ms-1"
          outline
          variant="success"
          onClick={() => navigate.push("/")}
          style={{ color: "white" }}
        >
          Go Home
        </Button>
      </div>
    </FallBackError>
  );
};

export default Error;
