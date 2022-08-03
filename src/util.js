const EXISTING_SCRIPT_MESSAGE = 'Buddy Offer Script is already loaded.';

const SCRIPTS = {
	LOCAL: {
		URL: 'http://localhost:8008/index.js',
		REGEX: /^http:\/\/localhost:8008\/index\.js\/?(\?.*)?$/,
	},
	DEVELOPMENT: {
		URL: 'https://js.buddy.insure/v2/dev/index.js',
		REGEX: /^https:\/\/js\.buddy\.insure\/v2\/staging\/index\.js\/?(\?.*)?$/,
	},
	STAGING: {
		URL: 'https://js.buddy.insure/v2/staging/index.js',
		REGEX: /^https:\/\/js\.buddy\.insure\/v2\/staging\/index\.js\/?(\?.*)?$/,
	},
	PRODUCTION: {
		URL: 'https://js.buddy.insure/v2/index.js',
		REGEX: /^https:\/\/js\.buddy\.insure\/v2\/index\.js\/?(\?.*)?$/,
	},
};

const STAGES = Object.keys(SCRIPTS);

/**
 * @type {Object}
 * @property {string} stage
 */
const defaultOptions = {
	stage: 'STAGING',
};

/**
 * @function isEmptyOrNil
 * @param  {*} value
 * @returns {Boolean}
 */
const isEmptyOrNil = (value) => {
	const isNil = (val) => [undefined, null].includes(val);
	const isEmptyStr = (str) => typeof str === 'string' && str.trim().length === 0;
	const isEmptyObjOrArr = (obj) => (typeof obj === 'object' && obj.length === undefined &&
		Object.keys(obj).length === 0) || (Array.isArray(obj) && obj.length === 0);
	return (isNil(value) || isEmptyStr(value) || isEmptyObjOrArr(value));
};
/**
 * @param  {Array<String>} propsToCheck
 * @param  {Object} obj
 * @returns {(null | String)}
 */
const validatePropertiesOfObject = (propsToCheck, obj) => {
	const emptyProps = propsToCheck.filter((prop) => isEmptyOrNil(obj[prop]));
	if (emptyProps.length) {
		const displayMissingProps = emptyProps.reduce((prev, current, i) => {
			const isLastEl = i === emptyProps.length - 1;
			return isLastEl ? `${prev}${current}.` : `${prev}${current}, `;
		}, '');
		return `The following props are required: ${displayMissingProps}`;
	}
	return null;
};

/**
 * @function findScript
 * @param {String} stage
 * @returns {(HTMLElement | undefined)}
 */
export const findScript = (stage = defaultOptions.stage) => {
	const { URL, REGEX } = SCRIPTS[stage];
	const scripts = Array.from(document.querySelectorAll(`script[src^="${URL}"]`));
	const matchedScript = scripts.find(({ src }) => REGEX.test(src));
	return matchedScript;
};

/**
 * @function updateOffer
 * @param  {Object} options
 */
export const updateOffer = (options) => {
	if (window.Buddy) {
		try {
			window.Buddy.updateOffer(options);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	}
};

/**
 * @function createOffer
 * @param  {Object} options
 */
const createOffer = (options) => {
	if (window.Buddy) {
		try {
			window.Buddy.createOffer(options);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	}
};

/**
 * @function injectScript
 * @param  {Object} options
 * @returns {HTMLElement}
 */
const injectScript = (options) => {
	const finalOptions = { ...defaultOptions, ...options };
	const script = document.createElement('script');
	script.src = `${SCRIPTS[finalOptions.stage].URL}`;
	document.body.appendChild(script);
	script.onload = () => createOffer(finalOptions);
	return script;
};

/**
 * @type {(Promise | null)}
 */
let scriptPromise = null;

/**
 * @function loadScript
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
			resolve(window.Buddy);
			return;
		}

		try {
			const requiredProps = ['ion', 'partnerID'];
			const missingRequiredProps = validatePropertiesOfObject(requiredProps, options);

			if (missingRequiredProps) {
				reject(new Error(missingRequiredProps));
				return;
			}

			if (!options?.stage) {
				// eslint-disable-next-line no-console
				console.warn(`No stage passed to BuddyOfferElement. Using default stage: ${defaultOptions.stage}`);
			}

			// If stage is passed, ensure it is one of the prescribed options.
			if (options?.stage && !STAGES.includes(options.stage)) {
				const msg = `The stage prop must be one of: [${STAGES.join(' , ')}], but received "${options.stage}."`;
				reject(new Error(msg));
				return;
			}

			let script = findScript(options?.stage);

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
