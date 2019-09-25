'use strict';






function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length & i<maxResults; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].url}</p>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

  
 function getParksInfo(searchURL, maxResults=10) {
  
    console.log(searchURL);
  
  
  
  
  fetch(searchURL)
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

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('select').val();
    const maxResults = $('#js-max-results').val();
    const searchURL = `https://developer.nps.gov/api/v1/parks?stateCode=${searchTerm}&api_key=EeQVlcDqfV6U3IonkVKltTzZz45LICHii2vRdujG`;
    getParksInfo(searchURL, maxResults);
  });
}

$(watchForm);






