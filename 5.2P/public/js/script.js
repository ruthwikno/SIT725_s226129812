fetch('/api/books')
  .then(res => res.json())
  .then(response => {
    const list = document.getElementById('book-list');
    list.innerHTML = '';
    response.data.forEach(book => {
      const li = document.createElement('li');
      li.innerHTML = `<div class="title">${book.title}</div>
                      <div class="author">by ${book.author}</div>
                      <span class="genre">${book.genre}</span>`;
      list.appendChild(li);
    });
  })
  .catch(err => {
    document.getElementById('book-list').textContent = 'Failed to load books.';
    console.error(err);
  });