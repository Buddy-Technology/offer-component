const V3_URL = 'https://staging.embed.buddyinsurance.com/scripts/v2/index.js';
const V3_URL_REGEX = /^https:\/\/staging\.embed\.buddyinsurance\.com\/scripts\/index\.js\/?(\?.*)?$/;
const EXISTING_SCRIPT_MESSAGE = 'Buddy Script is already present';

const defaultOptions = {
	stage: 'STAGING',
};

export const findScript = () => {
	const scripts = Array.from(document.querySelectorAll(`script[src^="${V3_URL}"]`));
	const matchedScript = scripts.find(({ src }) => V3_URL_REGEX.test(src));
	return matchedScript;
};

const injectScript = (options) => {
	const finalOptions = { defaultOptions, ...options };
	const script = document.createElement('script');
	script.src = `${V3_URL}`;
	document.body.appendChild(script);
	script.onload = () => window.buddy_setup(finalOptions);
	return script;
};

let scriptPromise = null;

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

		if (window.buddy_setup) {
			// eslint-disable-next-line no-console
			console.warn(EXISTING_SCRIPT_MESSAGE);
		}

		if (window.buddy_setup) {
			resolve(window.buddy_setup);
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
				if (window.buddy_setup) {
					resolve(window.buddy_setup);
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
