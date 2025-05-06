import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
// import { useAppSelector } from '@/app/store';
// import { PaletteMode } from '@mui/material';
import React from 'react';
import LatoBlack from '@/assets/fonts/Lato/Lato-Black.ttf'
import LatoBlackItalic from '@/assets/fonts/Lato/Lato-BlackItalic.ttf'
import LatoBold from '@/assets/fonts/Lato/Lato-Bold.ttf'
import LatoBoldItalic from '@/assets/fonts/Lato/Lato-BoldItalic.ttf'
import LatoItalic from '@/assets/fonts/Lato/Lato-Italic.ttf'
import LatoLight from '@/assets/fonts/Lato/Lato-Light.ttf'
import LatoLightItalic from '@/assets/fonts/Lato/Lato-LightItalic.ttf'
import LatoRegular from '@/assets/fonts/Lato/Lato-Regular.ttf'
import LatoThin from '@/assets/fonts/Lato/Lato-Thin.ttf'
import LatoThinItalic from '@/assets/fonts/Lato/Lato-ThinItalic.ttf'

type Props = {
	children?: React.ReactNode;
};

declare module '@mui/material/styles' {
	// index signature typegradients

	// interface TypeGradient {
	// 	[key: string]: string;
	// }

	interface Palette {
		neutral: PaletteColor;
		// gradient: TypeGradient;
		text: TypeText2;
	}
	interface TypeColor {
		Darkest?: string;
		Darker?: string;
		Dark?: string;
		Base?: string;
		Light?: string;
		Lighter?: string;
		Lightest?: string;
		White?: string;
	}
	interface TypeText2 {
		primary: string;
		secondary: string;
		disabled: string;
	}
	interface PaletteOptions {
		// gradient: TypeGradient;
		// Ink: TypeColor;
		// Sky: TypeColor;
		// Red: TypeColor;
		// Green: TypeColor;
		neutral: PaletteColor;
	}

	interface TypeBackground {
		opposite: string;
	}
	interface TypographyVariants {
		cta1: React.CSSProperties;
		cta2: React.CSSProperties;
		cta3: React.CSSProperties;
		body1: React.CSSProperties;
		body2: React.CSSProperties;
		body3: React.CSSProperties;
		body4: React.CSSProperties;
	}

	// allow configuration using `createTheme`
	interface TypographyVariantsOptions {
		cta1?: React.CSSProperties;
		cta2?: React.CSSProperties;
		cta3?: React.CSSProperties;
		body1?: React.CSSProperties;
		body2?: React.CSSProperties;
		body3?: React.CSSProperties;
		body4?: React.CSSProperties;
	}

	interface PaletteColor {
		darkest?: string;
		medium?: string;
		lightest?: string;
	}

