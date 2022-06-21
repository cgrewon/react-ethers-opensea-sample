import { extendTheme } from "@chakra-ui/react";

const colors = {
  white: "#FFFFFF",
  darkPink: "#E12F80",
  lightPink: "#FF426E",
  lightBlue: "#BBB6D4",
  blue: "#09064C",
  darkBlue: "#050028"
};


const variantNoneOutline = () => ({
  field: {
    _focus: {
      outline: 'none'
      // borderColor: "var(--chakra-ui-focus-ring-color)",
      // boxShadow: "0 0 0 1px var(--chakra-ui-focus-ring-color)"
    }
  }
});

const components = {
  IconButton: {
    variants:{
      noOutline:()=> variantNoneOutline().field
    },
    baseStyle: {
      _focus: {
        outline: 'none'
        // borderColor: "var(--chakra-ui-focus-ring-color)",
        // boxShadow: "0 0 0 1px var(--chakra-ui-focus-ring-color)"
      }
    }
  },

  Button: {
    variants:{
      noOutline:()=> variantNoneOutline().field
    },
    baseStyle: {
      // padding: "8px 16px",
      // borderRadius: "12px",
      // color: "white",
      // width: "auto",
      "&:active": {
        transform: "scale(0.9)",
        "-webkit-transform": "scale(0.9, 0.9)"
      }
    },
    field: {
      _focus: {
        outline: 'none'
        // borderColor: "var(--chakra-ui-focus-ring-color)",
        // boxShadow: "0 0 0 1px var(--chakra-ui-focus-ring-color)"
      }
    }

    //   sizes: {
    //     xs: {
    //       h: "24px",
    //       minWidth: "77px"w
    //     },
    //     sm: {
    //       h: "33px",
    //       minWidth: "92px"
    //     },
    //     md: {
    //       h: "48px",
    //       minWidth: "120px"
    //     },
    //     lg: {
    //       h: "67px",
    //       minWidth: "200px",
    //       borderRadius: "50px"
    //     }
    //   },
    //   variants: {
    //     primary: {
    //       borderColor: "lightPink",
    //       borderWidth: "2px",
    //       borderStyle: "solid",
    //       ":hover": {
    //         backgroundColor: "lightPink"
    //       }
    //     },
    //     white: {
    //       borderColor: "white",
    //       borderWidth: "2px",
    //       borderStyle: "solid",
    //       ":hover": {
    //         backgroundColor: "white",
    //         color: "darkBlue"
    //       }
    //     },
    //     "white-no-border": {
    //       border: "none"
    //     },
    //     primaryFilled: {
    //       borderColor: "lightPink",
    //       borderWidth: "2px",
    //       borderStyle: "solid",
    //       backgroundColor: "lightPink",
    //       ":hover": {
    //         backgroundColor: "transparent"
    //       }
    //     },
    //     blueFilled: {
    //       backgroundColor: "blue"
    //     }
    //   }
    // },
    // Link: {
    //   baseStyle: {
    //     color: "white",
    //     "&:hover": {
    //       textDecoration: "none"
    //     }
    //   },
    //   sizes: {
    //     sm: {
    //       fontSize: "14px"
    //     },
    //     md: {
    //       fontSize: "18px"
    //     },
    //     lg: {
    //       fontSize: "22px"
    //     }
    //   }
  },
  // Text: {
  //   baseStyle: {
  //     color: "white"
  //   },
  //   sizes: {
  //     "header-big": {
  //       fontSize: "55px",
  //       fontWeight: "700",
  //       "@media screen and (max-width: 899px)": {
  //         fontSize: "48px"
  //       },
  //       "@media screen and (max-width: 599px)": {
  //         fontSize: "34px"
  //       }
  //     },
  //     subheader: {
  //       fontSize: "24px",
  //       fontWeight: "300",
  //       "@media screen and (max-width: 899px)": {
  //         fontSize: "22px"
  //       },
  //       "@media screen and (max-width: 599px)": {
  //         fontSize: "18px"
  //       }
  //     },
  //     subHeaderBold: {
  //       fontSize: "24px",
  //       fontWeight: "600",
  //       "@media screen and (max-width: 899px)": {
  //         fontSize: "22px"
  //       },
  //       "@media screen and (max-width: 599px)": {
  //         fontSize: "18px"
  //       }
  //     },
  //     sectionHeader: {
  //       fontSize: "36px",
  //       fontWeight: "600",
  //       "@media screen and (max-width: 899px)": {
  //         fontSize: "30px"
  //       },
  //       "@media screen and (max-width: 599px)": {
  //         fontSize: "28px"
  //       }
  //     },
  //     itemHeader: {
  //       fontSize: "30px",
  //       fontWeight: "600",
  //       "@media screen and (max-width: 899px)": {
  //         fontSize: "25px"
  //       },
  //       "@media screen and (max-width: 599px)": {
  //         fontSize: "22px"
  //       }
  //     },
  //     infoText: {
  //       fontSize: "18px",
  //       fontWeight: "300",
  //       "@media screen and (max-width: 899px)": {
  //         fontSize: "16px"
  //       },
  //       "@media screen and (max-width: 599px)": {
  //         fontSize: "14px"
  //       }
  //     }
  //   }
  // }
};



const theme = extendTheme({ colors, components });

export default theme;
