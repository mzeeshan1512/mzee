import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import ParticleAnimation from "@/shared/components/particles-animation";
import { DefaultBg } from "@/shared/config";

const Logo = dynamic(() => import("@/shared/components/app-logo"));

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="auth-layout text-unelectable"
      style={{
        backgroundImage: `url(${DefaultBg?.src})`,
      }}
    >
      <ParticleAnimation />
      <div className="content">
        <div className="card glassomorhpic-effect">
          <div className="d-flex justify-content-center">
            <Logo />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
