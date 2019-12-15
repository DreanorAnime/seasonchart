// Display current season
function season() {
  const time = new Date();
  const month = time.getMonth();

  if (month > 8) {
    const nextSeason = document.getElementById('nextSeason');
    nextSeason.style.display = "inline-block";
  }
  
  if (month < 3) { // Display winter
    document.getElementById('winter').style.color = '#fff';
    return 'WINTER';
  } else if (month < 6) { // Display spring
    document.getElementById('spring').style.color = '#fff';
    return 'SPRING';
  } else if (month < 9) { // Display summer
    document.getElementById('summer').style.color = '#fff';
    return 'SUMMER';
  } else { // Display fall
    document.getElementById('fall').style.color = '#fff';
    return 'FALL';
  }
}

// Return default navbar item when not active
function setNavbarItem() {
  const navbarItem = document.querySelectorAll('.navbar__item');
  for (let i = 0; i < navbarItem.length; i++){
    navbarItem[i].style.color = 'rgba(255, 255, 255, 0.5)'
  }
  // Return default sort item
  setFilterItem();
  document.getElementById('popularity').style.color = '#e74c3c'
}

// Return default sort item when not active
function setFilterItem() {
  const filterItem = document.querySelectorAll('.filter__option--item');
  for (let i = 0; i < filterItem.length; i++){
    filterItem[i].style.color = 'rgba(255, 255, 255, 0.5)'
  }
  // Return default navbar item
  const navbarItem = document.querySelectorAll('.navbar__item');
  for (let i = 0; i < navbarItem.length; i++){
    navbarItem[i].style.color = 'rgba(255, 255, 255, 0.5)'
  }
}

// Display skeleton screen
function displaySkeleton() {
  for (let i = 0; i < 9; i++){
    document.getElementById('list').innerHTML += `
      <div class="item--skeleton">
        <div class="item__thumbnail--skeleton">
          <span class="item__title--skeleton"></span>
        </div>
        <div class="item__about--skeleton">
          <span class="item__header--skeleton"></span>
          <span class="item__text--skeleton"></span>
          <span class="item__textarea--skeleton"></span>   
          <span class="item__textarea--skeleton"></span>   
          <span class="item__textarea--skeleton"></span>   
          <span class="item__footer--skeleton"></span> 
        </div>
      </div>
    `
  }
}

// Load skeleton screen on load
window.onload = function() {
  displaySkeleton()
}

// Expand item information
function expandItem() {
  const itemExpand = document.querySelectorAll('.item__expand');
  for (let i = 0; i < itemExpand.length; ++i) {
    itemExpand[i].addEventListener('click', () => {
      // Toggle between classes to expand item information
      itemExpand[i].classList.toggle('item__expand--active');
      document.querySelectorAll('.item')[i].classList.toggle('item--expand');
    })
  }
}