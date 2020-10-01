// Insert date to variable
const date = new Date();

// Insert URL to variable
const url = 'https://graphql.anilist.co';

// Insert options to function
function option(season, year) {
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
        "seasonYear": date.getFullYear() + year,
        "season": season,
        "sort": 'POPULARITY_DESC',
      }
    })
  }
}

// Fetches anilist API and display on load
fetch(url, option(season(), 0))
  .then(response => {
    return response.json();
  })
  .then(data)

// Display season
function displaySeason(season, SEASON) {
  setNavbarItem();

  // Set season color
  let setColor = '';
  if (season === 'winter') {
    setColor = '#3498db';
  } else if (season === 'spring') {
    setColor = '#2ecc71';
  } else if (season === 'summer') {
    setColor = '#f1c40f';
  } else {
    setColor = '#e67e22';
  }

  document.getElementById(season).style.color = setColor;
  document.getElementById('list').innerHTML = '';
  displaySkeleton()

  // Fetches anilist API
  fetch(url, option(SEASON, 0))
    .then(response => {
      return response.json();
    })
    .then(data)
}

// Display next season
function displayNextSeason(season, SEASON) {
  setNavbarItem();

  // Set season color
  let setColor = '';
  if (season === 'winterNext') {
    setColor = '#3498db';
  } else {
    setColor = '#2ecc71';
  }

  document.getElementById(season).style.color = setColor;
  document.getElementById('list').innerHTML = '';
  displaySkeleton()

  // Fetches anilist API
  fetch(url, option(SEASON, 1))
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

document.getElementById('winterNext').addEventListener('click', () =>{
  displayNextSeason('winterNext', 'WINTER')
})
document.getElementById('springNext').addEventListener('click', () =>{
  displayNextSeason('springNext', 'SPRING')
})

// Set options to filter
function setFilter(season, sort) {
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
        "seasonYear": date.getFullYear(),
        "season": season,
        "sort": sort,
      }
    })
  }
}

// Display filter
function displayFilter(sort) {
  setFilterItem();
  document.getElementById('list').innerHTML = '';
  displaySkeleton()

  // Fetches anilist API
  fetch(url, setFilter(season(), sort))
    .then(response => {
      return response.json();
    })
    .then(data)
}

document.getElementById('airing').addEventListener('click', () =>{
  displayFilter('START_DATE')
  document.getElementById('airing').style.color = '#9b59b6';
})
document.getElementById('enddate').addEventListener('click', () =>{
  displayFilter('END_DATE')
  document.getElementById('enddate').style.color = '#9b59b6';
})
document.getElementById('popularity').addEventListener('click', () =>{
  displayFilter('POPULARITY_DESC')
  document.getElementById('popularity').style.color = '#e74c3c';
})
document.getElementById('rating').addEventListener('click', () =>{
  displayFilter('SCORE_DESC')
  document.getElementById('rating').style.color = '#f1c40f';
})
document.getElementById('title').addEventListener('click', () =>{
  displayFilter('TITLE_ROMAJI')
  document.getElementById('title').style.color = '#72abda';
})

