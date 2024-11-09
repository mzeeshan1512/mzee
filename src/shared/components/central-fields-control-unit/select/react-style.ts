import { colors } from "@/shared/utils/css-modifiers";

const commonTheme = (theme: any) => ({
    ...theme,
    colors: {
        primary: colors.primary,
        primary25: colors.primary25,
    },
});

const commonStyles = {
    menu: (provided: any) => ({
        ...provided,
        backdropFilter: 'blur(16px) saturate(180%)',
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        borderLeft: state?.isSelected ? `2px solid ${colors?.primary}` : "none",
        "&:hover": {
            borderLeft: `2px solid ${colors?.primary}`,
            cursor: "pointer",
            color: state?.selected ? colors?.primary : "white",
        },
    }),

    multiValue: (styles: any) => ({
        ...styles,
        backgroundColor: colors.primary,
        color: "white",
        "&:hover": {
            backgroundColor: colors.primary25,
        },
    }),

    dropdownIndicator: (base: any, state: any) => ({
        ...base,
        color: "grey",
        transition: 'all .2s ease',
        transform: state?.selectProps?.menuIsOpen ? 'rotate(180deg)' : null,
    }),
};

const disabledStyles = {
    control: (provided: any) => ({
        ...provided,
        backgroundColor:'light-dark(rgba(239, 239, 239, 0.3),rgba(59, 59, 59, 0.3))',
        borderColor:'rgba(118, 118, 118, 0.3)'

    }),
};
  

export {
    commonTheme,
    commonStyles,
    disabledStyles
}