import Button from "@/shared/components/button";
import React, { useState } from "react";

type varientType =
  | "Primary"
  | "primary"
  | "Secondary"
  | "secondary"
  | "Success"
  | "success"
  | "Danger"
  | "danger"
  | "Warning"
  | "warning"
  | "Info"
  | "info"
  | "Light"
  | "light"
  | "Dark"
  | "dark";
const ButtonPreviewer = () => {
  const [variant, setVariant] = useState<varientType | any>("Primary");
  const [outline, setOutline] = useState(false);
  return (
    <>
      <Button variant={variant} outline={outline}>
        {variant?.toUpperCase()}
      </Button>
      <div className="d-flex flex-column gap-2">
      <span>Variant</span>
      <ul className="column-count">
        {["primary", "secondary", "success", "danger", "warning", "info"]?.map(
          (item) => (
            <li
              key={item}
              onClick={() => setVariant(item)}
              className={`general-hover-cursor px-2 ${
                variant?.toUpperCase() === item?.toUpperCase()
                  ? "text-gradient-effect"
                  : ""
              }`}
            >
              {item?.toUpperCase()}
            </li>
          )
        )}
      </ul>
      </div>
      <div className="d-flex flex-column gap-2">
      <span>Outline</span>
      <span className={`${outline ? "text-gradient-effect":""}  general-hover-cursor`} onClick={()=>setOutline(!outline)}>{outline ? "No Outline":"Outline"}</span>
      </div>
    </>
  );
};

export default ButtonPreviewer;
