import React from "react";

const TextWithLine = ({
  text = "text",
  multi = false,
  wrapperClass=""
}: {
  text: string;
  multi?: boolean;
  wrapperClass?:string
}) => {
  return (
    <div className={`d-flex justify-content-between align-items-center ${wrapperClass}`}>
      {multi ? <hr className="flex-grow-1" /> : null}
      <span
        className={multi ? "px-1 mx-1 text-warning" : "pe-1 me-1 text-warning"}
      >
        {text}
      </span>
      <hr className="flex-grow-1" />
    </div>
  );
};

export default TextWithLine;
