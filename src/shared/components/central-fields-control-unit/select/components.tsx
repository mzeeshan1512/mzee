import {
  MenuProps,
  MultiValueProps,
  OptionProps,
  SingleValueProps,
  components
} from "react-select";

const CustomMenu = (props: MenuProps<any>) => {
  return <components.Menu {...props}>{props.children}</components.Menu>;
};

const OptionWithIcon = (props: OptionProps<any>) => {
  const { data } = props;
  return (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data?.value?.base64 || data?.value?.src?.url || data?.value?.src}
          alt={data?.label}
          style={{ marginRight: 10, width: 20, height: 20 }}
        />
        {data?.label}
      </div>
    </components.Option>
  );
};

const SingleValueWithIcon = (props: SingleValueProps<any>) => {
  const { data } = props;
  return (
    <components.SingleValue {...props}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data?.value?.base64 || data?.value?.src?.url || data?.value?.src}
          alt={data?.label}
          style={{ marginRight: 10, width: 20, height: 20 }}
        />
        {data?.label}
      </div>
    </components.SingleValue>
  );
};

const MultiValueWithIcon = (props: MultiValueProps<any>) => {
  const { data } = props;
  return (
    <components.MultiValue {...props}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data?.value?.base64 || data?.value?.src?.url || data?.value?.src}
          alt={data?.label}
          style={{ marginRight: 10, width: 20, height: 20 }}
        />
        {data?.label}
      </div>
    </components.MultiValue>
  );
};

export { OptionWithIcon, CustomMenu, SingleValueWithIcon, MultiValueWithIcon };
