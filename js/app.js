// Insert URL to variable
const url = 'https://graphql.anilist.co';

// Insert options to function
function option(season) {
  return options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: {
        "page": 1,
        "seasonYear": 2019,
        "season": season
      }
    })
  }
}

// Fetches anilist API and display on load
fetch(url, option(season()))
  .then(response => {
    return response.json();
  })
  .then(data)

// Display season
function displaySeason(season, SEASON) {
  setNavbarItem();
  document.getElementById(season).style.color = '#fff';
  document.getElementById('list').innerHTML = '';
  displaySkeleton()

  // Fetches anilist API
  fetch(url, option(SEASON))
    .then(response => {
      return response.json();
    })
    .then(data)
}

document.getElementById('winter').addEventListener('click', () =>{
  displaySeason('winter', 'WINTER')
})
document.getElementById('spring').addEventListener('click', () =>{
  displaySeason('spring', 'SPRING')
})
document.getElementById('summer').addEventListener('click', () =>{
  displaySeason('summer', 'SUMMER')
})
document.getElementById('fall').addEventListener('click', () =>{
  displaySeason('fall', 'FALL')
})

// Display anime list
function data(data) {
  document.getElementById('list').innerHTML = '';
  for (let i = 0; i < data.data.Page.media.length; i++){
    const media = data.data.Page.media;
    
    // Check if next airing episode is available
    if (data.data.Page.media[i].nextAiringEpisode != null) {
      // Change text content if total episode is available
      if (media[i].episodes != null) {
        var episode = `Episode <span class="item__episode--number">${media[i].nextAiringEpisode.episode}</span> of <span class="item__episode--number">${media[i].episodes}</span> in`;
      } else {
        var episode = `Episode <span class="item__episode--number">${media[i].nextAiringEpisode.episode}</span> in`;
      }

      // Store time and date into variables
      const seconds = data.data.Page.media[i].nextAiringEpisode.timeUntilAiring;
      const minutes = Math.floor((seconds / 60) % 60);
      const hours = Math.floor((seconds / 3600) % 24);
      const days = Math.floor(seconds / (3600 * 24) % 24); 

      let remainingDay = `${days} day`;
      let remainingHour = `${hours} hour`;
      let remainingMinute = `${minutes} min`;

      // Change text content of days, hours and minutes
      if (days > 1) {
        remainingDay += 's';
      }
      if (hours > 1) {
        remainingHour += 's';
      }
      if (minutes > 1) {
        remainingMinute += 's';
      }

      // Display remaining time of item
      if (days > 0 && hours > 0){ //display day and hour
        var countdown = `${remainingDay}, ${remainingHour}`;
      } else if (days > 0 && hours === 0) { // Display day and minute
        var countdown = `${remainingDay}, ${remainingMinute}`;
      } else if (days === 0 && hours > 0){ // Display hour and minute
        var countdown = `${remainingHour}, ${remainingMinute}`;
      } else { // Display minute
        var countdown = `${remainingMinute}`;
      }
      
    } else { 
      var episode = media[i].status.replace(/_/g, ' ');
      var countdown = media[i].season + ' ' +media[i].startDate.year;
    }

    // Check if studio is available
    if (media[i].studios.nodes[0] != null) {
      var studio = media[i].studios.nodes[0].name;
    } else {
      var studio = '';
    }

    // Check if source is available
    if (media[i].source != null) {
      var source = media[i].source.replace('_', ' ');
    } else {
      var source = '';
    }

    // Check if description is available
    if (media[i].description != null){
      var description = media[i].description;
    } else {
      var description = 'No description available.';
    }

    // Check if score is available
    if (media[i].averageScore){
      averageScore = `<i class="far fa-star item__averagescore--icon"></i> ${(media[i].averageScore / 10).toFixed(1)}`;
    } else {
      averageScore = '';
    }

    // Print anime list
    document.getElementById('list').innerHTML += `
      <div class="item">
        <div class="item__thumbnail">
          <img src="${media[i].coverImage.large}" class="item__cover">
          <h2 class="item__title">${media[i].title.romaji}</h2>
        </div>
        <div class="item__about">
          <div class="item__header">
            <div class="item__airing">
              <span class="item__episode">${episode}</span>
              <span class="item__countdown">${countdown}</span>
            </div>
            <div class="item__rating">
              <span class="item__popularity"><i class="far fa-heart item__popularity--icon"></i> #${i+1}</span>
              <span class="item__averagescore"> ${averageScore}</span>
            </div>
          </div>
          <div class="item__information">
            <span class="item__studio">${studio}</span>
            <span class="item__source">Source - ${source}</span>
            <p class="item__description">${description}</p>
          </div>
          <div class="item__footer">
            <span class="item__genre">${media[i].genres.slice(0, 3).join(' - ')}</span>
            <span class="item__expand"><i class="fas fa-expand"></i></span>
          </div>   
        </div>
      </div>
    `
    expandItem();
  }
  // Remove unwanted elements from list (eg. <i>)
  const list = document.getElementById('list');
  for (let i = 0; i < list.children.length; ++i) {
    if (list.children[i].className != 'item') {
      list.children[i].remove();
    }
  }
}

// Fetches github API
fetch('https://api.github.com/repos/trnjonny/animelist/commits')
  .then(response => {
    return response.json();
  })
  .then(data => {
    // Store commits into variable
    let commits = `<i class="fas fa-history"></i> ${data.length} Commit`;

    // Change text content of commits
    if (data.length > 1) {
      commits += 's';
    }
    // Print number of  commits 
    document.querySelector('.footer__github--commits').innerHTML = commits;

    return fetch('https://api.github.com/repos/trnjonny/animelist')
  })
  .then(function(response) {
    return response.json();
  })
  .then(data => {
    // Store stargazer into variable
    let stargazer = `<i class="far fa-star"></i> ${data.watchers} Stargazer`;

    // Change text content of stargazers
    if (data.watchers > 1) {
      stargazer += 's';
    }
    // Print number of stargazers
    document.querySelector('.footer__github--watchers').innerHTML = stargazer;
  })