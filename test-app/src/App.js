import BuddyOfferElement from '@buddy-technology/offer-element';

const theme = {
  baseTheme: 'buddy',
  palette: 'buddy',
  overrides: {
    styles: {
      h3: { color: 'red'}
    }
  }
};

const data = {
  customer: {
    dob: '01/01/2000'
  }
}
function App() {
  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'center', margin: '50px 0'}}>
        <h2>
          Dev Mode for Buddy Offer Element. Edit <code>src</code> folder in parent and save to reload.
        </h2>
      </div>
      <BuddyOfferElement
        ion="VIGILANCE_OCCUPATIONAL_ACCIDENT"
        partnerID='p-buddytest'
        viewType='paginated'
        theme={theme}
        data={data}
        stage="DEVELOPMENT"
        logoOverride={{
          src: 'https://my.buddy-testing.insure/buddy_lettermark_W.svg', 
          url: 'https://example.com',
          alt: 'logo'
        }}
        onUserEvent={(eventData) => console.log(eventData)}

        // **Props below are for in-path style implementations where Buddy's checkout is omitted.**
        // includeCheckout={false}
        // onAddToCart={(payload) => console.log(payload)}
        // onRemoveFromCart={(payload) => console.log(payload)}
      />
    </div>
  );
}

export default App;
