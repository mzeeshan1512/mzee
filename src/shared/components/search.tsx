import React from "react";
import Input from "./central-fields-control-unit/input";

type Props = {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearch?: (e?: any) => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?:boolean
};

const Search = ({
  onSearch = () => {},
  searchPlaceholder,
  searchValue,
  className,
  style,
  disabled
}: Props) => {
  return (
    <Input
      value={searchValue||""}
      onChange={onSearch}
      placeholder={searchPlaceholder}
      inputCssClass={className}
      inputStyles={style}
      disabled={disabled}
    />
  );
};

export default Search;
