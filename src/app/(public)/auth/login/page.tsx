import { FormSkeleton } from "@/shared/components/loaders-spinners/skeleton";
import dynamic from "next/dynamic";
const LoginForm = dynamic(() => import("@/app/(public)/auth/(views)/forms/login"), {
  ssr: true,
  loading: () => <FormSkeleton items={4} />,
});

const page = () => {
  return <LoginForm />;
};

export default page;
