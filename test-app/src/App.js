import BuddyOfferElement from '@buddy-technology/offer-element';

function App() {
  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'center', margin: '50px 0'}}>
        <h2>
          Dev Mode for Buddy Offer Element. Edit <code>src</code> folder in parent and save to reload.
        </h2>
      </div>
      <BuddyOfferElement ion="BOOST_PET" partnerID='wrb'/>
    </div>
  );
}

export default App;
