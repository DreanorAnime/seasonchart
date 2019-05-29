// Store query to variable
const query = `
  query ($page: Int, $seasonYear: Int, $season: MediaSeason){
    Page(page:$page){
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(seasonYear: $seasonYear, season: $season, format: TV, sort: POPULARITY_DESC) {
        id
        averageScore
        coverImage {
          large
          medium
        }
        description
        episodes
        endDate {
          year
          month
          day
        }
        genres
        nextAiringEpisode {
          id
          airingAt
          timeUntilAiring
          episode
        }
        popularity
        season
        source
        startDate {
          year
          month
          day
        }
        status
        studios(isMain: true) {
          nodes {
            id
            name
          }
        }
        title{
          romaji
        }
      }
    }
  }
`;

// Store variables to object item
const variables = {
  "page": 1,
  "seasonYear": 2019,
  "season": "SPRING"
};

// Insert URL to variables
const url = 'https://graphql.anilist.co',
  options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: variables
    })
};

// Fetches anilist API
fetch(url, options)
  .then(response => {
    return response.json();
  })
  .then(data)

function data(data) {
  // Display anime list
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
            <span class="item__source">Source - ${media[i].source.replace('_', ' ')}</span>
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
}

// Expand item information
function expandItem() {
  const itemExpand = document.querySelectorAll('.item__expand');
  for (let i = 0; i < itemExpand.length; ++i) {
    itemExpand[i].addEventListener('click', () => {
      // Toggle between classes to expand item information
      itemExpand[i].classList.toggle('item__expand--active');
      document.querySelectorAll('.item')[i].classList.toggle('item--expand');
      document.querySelectorAll('.item__cover')[i].classList.toggle('item__cover--expand');
      document.querySelectorAll('.item__title')[i].classList.toggle('item__title--expand');
    })
  }
}