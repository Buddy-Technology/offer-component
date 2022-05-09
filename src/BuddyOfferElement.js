// eslint-disable-next-line no-unused-vars
import React, { FunctionComponent } from 'react';
/**
 * @typedef {Object} DataObject
 * @property {Object} [customer] - customer data
 * @property {Object} [policy] - policy data
 */

/**
 * @typedef {Function} AddToCartFunction
 * @description A callback to be called with a payload object when users opt into the offer.
 * @returns {DataObject} the policy payload
 */

/**
 * @typedef {Function} RemoveFromCartFunction
 * @description A callback to be called with a payload object when users opt out of the offer.
 * @returns {DataObject} the policy payload
 */

/**
 * @typedef {Object} OverridesObject
 * @property {Array<String>} [webFonts] - array of url strings linking to web fonts.
 * @property {Object} [styles] - Object Styles object for overriding any css.
 * @property {Object} [colors] - Object for overriding individual color options.
 */

/**
 * @typedef {Object} ThemeObject
 * @property {String} [baseTheme='base'] - The base theme to style with. Can be used simply as a started and overwritten.
 * @property {String} [palette='base'] - The base color scheme to style with. Can be used simply as a started and overwritten.
 * @property {OverridesObject} [overrides]
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
 */

/**
 * @typedef {Object} BuddyOfferElementProps
 * @property {String} ion - The ion id for the offering.
 * @property {String} partnerID - The partner ID required for instantiating the Offer
 * @property {String} [viewType="paginated"] - establishes how the offer should display to the user. One of: 'paginated', 'single-form' or 'offer-only.'
 * @property {DataObject} [data] - Any customer or policy data to pre-fill the offer with. Refer to your individual ION for data structure.
 * @property {AddToCartFunction} [onAddToCart] -
 * @property {RemoveFromCartFunction} [onRemoveFromCart]
 * @property {ThemeObject} [theme]
 */

/**
 * @function BuddyOfferElement
 * @param {BuddyOfferElementProps} options
 * @returns {FunctionComponent<BuddyOfferElementProps>}
 */

function BuddyOfferElement(options) {
	const onBuddyScriptLoad = () => {
		window.buddy_setup(options);
	};

	const loadScript = (env) => {
		if (!window.buddy_setup) {
			const scriptUrl = env === 'PRODUCTION'
				? 'https://embed.buddyinsurance.com/scripts/v2/index.js'
				: 'https://staging.embed.buddyinsurance.com/scripts/v2/index.js';
			const s = document.createElement('script');
			s.src = scriptUrl;
			s.id = 'buddy-script';
			s.onload = onBuddyScriptLoad;
			document.body.appendChild(s);
		}
	};
	loadScript(options.stage || 'STAGING');

	return (
		<div id="buddy_widget" />
	);
}

export default BuddyOfferElement;
