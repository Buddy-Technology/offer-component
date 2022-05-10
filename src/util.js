// const V3_URL = 'https://staging.embed.buddyinsurance.com/scripts/v2/index.js';
// const V3_URL_REGEX = /^https:\/\/staging\.embed\.buddyinsurance\.com\/scripts\/index\.js\/?(\?.*)?$/;
const V3_URL = 'http://localhost:3012/index.js';
const V3_URL_REGEX = /^http:\/\/localhost:3012\/index\.js\/?(\?.*)?$/;
const EXISTING_SCRIPT_MESSAGE = 'Buddy Script is already present';

/**
 * @type {Object}
 * @private
 * @property {string} stage
 */
const defaultOptions = {
	stage: 'STAGING',
};

/**
 * @function findScript
 * @private
 * @returns {(HTMLElement | undefined)}
 */
export const findScript = () => {
	const scripts = Array.from(document.querySelectorAll(`script[src^="${V3_URL}"]`));
	const matchedScript = scripts.find(({ src }) => V3_URL_REGEX.test(src));
	return matchedScript;
};

/**
 * @function updateOffer
 * @private
 * @param  {Object} options
 */
export const updateOffer = (options) => {
	if (window.Buddy) {
		window.Buddy.updateOffer(options);
	}
};

/**
 * @function createOffer
 * @private
 * @param  {Object} options
 */
const createOffer = (options) => {
	if (window.Buddy) {
		window.Buddy.createOffer(options);
	}
};

/**
 * @function injectScript
 * @private
 * @param  {Object} options
 * @returns {HTMLElement}
 */
const injectScript = (options) => {
	const finalOptions = { defaultOptions, ...options };
	const script = document.createElement('script');
	script.src = `${V3_URL}`;
	document.body.appendChild(script);
	script.onload = () => createOffer(finalOptions);
	return script;
};

/**
 * @type {(Promise | null)}
 * @private
 */
let scriptPromise = null;

/**
 * @function loadScript
 * @private
 * @param  {Object} options
 * @returns {Promise}
 */
export const loadScript = (options) => {
	// Ensure that we only attempt to script once
	if (scriptPromise !== null) {
		return scriptPromise;
	}

	scriptPromise = new Promise((resolve, reject) => {
		if (typeof window === 'undefined') {
			// Resolve to null when imported server side. This makes the module
			// safe to import in an isomorphic code base.
			resolve(null);
			return;
		}

		if (window.Buddy) {
			// eslint-disable-next-line no-console
			console.warn(EXISTING_SCRIPT_MESSAGE);
		}

		if (window.Buddy) {
			resolve(window.Buddy);
			return;
		}

		try {
			let script = findScript();

			if (script) {
				// eslint-disable-next-line no-console
				console.warn(EXISTING_SCRIPT_MESSAGE);
			} else if (!script) {
				script = injectScript(options);
			}

			script.addEventListener('load', () => {
				if (window.Buddy) {
					resolve(window.Buddy);
				} else {
					reject(new Error('Buddy Offer Element not available'));
				}
			});

			script.addEventListener('error', () => {
				reject(new Error('Failed to load Buddy Offer Element'));
			});
		} catch (error) {
			reject(error);
		}
	});

	return scriptPromise;
};
