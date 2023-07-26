## Functions

<dl>
<dt><a href="#BuddyOfferElement">BuddyOfferElement(options)</a> ⇒ <code><a href="#BuddyOfferElementProps">FunctionComponent.&lt;BuddyOfferElementProps&gt;</a></code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#DataObject">DataObject</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#AddToCartFunction">AddToCartFunction</a> ⇒ <code><a href="#DataObject">DataObject</a></code></dt>
<dd><p>A callback to be called with a payload object when users opt into the offer.</p>
</dd>
<dt><a href="#RemoveFromCartFunction">RemoveFromCartFunction</a> ⇒ <code><a href="#DataObject">DataObject</a></code></dt>
<dd><p>A callback to be called with a payload object when users opt out of the offer.</p>
</dd>
<dt><a href="#ScrollToTopFunction">ScrollToTopFunction</a> : <code>function</code></dt>
<dd><p>A function to override the default scroll to top of offer element behavior when navigating between screens</p>
</dd>
<dt><a href="#OverridesObject">OverridesObject</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ThemeObject">ThemeObject</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#LogoOverride">LogoOverride</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#EventObject">EventObject</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#OnUserEventCallback">OnUserEventCallback</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#BuddyOfferElementProps">BuddyOfferElementProps</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="BuddyOfferElement"></a>

## BuddyOfferElement(options) ⇒ [<code>FunctionComponent.&lt;BuddyOfferElementProps&gt;</code>](#BuddyOfferElementProps)
**Kind**: global function  

| Param | Type |
| --- | --- |
| options | [<code>BuddyOfferElementProps</code>](#BuddyOfferElementProps) | 

<a name="DataObject"></a>

## DataObject : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [customer] | <code>Object</code> | customer data |
| [policy] | <code>Object</code> | policy data |

<a name="AddToCartFunction"></a>

## AddToCartFunction ⇒ [<code>DataObject</code>](#DataObject)
A callback to be called with a payload object when users opt into the offer.

**Kind**: global typedef  
**Returns**: [<code>DataObject</code>](#DataObject) - the policy payload  
<a name="RemoveFromCartFunction"></a>

## RemoveFromCartFunction ⇒ [<code>DataObject</code>](#DataObject)
A callback to be called with a payload object when users opt out of the offer.

**Kind**: global typedef  
**Returns**: [<code>DataObject</code>](#DataObject) - the policy payload  
<a name="ScrollToTopFunction"></a>

## ScrollToTopFunction : <code>function</code>
A function to override the default scroll to top of offer element behavior when navigating between screens

**Kind**: global typedef  
<a name="OverridesObject"></a>

## OverridesObject : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [webFonts] | <code>Array.&lt;String&gt;</code> | array of url strings linking to web fonts. |
| [styles] | <code>Object</code> | Object Styles object for overriding any css. |
| [colors] | <code>Object</code> | Object for overriding individual color options. |

<a name="ThemeObject"></a>

## ThemeObject : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [baseTheme] | <code>String</code> | <code>&#x27;base&#x27;</code> | The base theme to style with. Can be used simply as a started and overwritten. |
| [palette] | <code>String</code> | <code>&#x27;base&#x27;</code> | The base color scheme to style with. Can be used simply as a started and overwritten. |
| [overrides] | [<code>OverridesObject</code>](#OverridesObject) |  |  |

**Example**  
```js
const theme = {
	baseTheme: 'base',
		palette: 'buddy',
		overrides: {
			webFonts: [
				'https://fonts.googleapis.com/css2?family=Rubik:wght@700&display=swap',
			],
			styles: {
				h1: {
					color: 'var(--color-text-primary)',
					fontFamily: 'Rubik, sans-serif',
					fontSize: '2rem',
					'@media (min-width: 992px)': {
						fontSize: '3rem',
					},
					'&:hover': {
						boxShadow: 'none',
						backgroundColor: '#FBF9EF',
					},
				},
				body: { color: '#0A242D' },
				'.input-text': {
					border: 'none',
					color: '#333333',
				},
			},
			colors: { textPrimary: '#0A242D' },
		},
	};
```
<a name="LogoOverride"></a>

## LogoOverride : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | destination url when users click the trust badge |
| src | <code>String</code> | src of the img for displaying the trust badge |
| [alt] | <code>String</code> | alt text for trust badge image |

<a name="EventObject"></a>

## EventObject : <code>Object</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| eventType | <code>string</code> | the type of user event (eg:'onCheckout') |
| data | <code>object</code> | data object related to the user event. |
| data.timestamp | <code>object</code> | timestamp of the event. All events have a timestamp property. |

<a name="OnUserEventCallback"></a>

## OnUserEventCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| type | [<code>EventObject</code>](#EventObject) | the type of user event (eg:'onCheckout') |

<a name="BuddyOfferElementProps"></a>

## BuddyOfferElementProps : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| ion | <code>String</code> |  | The ion id for the offering. |
| partnerID | <code>String</code> |  | The partner ID required for instantiating the Offer |
| [stage] | <code>String</code> | <code>&quot;STAGING&quot;</code> | toggle's the environment for the Offer Component. Defaults to STAGING. Must be set to "PRODUCTION" before going live. |
| [viewType] | <code>String</code> | <code>&quot;paginated&quot;</code> | establishes how the offer should display to the user. One of: 'paginated', 'single-form' or 'offer-only.' |
| [theme] | [<code>ThemeObject</code>](#ThemeObject) |  | theming object for customizing offer component's styles |
| [data] | [<code>DataObject</code>](#DataObject) |  | Any customer or policy data to pre-fill the offer with. Refer to your individual ION for data structure. |
| [onUserEvent] | [<code>OnUserEventCallback</code>](#OnUserEventCallback) |  | callback function for tracking user behavioral data. Triggers on user interactions such as input focus/blur, in-app navigation, etc. Refer to the docs for more details. |
| [onAddToCart] | [<code>AddToCartFunction</code>](#AddToCartFunction) |  | callback function triggered when users opt into an offer-only offer. |
| [onRemoveFromCart] | [<code>RemoveFromCartFunction</code>](#RemoveFromCartFunction) |  | callback function triggered when users opt out of an offer-only offer. |
| [overrideScrollToTop] | [<code>ScrollToTopFunction</code>](#ScrollToTopFunction) |  | When present, this overrides the default scroll to top of offer element behavior when navigating between screens. |
| [includeCheckout] | <code>boolean</code> |  | toggles whether or not to display the card capture checkout view. Defaults to true. When false, an AddToCart callback must be provided. |
| [logoOverride] | [<code>LogoOverride</code>](#LogoOverride) |  | object for overriding Buddy's trust badge. |

