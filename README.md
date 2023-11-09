# Buddy Offer Component
---
React component for adding [Buddy's](https://buddy.insure) Insurance Gateway

## Requirements
Contact [Buddy](mailto:partners@buddy.insure) to obtain a `partnerID` and compatible `ions` for your specific use case.

---
## Installation
Install it from npm and include it in your React build process

`npm install @buddy-technology/offer-component`
  or 
`yarn add @buddy-technology/offer-component`

---
## Basic Usage
```javascript
import React from 'react';
import BuddyOfferElement from '@buddy-technology/offer-component';

function App() {
  return (
    <div id="app">
      <h1>My App</h1>
      <BuddyOfferElement ion="MY_ION" partnerID="my-partner-id" stage="staging" />
    </div>
  );
}
export default App;
```
---
## Props

| Option Name | Type | Default | Description
| --- | --- | --- | --- |
| *partnerID | string | | The partnerID assigned to you from Buddy |
| *ion | string | | The ion ID for the product to be presented |
| stage | enum | "STAGING" | One of: `"STAGING"`, `"PRODUCTION"`. Set to `"STAGING"` (default) for testing and development. |
| viewType | enum | `"paginated"` | Sets how the offer element is displayed. One of: `"paginated"`, `"single-form"`, `"offer-only"`. _See [View types](#view-types) for details._|
| data | object | | Customer or policy data to pre-load the offer with. Refer to specific ION documentation for the data structure.  |
| theme | object | |The [theme](#styling) object for passing in styles and color palettes |
| onUserEvent | function | | A callback for tracking user behavioral data. See [Capturing Data](#capturing-data) for details. |
| includeCheckout | boolean | `true` | Toggles whether to render the secure checkout.  |
| onAddToCart | function | | The callback fired when a user opts into an offer. See Buddy's Partner API docs for details on how to complete the transaction.|
| onRemoveCart | function | | The callback fired when a user opts out of the offer. |
_*required_

---
## View Types

Buddy's Offer Element comes in three different view types:

- __paginated__ (default) - A paginated form where users click through to the next section.
- __single form__ - A single form where all fields are displayed in the same, scrollable view.
- __offer only__ -  View for displaying just the insurance offer with a quote and checkbox that fires `onAddToCart` when checked and `onRemoveFromCart` when unchecked (see [For full stack apps](#for-full-stack-apps) for more info). 
**NOTE**: Offer-Only implementations are meant to be rendered in a controlled environment with necessary data passed into it, and will require a payment integration for checkout (see Buddy's [Partner API docs](https://buddyinsurance.stoplight.io/docs/partner-api-documentation/ZG9jOjE1NDc1MzQx)). If any fields are missing or invalid, a step-through form will render with the individual views that include the needed fields. Views with satisfied fields will be skipped. Once users rectify any needed info, they will land on the offer only screen. 

---
## Checkout
### For client-side only apps

The embed widget's default mode includes a full checkout. Customers can go through the entire flow through to a secure purchase and policies will be delivered directly to their inbox.

To explicitly set the widget to include checkout, set the `includeCheckout` property to `true`.
### For full stack apps

In server side and full-stack applications where customers are already purchasing other products, it's best to exclude the secure checkout built into the widget so customers can purchase their insurance alongside any other products as part of a single transaction. A backend integration (See Buddy's [Partner API docs](https://buddyinsurance.stoplight.io/docs/partner-api-documentation/ZG9jOjE1NDc1MzQx)) is required in order to complete the transaction.

To use this mode, set `includeCheckout` to `false`, or set viewType to `offer-only`. 

When users opt in, the `onAddToCart` callback is fired with the completed application object. If a user opts out, `onRemoveFromCart` will be called.

```javascript
// simple paginated example to collect data
import React from 'react';
import BuddyOfferElement from '@buddy-technology/offer-component';
import { handleAddToCart, handleRemoveFromCart } from './myApi';

function App() {
  const handleAddToCart = (payload) => {
    handleAddToCart(payload)
  };

  const handleRemoveFromCart = (payload) => {
    handleRemoveFromCart(payload)
  };

  return (
    <div id="app">
      <h1>My App</h1>
      <BuddyOfferElement
        ion="MY_ION"
        partnerID="my-partner-id"
        viewType="paginated"
        includeCheckout={false}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        stage="PRODUCTION"
      />
    </div>
  );
}
export default App;
```

```javascript
// example using offer-only and passing in customer/policy data
import React from 'react';
import BuddyOfferElement from '@buddy-technology/offer-component';
import { handleAddToCart, handleRemoveFromCart } from './myApi';

// passing down data as prop in this example
function App({ userAndPolicyData }) {
  const handleAddToCart = (payload) => {
    handleAddToCart(payload)
  };

  const handleRemoveFromCart = (payload) => {
    handleRemoveFromCart(payload)
  };

  return (
    <div id="app">
      <h1>My App</h1>
      <BuddyOfferElement
        ion="MY_ION"
        partnerID="my-partner-id"
        viewType="offer-only"
        data={userAndPolicyData} // data is passed in, if any fields are invalid, they will be displayed to user to rectify before purchasing.
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        stage="PRODUCTION"
      />
    </div>
  );
}
export default App;
```
---
## Pre-filling Data


It's a best practice to pass in any customer and policy data that has already been collected to optimize user experience. Unless viewType is `offer-only`, users will be able to see and edit any data that is passed.

Data follows the application object structure. Refer to your specific ION (or offering) documentation.

```javascript
import React from 'react';
import BuddyOfferElement from '@buddy-technology/offer-component';

function App() {
  const data = {
    customer: {
      firstName: 'customer first name',
      lastName: 'customer last name',
      address: {
        line1: 'street address',
        city: 'city',
        state: 'state',
        zip: 'zip',
      }
    },
    policy: {
      startDate: '12/31/2022',
    }
  };

  return (
    <div id="app">
      <h1>My App</h1>
      <BuddyOfferElement
        ion="MY_ION"
        partnerID="my-partner-id"
        data={data}
        stage="PRODUCTION"
      />
    </div>
  );
}
export default App;
```
---
## Styling

Buddy's offer element supports extensive visual customization, allowing you to seamlessly match the design of your site with the theme prop.

1. Pick a base theme and color palette:
  Quickly get running by picking the prebuilt theme and palette that most closely resembles your website.

2. Customize even further by adding [overrides](#overrides):
   Virtually any property can be further customized using [CSS object styling](https://emotion.sh/docs/object-styles).

```javascript
import React from 'react';
import BuddyOfferElement from '@buddy-technology/offer-component';

function App() {
  const customTheme = {
    baseTheme: "base",
    palette: "buddy",
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
        }
      },
      colors: { textPrimary: '#0A242D' },
    },
  };

  return (
    <div id="app">
      <h1>My App</h1>
      <BuddyOfferElement
        ion="MY_ION"
        partnerID="my-partner-id"
        theme={customTheme}
        stage="PRODUCTION"
      />
    </div>
  );
}
export default App;
```

### Color Palettes
We currently offer two color palettes to start with (with more coming soon!).

__Base__:

    primary: '#000000',
    secondary: '#254E70',
    tertiary: '#848484',
    negative: '#e45b78',
    positive: '#A3D9B1',
    textPrimary: '#000',
    textSecondary: '848484',
    backgroundPrimary: '#fff',
    backgroundSecondary: '#7d8387',

__Buddy__:

	primary: '#DC5648',
	secondary: '#0A242D99',
	tertiary: '#46460E33',
	negative: '#D62719',
	positive: '#A3D9B1',
	textPrimary: '#0A242D',
	textSecondary: '#0A242D99',
	backgroundPrimary: 'linear-gradient(#D6F1F2, #F8F6D2)',
	backgroundSecondary: '#FBF9EF',

### Overrides

The overrides object consists of three major properties:

`webFonts`: An array of string urls for web fonts. _Note: if using web fonts, it is still necessary to set the `fontFamily` property on any elements using that particular webfont._

`styles`: A CSS styles object with any CSS overrides on a given theme. Styles will overwrite existing theme styles. Media queries and child selectors can be accessed as a string key name, and nested within a given selector (see the example above). [Component classes](#classes-and-components) can also be manipulated within the styles object.

`colors`: A colors object will override any of the color properties in the table below:

| Key  | Where its used |
| --- | --- |
| primary | graphics, call-outs, primary buttons  |
| secondary | focused borders, accents |
| tertiary | inactive accents |
| negative | error messages (note: this is currently set to "accessible red." be mindful of accessibility when overriding this property) |
| positive | success messages |
| textPrimary | primary body copy |
| textSecondary | secondary copy, accents |
| backgroundPrimary | main background (containers) |
| backgroundSecondary | secondary backgrounds |

### Classes and Components

Some components can be directly modified by accessing their class names in the theme object. See the full list of component class names below.

```javascript
  var customTheme = {
    style: {
      h1: { fontSize: 36 },
      '.button-primary': {
        // custom styles
      },
    },
  };

```

**Available Classes**

- card
- button-primary
- button-secondary
- input-text
- input-invalid
- input-select
- input-label
- input-label-invalid
- offer-container
- field-container
- view-container

---



## Capturing data
You can hook any CRM or analytics platform into the Buddy offer-element using the `onUserEvent` hook.

`onUserEvent(eventType: string, data: object) ⇒ void`

The `onUserEvent` hook property allows you to pass in a custom function to embed your analytics of choice. Simply pass in a callback to the `onUseEvent` option, and you will get the following 2 parameters:

- **eventType:** string denoting the type of event that fired (ex: "onViewChange") 
- **data**: object with internal data regarding the event. All data objects include a timestamp property.

### Quick example

```javascript
import React from 'react';
import BuddyOfferElement from '@buddy-technology/offer-component';

function App() {
  const handleUserEvent = (payload) => {
    // logs an object with eventType and data to the console
    console.log(payload)
  };

  return (
    <div id="app">
      <h1>My App</h1>
      <BuddyOfferElement
        ion="MY_ION"
        partnerID="my-partner-id"
        viewType="offer-only"
        onUserEvent={handleUserEvent}
        stage="PRODUCTION"
      />
    </div>
  );
}
export default App;
```

### Event types and data fired:
We capture several user-driven events and each has different available pieces of data associated with it. Look closely at the list below to determine which events you want to capture and how to use the data.

##### `onViewChange`

Triggers when users click to a new screen in a paginated view mode.

_data returned_
| Name      | Type   | Description                                             |
|-----------|--------|---------------------------------------------------------|
| `viewId`    | string | the id of the current view                              |
| `timestamp` | number | the timestamp when the event occurred in milliseconds   |


##### `onScrollToView`

Triggers when or scroll to a section in single-page view mode.

_data returned_

| Name      | Type   | Description                                             |
|-----------|--------|---------------------------------------------------------|
| `viewId`    | string | the id of the current view                              |
| `timestamp` | number | the timestamp when the event occurred in milliseconds   |

##### `onQuote`

Triggers when the app displays retrieves a quote for the policy

_data returned_

| Name      | Type   | Description                                                                       |
|-----------|--------|-----------------------------------------------------------------------------------|
| `pricing`   | number | if successful, the price of the policy                                            |
| `error`     | string | if unsuccessful, a message explaining the type of error encountered when attempting to quote |
| `timestamp` | number | the timestamp when the event occurred in milliseconds                           |


##### `onCheckout`

Triggers during the check out process

_data returned_

| Name               | Type   | Description                                                                       |
|--------------------|--------|-----------------------------------------------------------------------------------|
| `checkoutStatus` | enum   | one of `['start', 'success', 'error']`                                               |
| `premium`        | number | the total premium of the purchase                                                 |
| `error`          | string | if unsuccessful, a message explaining the type of error encountered              |
| `timestamp`      | number | the timestamp when the event occurred in milliseconds                            |

		
##### `onFocus`

Triggers when an input is focused

_data returned_

| Name             | Type   | Description                                             |
|------------------|--------|---------------------------------------------------------|
| `elementId`    | string | the id of the invalid field/input                       |
| `timestamp`    | number | the timestamp when the event occurred in milliseconds   |


##### `onBlur`

Triggers when an input is blurred

_data returned_

| Name             | Type   | Description                                             |
|------------------|--------|---------------------------------------------------------|
| `elementId`    | string | the id of the invalid field/input                       |
| `timestamp`    | number | the timestamp when the event occurred in milliseconds   |

##### `onRadioSelection`

Triggers when a radio button is selected

_data returned_

| Name        | Type   | Description                                             |
|-------------|--------|---------------------------------------------------------|
| `elementId` | string | the id of the invalid field/input                      |
| `value`     | any    | the value of the selected radio                         |
| `timestamp` | number | the timestamp when the event occurred in milliseconds   |

##### `onSlide`

Triggers when a slider input is changed

_data returned_

| Name        | Type   | Description                                             |
|-------------|--------|---------------------------------------------------------|
| `elementId` | string | the id of the invalid field/input                      |
| `value`     | any    | the value of the selected radio                         |
| `timestamp` | number | the timestamp when the event occurred in milliseconds   |

##### `onCheckboxSelection`

Triggers when a checkbox is selected

_data returned_

| Name         | Type    | Description                                             |
|--------------|---------|---------------------------------------------------------|
| `elementId` | string  | the id of the invalid field/input                       |
| `checked`   | boolean | whether the box is checked/unchecked                    |
| `value`     | string  | the label of the selected checkbox                      |
| `timestamp` | number  | the timestamp when the event occurred in milliseconds   |

##### `onBlur`

Triggers when an input is blurred

_data returned_

| Name             | Type   | Description                                             |
|------------------|--------|---------------------------------------------------------|
| `elementId`    | string | the id of the invalid field/input                       |
| `timestamp`    | number | the timestamp when the event occurred in milliseconds   |

##### `onValidationError`

Triggers when an input is triggered as invalid

_data returned_

| Name                 | Type   | Description                                             |
|----------------------|--------|---------------------------------------------------------|
| `elementId`        | string | the id of the invalid field/input                       |
| `validationError`  | string | the type of validation error encountered                |
| `timestamp`        | number | the timestamp when the event occurred in milliseconds   |

##### `onExternalLink`

Triggers when an input is triggered as invalid

_data returned_

| Name                 | Type   | Description                                             |
|----------------------|--------|---------------------------------------------------------|
| `externalLinkUrl`  | string | the url of the link                                     |
| `timestamp`        | number | the timestamp when the event occurred in milliseconds   |

### Google Analytics example

```javascript
import React from 'react';
import BuddyOfferElement from '@buddy-technology/offer-component';

function App() {
  /* This is an example of how you could use these events
  your usage may vary depending on your analytics systems */

  const handleUserEvent = (e) => {
    // this block shows a condition looking for checkout and success, 
    // this is a completed purchase using the GA 'purchase' event for conversion
    if (e.eventType == "onCheckout" && e.data.checkoutStatus == "success") {
      gtag("event", "purchase", {
        transaction_id: e.data.orderID,
        value: e.data.premium,
        items: [{
          item_id: "SKU_12345",
          item_name: '${ion}',
          currency: "USD",
          price: e.data.premium,
        }]
      });
    }

    // This block tracks which views are displayed 
    // this is configured to use the built-in GA event 'screen_view'
    if (e.eventType == "onViewChange") {
      gtag('event', 'screen_view', {
        'app_name': 'in-offer-element',
        'screen_name': e.data.viewID
      });
    }
    // This block tracks when quotes are made
    // This is configured to use a custom event and captures a custom dimension
    if (e.eventType == "onQuote") {
      gtag('event', 'quote', {
        'app_name': 'in-offer-element',
        'price': e.data.pricing,
      });
    }
  }
  };

  return (
    <div id="app">
      <h1>My App</h1>
      <BuddyOfferElement
        ion="MY_ION"
        partnerID="my-partner-id"
        viewType="offer-only"
        onUserEvent={handleUserEvent}
        stage="PRODUCTION"
      />
    </div>
  );
}
export default App;
```