// Display anime list
function data(data) {
var dict = {};
var dictkey = 0;
 //console.log(data)
  document.getElementById('list').innerHTML = '';
  for (let i = 0; i < data.data.Page.media.length; i++){
    const media = data.data.Page.media;
    var remainingEpisodes = 0
    // Check if next airing episode is available
    if (data.data.Page.media[i].nextAiringEpisode != null) {
      // Change text content if total episode is available
      if (media[i].episodes != null) {
        var episode = `Episode <span class="item__episode--number">${media[i].nextAiringEpisode.episode}</span> of <span class="item__episode--number">${media[i].episodes}</span> in`;
			if(media[i].episodes - media[i].nextAiringEpisode.episode == 1){
				var remainingEpisodes = ((media[i].episodes - media[i].nextAiringEpisode.episode)) * 7
			}
			if(media[i].episodes - media[i].nextAiringEpisode.episode == 0){
				var remainingEpisodes = 0
			}
			if(media[i].episodes - media[i].nextAiringEpisode.episode > 1){
				var remainingEpisodes = ((media[i].episodes - media[i].nextAiringEpisode.episode) -1) * 7
			}

      } else {
        var episode = `Episode <span class="item__episode--number">${media[i].nextAiringEpisode.episode}</span> in`;
      }
		  
      // Store time and date into variables
      const seconds = data.data.Page.media[i].nextAiringEpisode.timeUntilAiring;
      const minutes = Math.floor((seconds / 60) % 60);
      const hours = Math.floor((seconds / 3600) % 24);
      const days = Math.floor(seconds / (3600 * 24) % 365); 

      let remainingDay = `${days} day`;
      let remainingHour = `${hours} hour`;
      let remainingMinute = `${minutes} min`;

	  let remainingEndDate = `${days + remainingEpisodes} day`;
	  if((days + remainingEpisodes) > 9) {
		  dictkey = `${days + remainingEpisodes}_${media[i].title.romaji}`;
	  }
	  else{
		  dictkey = `0${days + remainingEpisodes}_${media[i].title.romaji}`;
	  }
	
      // Change text content of days, hours and minutes
      if (days > 1) {
        remainingDay += 's';
      }
	   if (days +remainingEpisodes > 1) {
		remainingEndDate += 's';
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
		var lastCountdown =  `${remainingEndDate}, ${remainingHour}`;
      } else if (days > 0 && hours === 0) { // Display day and minute
        var countdown = `${remainingDay}, ${remainingMinute}`;
	    var lastCountdown =  `${remainingEndDate}, ${remainingMinute}`;
      } else if (days === 0 && hours > 0){ // Display hour and minute
		if (remainingEpisodes > 0){
		  var lastCountdown =  `${remainingEndDate}, ${remainingHour}`;
		}
        var countdown = `${remainingHour}, ${remainingMinute}`;
		
      } else { // Display minute
        var countdown = `${remainingMinute}`;
		var lastCountdown = countdown;
      }
      
    } else { 
      var episode = media[i].status.replace(/_/g, ' ');
      var countdown = media[i].season + ' ' +media[i].startDate.year;
	  var lastCountdown = countdown;
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
      var averageScore = `<i class="far fa-star item__averagescore--icon"></i> ${(media[i].averageScore / 10).toFixed(1)}`;
    } else {
      var averageScore = '';
    }

    // Check if popularity is available
    if (media[i].popularity){
      var popularity = `<i class="far fa-heart item__popularity--icon"></i> ${media[i].popularity}`;
      
    } else {
      var popularity = '';
    }

    // Check if genre is available
    if (media[i].siteUrl){
      var anilistUrl = media[i].siteUrl;
    } else {
      var anilistUrl = '';
    }
	   // Print anime list
	dict[dictkey] =
     `
      <div class="item">
        <div href="${anilistUrl}" class="item__thumbnail">
          <img src="${media[i].coverImage.large}" class="item__cover">
          <h2 class="item__title">${media[i].title.romaji}</h2>
          <a href="${anilistUrl}" class="item__link" target="_blank"><i class="fas fa-arrow-circle-right"></i></a>
        </div>
        <div class="item__about">
          <div class="item__header">
            <div class="item__airing">
              <span class="item__episode">${episode}</span>
              <span class="item__countdown">${countdown}</span>
			   <span class="item__episode">Estimated end date in</span>
			  <span class="item__countdown">${lastCountdown}</span>
            </div>
            <div class="item__rating">
              <span class="item__popularity">${popularity}</span>
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

  const ordered = {};
  Object.keys(dict).sort().forEach(function(key) {
  ordered[key] = dict[key];
});


for(var key in ordered) {
	  var value = ordered[key];
	  //console.log(key)
	  document.getElementById('list').innerHTML +=value;
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
