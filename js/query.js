const query = `
  query ($page: Int, $seasonYear: Int, $season: MediaSeason, $sort: [MediaSort]){
    Page(page:$page){
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(seasonYear: $seasonYear, season: $season, format: TV, sort: $sort) {
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
        siteUrl
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