	interface SimplePaletteColorOptions {
		darkest?: string;
		medium?: string;
		lightest?: string;
	}

}
declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		cta1: true;
		cta2: true;
		cta3: true;
		body1: true;
		body2: true;
		body3: true;
		body4: true;
	}
}
export const AppThemeProvider: React.FC<Props> = ({ children }) => {
//   const mode = useAppSelector((state) => state.user.mode);
//   const mode = 'light';
	const theme = responsiveFontSizes(
		createTheme({
			palette: {
				// mode: mode as PaletteMode,
				mode: 'light',
				primary: {
					darkest: '#283D34',
					dark: '#0E382A',
					main: '#228665',
					light: '#99C7B8',
					lightest: '#E9F3F0',
				},
				secondary: {
					darkest: '#0B1621',
					dark: '#122637',
					main: '#19354E',
					light: '#95A2AE',
					lightest: '#E8EBED',
				},
				neutral: {
					darkest: '#252525',
					dark: '#202124',
					main: '#54626C',
					light: '#F8F8F8',
					lightest: '#FFFFFF',
					contrastText: '#FFFFFF',
				},
				// Ink: {
				// 	Darkest: '#000000',
				// 	Darker: '#222222',
				// 	Dark: '#303437',
				// 	Base: '#404446',
				// 	Light: '#6C7072',
				// 	Lighter: '#72777A',
				// },
				// Sky: {
				// 	Dark: '#979C9E',
				// 	Base: '#CDCFD0',
				// 	Light: '#E3E5E5',
				// 	Lighter: '#F2F4F5',
				// 	Lightest: '#F7F9FA',
				// 	White: '#FFFFFF',
				// },

				// Red: {
				// 	Darkest: '#6B0206',
				// 	Base: '#E8282B',
				// 	Light: '#F94739',
				// 	Lighter: '#FF9898',
				// 	Lightest: '#FFE5E5',
				// },

				// Green: {
				// 	Darkest: '#0A4C0A',
				// 	Base: '#0F8B0F',
				// 	Light: '#1EB01E',
				// 	Lighter: '#7FF77F',
				// 	Lightest: '#E5FFE5',
				// },
				// background: {
				//   default: mode === 'dark' ? '#000000' : '#FCFBFA',
				//   opposite: mode === 'dark' ? '#FCFBFA' : '#000000',
				//   paper: mode === 'dark' ? '#131313' : '#FCFCFC',
				// },
				// text: {
				//   primary: mode === 'dark' ? '#FFFFFF' : '#000000',
				//   secondary: '#999999',
				//   disabled: '#C3C1BD',
				// },

				// grey: {
				//   50: mode === 'dark' ? 'hsl(0, 0%, 10%)' : 'hsl(0, 5%, 95%)',
				//   100: mode === 'dark' ? 'hsl(0, 0%, 20%)' : 'hsl(0, 0%, 90%)',
				//   200: mode === 'dark' ? 'hsl(0, 0%, 30%)' : 'hsl(0, 0%, 80%)',
				//   300: mode === 'dark' ? 'hsl(0, 0%, 40%)' : 'hsl(0, 0%, 70%)',
				//   400: mode === 'dark' ? 'hsl(0, 0%, 50%)' : 'hsl(0, 0%, 60%)',
				//   500: mode === 'dark' ? 'hsl(0, 0%, 60%)' : 'hsl(0, 0%, 50%)',
				//   600: mode === 'dark' ? 'hsl(0, 0%, 70%)' : 'hsl(0, 0%, 40%)',
				//   700: mode === 'dark' ? 'hsl(0, 0%, 80%)' : 'hsl(0, 0%, 30%)',
				//   800: mode === 'dark' ? 'hsl(0, 0%, 90%)' : 'hsl(0, 0%, 20%)',
				//   900: mode === 'dark' ? 'hsl(0, 5%, 95%)' : 'hsl(0, 0%, 10%)',
				// },
				// gradient: {
				// 	bronze: 'linear-gradient(180deg, #9C6D3E 0%, #E8C8A9 100%)',
				// 	silver: 'linear-gradient(180deg, #808080 0%, #DFDFDF 100%)',
				// 	gold: 'linear-gradient(180deg, #A3873C 0%, #E3D294 100%)',
				// },
			},

			typography: (palette) => ({
				fontFamily: 'Lato, sans-serif',

				h1: {
					fontSize: '26px',
					fontWeight: '600',
					// lineHeight: '33px',
				},
				h2: {
					fontSize: '22px',
					fontWeight: '600',
					// lineHeight: '28px',
				},
				h3: {
					fontSize: '20px',
					fontWeight: '600',
					// lineHeight: '25px',
				},
				h4: {
					fontSize: '18px',
					fontWeight: '600',
					// lineHeight: '23px',
				},
				h5: {
					fontSize: '16px',
					fontWeight: '500',
					// lineHeight: '20px',
				},

				cta1: {
					fontSize: '28px',
					fontWeight: '500',
					// lineHeight: '35px',
				},
				cta2: {
					fontSize: '18px',
					fontWeight: '500',
					// lineHeight: '23px',
				},
				cta3: {
					fontSize: '15px',
					fontWeight: '400',
					// lineHeight: '20px',
				},
				body1: {
					fontSize: '16px',
					fontWeight: '400',
					color: palette.neutral.main
					// lineHeight: '18px',
				},
				body2: {
					fontSize: '14px',
					fontWeight: '400',
					color: palette.neutral.main
					// lineHeight: '16px',
				},
				body3: {
					fontSize: '12px',
					fontWeight: '400',
					color: palette.neutral.main
					// lineHeight: '14px',
				},
				body4: {
					fontSize: '10px',
					fontWeight: '400',
					color: palette.neutral.main
					// lineHeight: '14px',
				},
			}),
			components: {
				MuiCssBaseline: {
					styleOverrides: (theme) => ({
						html: [
							{'@font-face': {
									fontFamily: 'Lato',
									src: `url(${LatoThin}) format('truetype')`,
									fontWeight: 100,
									fontStyle: 'normal',
									fontDisplay: 'swap',
							}},
							{'@font-face': {
									fontFamily: 'Lato',
									src: `url(${LatoThinItalic}) format('truetype')`,
									fontWeight: 100,
									fontStyle: 'italic',
									fontDisplay: 'swap',
							}},
							{'@font-face': {
									fontFamily: 'Lato',
									src: `url(${LatoLight}) format('truetype')`,
									fontWeight: 300,
									fontStyle: 'normal',
									fontDisplay: 'swap',
							}},
							{'@font-face': {
									fontFamily: 'Lato',
									src: `url(${LatoLightItalic}) format('truetype')`,
									fontWeight: 300,
									fontStyle: 'italic',
									fontDisplay: 'swap',
							}},
							{'@font-face': {
									fontFamily: 'Lato',
									src: `url(${LatoRegular}) format('truetype')`,
									fontWeight: 400,
									fontStyle: 'normal',
									fontDisplay: 'swap',
							}},
							{'@font-face': {
									fontFamily: 'Lato',
									src: `url(${LatoItalic}) format('truetype')`,
									fontWeight: 400,
									fontStyle: 'italic',
									fontDisplay: 'swap',
							}},
							{'@font-face': {
									fontFamily: 'Lato',
									src: `url(${LatoBold}) format('truetype')`,
									fontWeight: 700,
									fontStyle: 'normal',
									fontDisplay: 'swap',
							}},
							{'@font-face': {
									fontFamily: 'Lato',
									src: `url(${LatoBoldItalic}) format('truetype')`,
									fontWeight: 700,
									fontStyle: 'italic',
									fontDisplay: 'swap',
							}},
							{'@font-face': {
									fontFamily: 'Lato',
									src: `url(${LatoBlack}) format('truetype')`,
									fontWeight: 900,
									fontStyle: 'normal',
									fontDisplay: 'swap',
							}},
							{'@font-face': {
									fontFamily: 'Lato',
									src: `url(${LatoBlackItalic}) format('truetype')`,
									fontWeight: 900,
									fontStyle: 'italic',
									fontDisplay: 'swap',
							}},
							],
						body: {
							backgroundColor: theme.palette.neutral.light,
							color: theme.palette.secondary.darkest,
							fontFamily: `'Lato', sans-serif`,
						},
					}),
				},
				MuiLink: {
					styleOverrides: {
						root: {
							cursor: 'pointer',
							fontWeight: '500',
							textDecoration: 'none',
							lineHeight: '22px',
							transition: 'all 0.1s ease-in-out',
							'&:hover': {
								opacity: 0.8,
							},
						},
					},
				},
				MuiIconButton: {
					styleOverrides: {
						root: {
							aspectRatio: '1/1',
						},
					},
				},
				// MuiButton: {
				// 	styleOverrides: {
				// 		root: ({theme}) => ({
				// 			fontSize: theme.typography.cta3.fontSize
				// 		}),
				// 	},
				// },
				// MuiTextField: {
				// 	styleOverrides: {
				// 	  root: ({ theme }) => ({
				// 		'& .MuiOutlinedInput-root': {
				// 		  '& fieldset': {
				// 			borderColor: theme.palette.mode === 'dark' ? '#0000003B' : '#0000003B',
				// 		  },
				// 		  '&:hover fieldset': {
				// 			borderColor: theme.palette.mode === 'dark' ? '#0000003B' : '#0000003B',
				// 		  },
				// 		  '&.Mui-focused fieldset': {
				// 			borderColor: theme.palette.primary.main,
				// 		  },
				// 		},
				// 	  }),
				// 	},
				// },
				},
		}),
	);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
