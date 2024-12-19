import React from "react";

const Glassmorphism = ({
  children,
  className = "",
  ...rest
}: { children: React.ReactNode } & React.ComponentProps<"div">) => {
  return (
    <section
      {...rest}
      className={`w-[90%] md:w-[70%] backdrop-blur-[9px] backdrop-saturate-[200%] bg-transparent rounded-[12px] p-3 ${className}`}
    >
      {children}
    </section>
  );
};

export default Glassmorphism;
