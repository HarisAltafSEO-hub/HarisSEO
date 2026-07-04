// Blog Post Display Script

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));

    if (!postId) {
        window.location.href = 'blog.html';
        return;
    }

    const post = getPostById(postId);

    if (!post) {
        document.body.innerHTML = '<div class="container" style="text-align: center; padding: 100px 0;"><h1>Post not found</h1><a href="blog.html">Back to Blog</a></div>';
        return;
    }

    displayPost(post);
    displayRelatedPosts(post);
    displayRecentPosts();
    displayNavigation(post);
});

// Display Post
function displayPost(post) {
    // Update Meta Tags
    document.title = `${post.title} - Haris Altaf SEO`;
    document.querySelector('meta[name="description"]').setAttribute('content', post.excerpt);
    document.querySelector('meta[name="keywords"]').setAttribute('content', post.tags.join(', '));
    document.getElementById('ogUrl').setAttribute('content', `https://harisaltafseo-hub.github.io/HarisSEO/blog-post.html?id=${post.id}`);
    document.getElementById('ogImage').setAttribute('content', post.image);
    document.getElementById('publishedTime').setAttribute('content', post.date);

    // Post Header
    document.getElementById('postCategory').textContent = post.category;
    document.getElementById('postTitle').textContent = post.title;
    document.getElementById('postAuthor').textContent = post.author;
    document.getElementById('postDate').textContent = formatDate(post.date);
    document.getElementById('postReadTime').textContent = post.readTime;

    // Featured Image
    document.getElementById('postFeaturedImage').innerHTML = `<img src="${post.image}" alt="${post.title}">`;

    // Post Body
    document.getElementById('postBody').innerHTML = post.content;

    // Post Tags
    const tagsHTML = post.tags.map(tag => `
        <a href="blog.html" class="post-tag" onclick="filterByTag('${tag}'); return false;">
            #${tag}
        </a>
    `).join('');
    document.getElementById('postTags').innerHTML = tagsHTML;

    // Generate Table of Contents
    generateTableOfContents();
}

// Display Related Posts
function displayRelatedPosts(currentPost) {
    const relatedPostsContainer = document.getElementById('relatedPosts');
    
    // Find posts with similar tags or category
    const related = blogPosts
        .filter(post => post.id !== currentPost.id && (
            post.category === currentPost.category ||
            post.tags.some(tag => currentPost.tags.includes(tag))
        ))
        .slice(0, 3);

    if (related.length === 0) {
        // If no related posts, show latest posts
        related.push(...blogPosts.filter(post => post.id !== currentPost.id).slice(0, 3));
    }

    const relatedHTML = related.map(post => `
        <article class="related-post-card">
            <div class="related-post-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
            </div>
            <div class="related-post-content">
                <span class="related-post-category">${post.category}</span>
                <h4>
                    <a href="blog-post.html?id=${post.id}">${post.title}</a>
                </h4>
                <span class="related-post-date">${formatDate(post.date)}</span>
            </div>
        </article>
    `).join('');

    relatedPostsContainer.innerHTML = relatedHTML;
}

// Display Recent Posts
function displayRecentPosts() {
    const recentPostsContainer = document.getElementById('recentPosts');
    const recent = blogPosts.slice(0, 5);

    const recentHTML = recent.map(post => `
        <li>
            <a href="blog-post.html?id=${post.id}" class="recent-post-link">
                <strong>${post.title}</strong>
                <small>${formatDate(post.date)}</small>
            </a>
        </li>
    `).join('');

    recentPostsContainer.innerHTML = recentHTML;
}

// Display Post Navigation (Previous/Next)
function displayNavigation(currentPost) {
    const navigationContainer = document.getElementById('postNavigation');
    const currentIndex = blogPosts.findIndex(p => p.id === currentPost.id);
    
    let navHTML = '<div class="nav-posts-inner">';

    // Previous Post
    if (currentIndex > 0) {
        const prevPost = blogPosts[currentIndex - 1];
        navHTML += `
            <div class="nav-post-item prev-post">
                <a href="blog-post.html?id=${prevPost.id}" class="nav-post-link">
                    <span class="nav-label">← Previous Post</span>
                    <span class="nav-title">${prevPost.title}</span>
                </a>
            </div>
        `;
    }

    // Next Post
    if (currentIndex < blogPosts.length - 1) {
        const nextPost = blogPosts[currentIndex + 1];
        navHTML += `
            <div class="nav-post-item next-post">
                <a href="blog-post.html?id=${nextPost.id}" class="nav-post-link">
                    <span class="nav-label">Next Post →</span>
                    <span class="nav-title">${nextPost.title}</span>
                </a>
            </div>
        `;
    }

    navHTML += '</div>';
    navigationContainer.innerHTML = navHTML;
}

// Generate Table of Contents
function generateTableOfContents() {
    const postBody = document.getElementById('postBody');
    const headings = postBody.querySelectorAll('h2');
    const tocContainer = document.getElementById('tableOfContents');

    if (headings.length === 0) {
        tocContainer.parentElement.style.display = 'none';
        return;
    }

    let tocHTML = '<ul>';

    headings.forEach((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;
        tocHTML += `<li><a href="#${id}">${heading.textContent}</a></li>`;
    });

    tocHTML += '</ul>';
    tocContainer.innerHTML = tocHTML;
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

// Newsletter Form
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! You'll receive updates soon.`);
            newsletterForm.reset();
        });
    }
});