import { FormSkeleton } from "@/shared/components/loaders-spinners/skeleton";
import dynamic from "next/dynamic";
const ForgotForm = dynamic(() => import("@/app/(public)/auth/(views)/forms/forgot"), {
  ssr: true,
  loading: () => <FormSkeleton />,
});

const page = () => {
  return <ForgotForm />;
};

export default page;
