"use client";
import { useRouter } from "next/navigation";
import FallBackLayout from "@/shared/layouts/fall-back-layout";

const Error = () => {
  const navigate = useRouter();
  return (
    <FallBackLayout message="The page you are looking for, not found">
      <div className="flex justify-center">
        <button
          className="me-1 text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:outline-none"
          onClick={() => navigate.back()}
          style={{ color: "white" }}
        >
          Go Back
        </button>
        <button
          className="ms-1 text-white bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 hover:bg-gradient-to-br focus:outline-none"
          onClick={() => navigate.push("/")}
          style={{ color: "white" }}
        >
          Go Home
        </button>
      </div>
    </FallBackLayout>
  );
};

export default Error;
