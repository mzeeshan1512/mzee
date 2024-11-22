"use client";
import Button, { BlendMode } from "@/shared/components/button";
import { useRouter } from "next/navigation";
import FallBackLayout from "@/shared/layouts/fall-back-layout";

const Error = () => {
  const navigate = useRouter();
  return (
    <FallBackLayout message="The page you are looking for, not found">
      <div className="flex justify-center">
        <Button
          className="me-1"
          variant="danger"
          blendMode={BlendMode.GRADIENT}
          onClick={() => navigate.back()}
          style={{ color: "white" }}
        >
          Go Back
        </Button>
        <Button
          className="ms-1"
          variant="primary"
          blendMode={BlendMode.GRADIENT}
          onClick={() => navigate.push("/")}
          style={{ color: "white" }}
        >
          Go Home
        </Button>
      </div>
    </FallBackLayout>
  );
};

export default Error;
