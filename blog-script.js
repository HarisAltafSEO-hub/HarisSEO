// Blog Functionality Script

// Constants
const POSTS_PER_PAGE = 3;
let currentPage = 1;
let filteredPosts = [...blogPosts];

// Initialize Blog
document.addEventListener('DOMContentLoaded', () => {
    displayBlogPosts();
    displayCategories();
    displayRecentPosts();
    displayTags();
    setupEventListeners();
});

// Display Blog Posts
function displayBlogPosts() {
    const blogGrid = document.getElementById('blogGrid');
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const postsToDisplay = filteredPosts.slice(startIndex, endIndex);

    if (postsToDisplay.length === 0) {
        blogGrid.innerHTML = '<div class="no-posts"><p>No posts found.</p></div>';
        document.getElementById('blogPagination').innerHTML = '';
        return;
    }

    blogGrid.innerHTML = postsToDisplay.map(post => `
        <article class="blog-card">
            <div class="blog-card-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
                <div class="blog-card-overlay">
                    <a href="blog-post.html?id=${post.id}" class="read-more-btn">Read Full Post</a>
                </div>
            </div>
            <div class="blog-card-content">
                <div class="blog-meta">
                    <span class="blog-category">${post.category}</span>
                    <span class="blog-date">${formatDate(post.date)}</span>
                    <span class="blog-read-time">${post.readTime} min read</span>
                </div>
                <h2 class="blog-title">
                    <a href="blog-post.html?id=${post.id}">${post.title}</a>
                </h2>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-footer">
                    <span class="blog-author">By ${post.author}</span>
                    <a href="blog-post.html?id=${post.id}" class="blog-read-link">Read More →</a>
                </div>
            </div>
        </article>
    `).join('');

    displayPagination();
}

// Display Pagination
function displayPagination() {
    const pagination = document.getElementById('blogPagination');
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = '<div class="pagination">';

    // Previous Button
    if (currentPage > 1) {
        paginationHTML += `<a href="#" class="pagination-btn" onclick="goToPage(${currentPage - 1}); return false;">← Previous</a>`;
    }

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `<span class="pagination-btn active">${i}</span>`;
        } else {
            paginationHTML += `<a href="#" class="pagination-btn" onclick="goToPage(${i}); return false;">${i}</a>`;
        }
    }

    // Next Button
    if (currentPage < totalPages) {
        paginationHTML += `<a href="#" class="pagination-btn" onclick="goToPage(${currentPage + 1}); return false;">Next →</a>`;
    }

    paginationHTML += '</div>';
    pagination.innerHTML = paginationHTML;
}

// Go to Page
function goToPage(page) {
    currentPage = page;
    displayBlogPosts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Display Categories
function displayCategories() {
    const categoriesList = document.getElementById('categoriesList');
    const categories = [...new Set(blogPosts.map(post => post.category))];

    const categoryHTML = categories.map(category => {
        const count = blogPosts.filter(post => post.category === category).length;
        return `
            <li>
                <a href="#" class="category-link" onclick="filterByCategory('${category}'); return false;">
                    ${category} <span class="count">(${count})</span>
                </a>
            </li>
        `;
    }).join('');

    categoriesList.innerHTML = categoryHTML;
}

// Display Recent Posts
function displayRecentPosts() {
    const recentPosts = document.getElementById('recentPosts');
    const recent = blogPosts.slice(0, 5);

    const recentHTML = recent.map(post => `
        <li>
            <a href="blog-post.html?id=${post.id}" class="recent-post-link">
                <span class="recent-post-title">${post.title}</span>
                <span class="recent-post-date">${formatDate(post.date)}</span>
            </a>
        </li>
    `).join('');

    recentPosts.innerHTML = recentHTML;
}

// Display Tags
function displayTags() {
    const tagsList = document.getElementById('tagsList');
    const tags = {};

    blogPosts.forEach(post => {
        post.tags.forEach(tag => {
            tags[tag] = (tags[tag] || 0) + 1;
        });
    });

    const tagHTML = Object.entries(tags)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([tag, count]) => `
            <a href="#" class="tag-badge" onclick="filterByTag('${tag}'); return false;">
                ${tag}
            </a>
        `).join('');

    tagsList.innerHTML = tagHTML;
}

// Filter by Category
function filterByCategory(category) {
    filteredPosts = blogPosts.filter(post => post.category === category);
    currentPage = 1;
    displayBlogPosts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Filter by Tag
function filterByTag(tag) {
    filteredPosts = blogPosts.filter(post => post.tags.includes(tag));
    currentPage = 1;
    displayBlogPosts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Search Posts
function setupEventListeners() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            filteredPosts = [...blogPosts];
        } else {
            filteredPosts = blogPosts.filter(post =>
                post.title.toLowerCase().includes(searchTerm) ||
                post.excerpt.toLowerCase().includes(searchTerm) ||
                post.content.toLowerCase().includes(searchTerm) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }
        
        currentPage = 1;
        displayBlogPosts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    searchInput.addEventListener('input', (e) => {
        if (e.target.value === '') {
            filteredPosts = [...blogPosts];
            displayBlogPosts();
        }
    });
}

// Format Date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Get Post by ID
function getPostById(id) {
    return blogPosts.find(post => post.id === parseInt(id));
}