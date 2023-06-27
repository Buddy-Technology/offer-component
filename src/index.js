// eslint-disable-next-line no-unused-vars
import React, { FunctionComponent, useEffect } from 'react';
import { loadScript, updateOffer } from './util';
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
 * @typedef {Object} LogoOverride
 * @property {String} url - destination url when users click the trust badge
 * @property {String} src - src of the img for displaying the trust badge
 * @property {String} [alt] - alt text for trust badge image
 */

/**
 *@typedef {Object} EventObject
 *@param {string} eventType - the type of user event (eg:'onCheckout')
 *@param {object} data - data object related to the user event.
 *@param {object} data.timestamp - timestamp of the event. All events have a timestamp property.
*/

/**
 *@typedef {Function} OnUserEventCallback
 *@param {EventObject} type - the type of user event (eg:'onCheckout')
*/

/**
 * @typedef {Object} BuddyOfferElementProps
 * @property {String} ion - The ion id for the offering.
 * @property {String} partnerID - The partner ID required for instantiating the Offer
 * @property {String} [stage="STAGING"] - toggle's the environment for the Offer Component. Defaults to STAGING. Must be set to "PRODUCTION" before going live.
 * @property {String} [viewType="paginated"] - establishes how the offer should display to the user. One of: 'paginated', 'single-form' or 'offer-only.'
 * @property {ThemeObject} [theme] - theming object for customizing offer component's styles
 * @property {DataObject} [data] - Any customer or policy data to pre-fill the offer with. Refer to your individual ION for data structure.
 * @property {OnUserEventCallback} [onUserEvent] - callback function for tracking user behavioral data. Triggers on user interactions such as input focus/blur, in-app navigation, etc. Refer to the docs for more details.
 * @property {AddToCartFunction} [onAddToCart] - callback function triggered when users opt into an offer-only offer.
 * @property {RemoveFromCartFunction} [onRemoveFromCart] - callback function triggered when users opt out of an offer-only offer.
 * @property {boolean} includeCheckout - toggles whether or not to display the card capture checkout view. Defaults to true. When false, an AddToCart callback must be provided.
 * @property {LogoOverride} [logoOverride] - object for overriding Buddy's trust badge.
 */

/**
 * @function BuddyOfferElement
 * @param {BuddyOfferElementProps} options
 * @returns {FunctionComponent<BuddyOfferElementProps>}
 */

function BuddyOfferElement(options) {
	const getScript = async () => {
		try {
			await loadScript(options);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	};
	getScript();

	useEffect(() => {
		updateOffer(options);
	}, [options]);

	return (
		<div id="buddy_offer" />
	);
}

export default BuddyOfferElement;
