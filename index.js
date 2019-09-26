'use strict';

function displayResults(responseJson, maxResults) {
    console.log(responseJson);
    // iterate through the data array
    for (let i = 0; i < responseJson.data.length & i<maxResults; i++){
    //array, add a list item to the results 
    //list with the fullName, description, url
    $('#results-list').append(
      `<h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].url}</p>`
    )};
    //display the results section  
    $('#results').removeClass('hidden');
};

function getParksInfo(searchURL, maxResults=10) {
  for(let i = 0; i < searchURL.length; i++){
    console.log(`https://developer.nps.gov/api/v1/parks?stateCode=${searchURL[i]}&api_key=EeQVlcDqfV6U3IonkVKltTzZz45LICHii2vRdujG`);
    fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${searchURL[i]}&api_key=EeQVlcDqfV6U3IonkVKltTzZz45LICHii2vRdujG`)
      .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
  }
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('#results-list').empty();
    const searchTerm = $('select').val();
    const maxResults = $('#js-max-results').val();
    console.log(searchTerm);
    getParksInfo(searchTerm, maxResults);
    });
}
$(watchForm);






