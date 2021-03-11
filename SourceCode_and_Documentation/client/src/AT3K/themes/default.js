import tinycolor from "tinycolor2";

const themeClasses = {
	primary: "#222222",
	secondary: "#222222",
	warning: "#FFC260",
	success: "#3CD4A0",
	info: "#B3F1FF"
};

const lightIntensity = 7.5;
const darkIntensity = 15;

const defaultTheme = {
	palette: {
		primary: {
			main: themeClasses.primary,
			light: tinycolor(themeClasses.primary)
				.lighten(lightIntensity)
				.toHexString(),
			dark: tinycolor(themeClasses.primary)
				.darken(darkIntensity)
				.toHexString(),
		},
		secondary: {
			main: themeClasses.secondary,
			light: tinycolor(themeClasses.secondary)
				.lighten(lightIntensity)
				.toHexString(),
			dark: tinycolor(themeClasses.secondary)
				.darken(darkIntensity)
				.toHexString(),
			contrastText: "#FFFFFF",
		},
		warning: {
			main: themeClasses.warning,
			light: tinycolor(themeClasses.warning)
				.lighten(lightIntensity)
				.toHexString(),
			dark: tinycolor(themeClasses.warning)
				.darken(darkIntensity)
				.toHexString(),
		},
		success: {
			main: themeClasses.success,
			light: tinycolor(themeClasses.success)
				.lighten(lightIntensity)
				.toHexString(),
			dark: tinycolor(themeClasses.success)
				.darken(darkIntensity)
				.toHexString(),
		},
		info: {
			main: themeClasses.info,
			light: tinycolor(themeClasses.info)
				.lighten(lightIntensity)
				.toHexString(),
			dark: tinycolor(themeClasses.info)
				.darken(darkIntensity)
				.toHexString(),
		},
		text: {
			primary: "#4A4A4A",
			secondary: "#6E6E6E",
			hint: "#B9B9B9",
		},
		background: {
			default: "#F6F7FF",
			light: "#F3F5FF",
		},
	},
	customShadows: {
		widget:
			"0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
		widgetDark:
			"0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
		widgetWide:
			"0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
	},
	overrides: {
		MuiBackdrop: {
			root: {
				backgroundColor: "#4A4A4A1A",
			},
		},
		MuiMenu: {
			paper: {
				boxShadow:
					"0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
			},
		},
		MuiSelect: {
			icon: {
				color: "#B9B9B9",
			},
		},
		MuiListItem: {
			root: {
				"&$selected": {
					backgroundColor: "#F3F5FF !important",
					"&:focus": {
						backgroundColor: "#F3F5FF",
					},
				},
			},
			button: {
				"&:hover, &:focus": {
					backgroundColor: "#F3F5FF",
				},
			},
		},
		MuiTouchRipple: {
			child: {
				backgroundColor: "white",
			},
		},
		MuiTableRow: {
			root: {
				height: 56,
			},
		},
		MuiTableCell: {
			root: {
				borderBottom: "1px solid rgba(224, 224, 224, .5)",
				paddingLeft: 24
			},
			head: {
				fontSize: "0.95rem",
			},
			body: {
				fontSize: "0.95rem",
			},
		},
		PrivateSwitchBase: {
			root: {
				marginLeft: 10
			}
		}
	},
};

export default defaultTheme;
