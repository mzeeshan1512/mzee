import Link from "next/link";
import React from "react";
const DownloadResume = () => {
  return (
    <Link
      className="bg-primary-gradient hover:bg-primary-hover-gradient p-3 rounded-lg text-white"
      href={process.env.Next_PUBLIC_ABOUT_RESUME_LINK ?? ""}
      target="_blank"
    >
      Download Reeume
    </Link>
  );
};

export default DownloadResume;
