const getAllBtn  = document.getElementById('getAllBtn');
const btnWrap    = document.getElementById('btnWrap');
const bookList   = document.getElementById('book-list');
const bookDetail = document.getElementById('book-detail');
const errorEl    = document.getElementById('error');
const backBtn    = document.getElementById('backBtn');
 
bookDetail.style.display = 'none';
 
getAllBtn.addEventListener('click', async () => {
  errorEl.textContent = '';
  bookList.innerHTML  = '';
  bookDetail.style.display = 'none';
  bookList.style.display   = '';
 
  btnWrap.style.display = 'none';
 
  try {
    const res = await fetch('/api/books');
    const response = await res.json();
 
    response.data.forEach(book => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="book-title-text">${book.title}</span>
        <span class="book-price-tag">$${parseFloat(book.price).toFixed(2)}</span>
        <span class="list-arrow">→</span>
      `;
      li.dataset.id = book._id;
      li.addEventListener('click', () => showDetail(book._id));
      bookList.appendChild(li);
    });
  } catch (err) {
    errorEl.textContent = 'Failed to load books.';
    console.error(err);
  }
});
 
async function showDetail(id) {
  errorEl.textContent = '';
  try {
    const res = await fetch(`/api/books/${id}`);
    const response = await res.json();
    const book = response.data;
 
    document.getElementById('d-genre-badge').textContent = book.genre;
    document.getElementById('d-title').textContent       = book.title;
    document.getElementById('d-author').textContent      = book.author;
    document.getElementById('d-year').textContent        = book.year;
    document.getElementById('d-genre').textContent       = book.genre;
    document.getElementById('d-summary').textContent     = book.summary;
    document.getElementById('d-price').textContent       = parseFloat(book.price).toFixed(2);
 
    bookList.style.display   = 'none';
    btnWrap.style.display    = 'none';
    bookDetail.style.display = 'block';
  } catch (err) {
    errorEl.textContent = 'Failed to load book details.';
    console.error(err);
  }
}
 
backBtn.addEventListener('click', () => {
  bookDetail.style.display = 'none';
  bookList.style.display   = '';
  btnWrap.style.display    = 'none';
});