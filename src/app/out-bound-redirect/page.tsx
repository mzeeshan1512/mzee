import dynamic from "next/dynamic";
const OutBoundRedirectController = dynamic(
  () => import("@/shared/layouts/out-bound-redirect-controller"),
  { ssr: true }
);

const page = () => {
  return <OutBoundRedirectController />;
};

export default page;
