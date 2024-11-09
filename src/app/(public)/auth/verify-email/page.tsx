import { FormSkeleton } from "@/shared/components/loaders-spinners/skeleton";
import dynamic from "next/dynamic";
const VerifyEmail = dynamic(() => import("@/app/(public)/auth/(views)/action-control/verify-email"), {
  ssr: true,
  loading: () => <FormSkeleton items={4} />,
});

const page = () => {
  return <VerifyEmail />;
};

export default page;
