async function loadRecommendations() {
  try {
    const response = await fetch('travelRecommendations.json');
    const data = await response.json();
    displayRecommendations(data);
  } catch (error) {
    console.error('Error loading recommendations:', error);
  }
}

// Function to display the recommendations on the page
function displayRecommendations(recommendations) {
  const recommendationsList = document.getElementById('recommendationsList');
  recommendationsList.innerHTML = '';

  recommendations.forEach(recommendation => {
    const recommendationDiv = document.createElement('div');
    recommendationDiv.classList.add('recommendation');
    recommendationDiv.setAttribute('data-tags', recommendation.tags.join(',').toLowerCase());

    recommendationDiv.innerHTML = `
      <h3>${recommendation.destination}</h3>
      <p>${recommendation.description}</p>
      <img width="400" height="200" class="rounded float-right" src="${recommendation.image}">
    `;

    recommendationsList.appendChild(recommendationDiv);
  });
}

// Function to search recommendations based on input
function searchRecommendations() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const recommendations = document.querySelectorAll('.recommendation');
  
  recommendations.forEach((recommendation) => {
    const tags = recommendation.getAttribute('data-tags').toLowerCase();
    if (tags.includes(input)) {
      recommendation.style.display = 'block';
    } else {
      recommendation.style.display = 'none';
    }
  });
}

// Load recommendations when the page is ready
window.onload = loadRecommendations;

function clearInput() {
  document.getElementById('clearButton').value = ''; // Clears the input field
}
