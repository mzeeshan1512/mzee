import React, { useState } from "react";
import Input from "@/shared/components/central-fields-control-unit/input";
import { inputType } from "@/shared/types/fields";
const InputPreviewer = () => {
  const [type, setType] = useState<inputType>("text");
  const [showLabel, toggleLabel] = useState<boolean>(false);
  const [floating, toggleFloating] = useState<boolean>(false);
  const [required, toggleRequired] = useState<boolean>(false);
  const [showTick, toggleShowTick] = useState<boolean>(false);
  const [state, setState] = useState<"valid" | "invalid" | null>(null);
  const options: inputType[] = [
    "checkbox",
    "color",
    "date",
    "email",
    "file",
    "number",
    "numeric",
    "password",
    "radio",
    "range",
    "switch",
    "text",
    "textarea",
  ];
  return (
    <>
      <Input
        type={type}
        placeholder="type"
        floatingLabels={floating}
        label={showLabel ? type : null}
        onChange={(e:any) => console.log(e?.target.value)}
        required={required}
        showTick={showTick}
        isValid={state === "valid"}
        inValid={state === "invalid"}
        name={type}
        id={type}
        RadioCheckLabelPlacement="left"
      />
      <div
        className="content"
        style={{
          maxHeight: "150px",
          overflowY: "auto",
        }}
      >
        <div className="d-flex flex-column gap-2">
          <span className="border-bottom">Variant</span>
          <ul className="column-count">
            {options?.map((item) => (
              <li
                key={item}
                onClick={() => setType(item)}
                className={`general-hover-cursor px-2 ${
                  type?.toUpperCase() === item?.toUpperCase()
                    ? "text-gradient-effect"
                    : ""
                }`}
              >
                {item?.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
        <div className="d-flex flex-column gap-2 content">
          <span className="border-bottom">Label Props</span>
          <ul className="column-count">
            <li
              className={`general-hover-cursor ${
                showLabel ? "text-gradient-effect" : ""
              }`}
              onClick={() => toggleLabel(!showLabel)}
            >
              Toggle Label Visibility
            </li>
            <li
              className={`general-hover-cursor ${
                required ? "text-gradient-effect" : ""
              }`}
              onClick={() => toggleRequired(!required)}
            >
              Required
            </li>
            <li
              className={`general-hover-cursor ${
                floating ? "text-gradient-effect" : ""
              }`}
              onClick={() => toggleFloating(!floating)}
            >
              Toggle Floating Labels
            </li>
            <li
              className={`general-hover-cursor ${
                showTick ? "text-gradient-effect" : ""
              }`}
              onClick={() => toggleShowTick(!showTick)}
            >
              Show Tick
            </li>
          </ul>
        </div>
        <div className="d-flex flex-column gap-2 content">
          <span className="border-bottom">Toggle between Valid Invalid</span>
          <ul className="colum-count">
            <li
              className={`general-hover-cursor ${
                state === "valid" ? "text-gradient-effect" : ""
              }`}
              onClick={() => setState("valid")}
            >
              Valid
            </li>
            <li
              className={`general-hover-cursor ${
                state === "invalid" ? "text-gradient-effect" : ""
              }`}
              onClick={() => setState("invalid")}
            >
              Invalid
            </li>
            <li
              className={`general-hover-cursor ${
                !state ? "text-gradient-effect" : ""
              }`}
              onClick={() => setState(null)}
            >
              Null
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default InputPreviewer;
