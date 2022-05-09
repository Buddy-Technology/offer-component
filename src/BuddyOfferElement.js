import React from 'react';

function BuddyOfferElement(options) {
	const onBuddyScriptLoad = (e) => {
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
