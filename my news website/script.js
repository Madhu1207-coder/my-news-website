const apiKey = 'YOUR_NEWS_API_KEY'; // Replace with your actual News API key
const newsContainer = document.getElementById('news-container');

// Function to fetch news by category
async function fetchCategory(category) {
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error:', error);
        newsContainer.innerHTML = '<div class="alert alert-danger">Failed to load news. Please try again later.</div>';
    }
}

// Function to search news
async function searchNews(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search-input').value;
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apiKey}`);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error:', error);
        newsContainer.innerHTML = '<div class="alert alert-danger">Failed to load news. Please try again later.</div>';
    }
}

// Function to display news
function displayNews(articles) {
    if (!articles.length) {
        newsContainer.innerHTML = '<div class="alert alert-info">No news found.</div>';
        return;
    }

    const newsHTML = articles.map(article => `
        <div class="card mb-4 news-card">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${article.urlToImage || 'placeholder.jpg'}" 
                         class="img-fluid rounded-start" 
                         alt="${article.title}"
                         onerror="this.src='placeholder.jpg'">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description || ''}</p>
                        <p class="card-text">
                            <small class="text-muted">
                                Published ${new Date(article.publishedAt).toLocaleDateString()}
                            </small>
                        </p>
                        <a href="${article.url}" class="btn btn-primary" target="_blank">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    newsContainer.innerHTML = newsHTML;
}

// Load default news on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchCategory('general');
});
