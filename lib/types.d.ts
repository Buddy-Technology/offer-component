export = BuddyOfferElement

/**
 * @property [customer] - customer data
 * @property [policy] - policy data
 */
declare type DataObject = {
    customer?: any;
    policy?: any;
};

/**
 * A callback to be called with a payload object when users opt into the offer.
 */
declare type AddToCartFunction = () => DataObject;

/**
 * A callback to be called with a payload object when users opt out of the offer.
 */
declare type RemoveFromCartFunction = () => DataObject;

/**
 * @property [webFonts] - array of url strings linking to web fonts.
 * @property [styles] - Object Styles object for overriding any css.
 * @property [colors] - Object for overriding individual color options.
 */
declare type OverridesObject = {
    webFonts?: String[];
    styles?: any;
    colors?: any;
};

/**
 * @example
 * const theme = {
 * 	baseTheme: 'base',
 * 		palette: 'buddy',
 * 		overrides: {
 * 			webFonts: [
 * 				'https://fonts.googleapis.com/css2?family=Rubik:wght@700&display=swap',
 * 			],
 * 			styles: {
 * 				h1: {
 * 					color: 'var(--color-text-primary)',
 * 					fontFamily: 'Rubik, sans-serif',
 * 					fontSize: '2rem',
 * 					'@media (min-width: 992px)': {
 * 						fontSize: '3rem',
 * 					},
 * 					'&:hover': {
 * 						boxShadow: 'none',
 * 						backgroundColor: '#FBF9EF',
 * 					},
 * 				},
 * 				body: { color: '#0A242D' },
 * 				'.input-text': {
 * 					border: 'none',
 * 					color: '#333333',
 * 				},
 * 			},
 * 			colors: { textPrimary: '#0A242D' },
 * 		},
 * 	};
 * @property [baseTheme = 'base'] - The base theme to style with. Can be used simply as a started and overwritten.
 * @property [palette = 'base'] - The base color scheme to style with. Can be used simply as a started and overwritten.
 */
declare type ThemeObject = {
    baseTheme?: string;
    palette?: string;
    overrides?: OverridesObject;
};

/**
 * @property ion - The ion id for the offering.
 * @property partnerID - The partner ID required for instantiating the Offer
 * @property [viewType = paginated] - establishes how the offer should display to the user. One of: 'paginated', 'single-form' or 'offer-only.'
 * @property [data] - Any customer or policy data to pre-fill the offer with. Refer to your individual ION for data structure.
 * @property [onAddToCart] - -
 */
declare type BuddyOfferElementProps = {
    ion: string;
    partnerID: string;
    viewType?: string;
    data?: DataObject;
    onAddToCart?: AddToCartFunction;
    onRemoveFromCart?: RemoveFromCartFunction;
    theme?: ThemeObject;
};

declare function BuddyOfferElement(options: BuddyOfferElementProps): FunctionComponent<BuddyOfferElementProps>;

declare const defaultOptions: {
    stage: string;
};

declare function isEmptyOrNil(value: any): boolean;

declare function validatePropertiesOfObject(propsToCheck: String[], obj: any): null | string;

declare function findScript(stage: string): HTMLElement | undefined;

declare function updateOffer(options: any): void;

declare function createOffer(options: any): void;

declare function injectScript(options: any): HTMLElement;

declare var scriptPromise: Promise | null;

declare function loadScript(options: any): Promise;

