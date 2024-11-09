import { FormSkeleton } from "@/shared/components/loaders-spinners/skeleton";
import dynamic from "next/dynamic";
const RegistrationForm = dynamic(() => import("@/app/(public)/auth/(views)/forms/register"), {
  ssr: true,
  loading: () => <FormSkeleton items={4} />,
});

const page = () => {
  return <RegistrationForm />;
};

export default page;
