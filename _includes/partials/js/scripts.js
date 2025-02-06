document.addEventListener('DOMContentLoaded', function() {
  function calculateArticleStats(text) {
    const characterCount = text.length;
    const wordCount = text.trim().split(/\s+/).length;
    const sentenceCount = text.split(/[.!?]+/).length - 1;
    const readingTime = Math.ceil(wordCount / 200);

    return {
      characters: characterCount,
      words: wordCount,
      sentences: sentenceCount,
      readingTime: readingTime
    };
  }

  function fillArticleStats(container, stats) {
    const statsElement = container.querySelector('.article-stats');
    const readingTimeElement = container.querySelector('.reading-time');

    if (statsElement) {
      statsElement.textContent = `${stats.characters} Characters, ${stats.words} Words, ${stats.sentences} Sentences`;
    }

    if (readingTimeElement) {
      readingTimeElement.textContent = `${stats.readingTime} min read`;
    }
  }

  function updateAllStats() {
    const articleItems = document.querySelectorAll('.article-item, .pb-3.mb-0.small.lh-sm.border-bottom.w-100');
    articleItems.forEach(item => {
      const textElement = item.querySelector('.text-post');
      if (textElement) {
        const stats = calculateArticleStats(textElement.textContent);
        fillArticleStats(item.closest('.col-md-3, .col-6') || item, stats);
      }
    });
  }

  updateAllStats();

  const postListGrid = document.getElementById('post-list-grid');
  const postListList = document.getElementById('post-list-list');
  const loadMoreButtons = document.querySelectorAll('.load-more');

  let currentPage = 1;
  let isLoading = false;

  function loadMorePosts(event) {
    event.preventDefault();
    if (isLoading) return;
    isLoading = true;

    currentPage++;
    fetch(`/page-${currentPage}/index.html`)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const newGridPosts = doc.getElementById('post-list-grid').innerHTML;
        const newListPosts = doc.getElementById('post-list-list').innerHTML;
        
        postListGrid.insertAdjacentHTML('beforeend', newGridPosts);
        postListList.insertAdjacentHTML('beforeend', newListPosts);
        
        updateAllStats();
        
        const nextPageLink = doc.querySelector('.load-more');
        if (!nextPageLink) {
          loadMoreButtons.forEach(button => button.style.display = 'none');
        } else {
          loadMoreButtons.forEach(button => button.href = nextPageLink.href);
        }
        
        isLoading = false;
      })
      .catch(error => {
        console.error('Error loading more posts:', error);
        isLoading = false;
      });
  }

  loadMoreButtons.forEach(button => {
    button.addEventListener('click', loadMorePosts);
  });

  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
      loadMorePosts(new Event('click'));
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggleAuthor');
  const authorColumn = document.getElementById('authorColumn');
  const articleColumn = document.getElementById('articleColumn');
  
  function toggleAuthorVisibility() {
    if (authorColumn.classList.contains('d-none')) {
      // Tampilkan author
      authorColumn.classList.remove('d-none');
      authorColumn.classList.add('col-md-3');
      articleColumn.classList.remove('col-md-12');
      articleColumn.classList.add('col-md-9');
      toggleButton.textContent = 'Hide Author';
    } else {
      // Sembunyikan author
      authorColumn.classList.remove('col-md-3');
      authorColumn.classList.add('d-none');
      articleColumn.classList.remove('col-md-9');
      articleColumn.classList.add('col-md-12');
      toggleButton.textContent = 'Show Author';
    }
  }

  toggleButton.addEventListener('click', toggleAuthorVisibility);
});

        const fullscreenBtn = document.getElementById('fullscreenBtn');
        
        fullscreenBtn.addEventListener('click', toggleFullScreen);

        function toggleFullScreen() {
            if (!document.fullscreenElement) {
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) { // Firefox
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari dan Opera
                    document.documentElement.webkitRequestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
                    document.documentElement.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) { // Firefox
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) { // Chrome, Safari dan Opera
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { // IE/Edge
                    document.msExitFullscreen();
                }
            }
        }

        document.addEventListener('fullscreenchange', updateFullscreenButton);
        document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
        document.addEventListener('mozfullscreenchange', updateFullscreenButton);
        document.addEventListener('MSFullscreenChange', updateFullscreenButton);

        function updateFullscreenButton() {
            if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
            } else {
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
          var printButton = document.getElementById('printButton');
          if (printButton) {
            printButton.addEventListener('click', function() {
              window.print();
            });
          }
        });
        
