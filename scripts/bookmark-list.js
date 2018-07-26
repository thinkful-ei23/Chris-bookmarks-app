'use strict';

const bookmarkList = (function(){

  function generatesliElements(bookmark) {

    return ` 
      <li class="js-bookmark-element" data-item-id="bookmark.id">
        <div class="title-container">
          ${bookmark.title}  >> <button>Show more</button>
        </div>
      
    `;
  }

  function generateShoppingBookmarksString(bookmarkList) {
    console.log('generateshopbookmarkString, ran');
    const bookmark = bookmarkList.map(item => generatesliElements(item));
    console.log(bookmark);
    return bookmark.join('');
  }

  function render() {
    console.log('render, ran')
    const bookmarkliString = generateShoppingBookmarksString(store.bookmarks);
    console.log(bookmarkliString);
    $('.js-bookmark-list').html(bookmarkliString);
  }

  function generateaddBookmarkForm() {
    return `
      <form action="" class="js-add-form">
        <div class="title-url">
          <input type="text" name="title" id="title" placeholder="ex: The Great Gatsby" required>
          <input type="text" name="webURL" id="url" placeholder="ex: https//books.com">
        </div>
        <input type="text" name="description" id="description" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, sunt sit provident eaque officia molestiae. Veritatis
        laudantium quis voluptates corporis.">

        <button class="js-accept-button">Accept</button>
        <button class="js-cancel-button">Cancel</button>
        <fieldset>
          <input type="radio" id="rating-0" name="rating" value="0" class="star-cb-clear" />
          <label for="rating-0">0</label>
          <input type="radio" id="rating-1" name="rating" value="1" />
          <label for="rating-1">1</label>
          <input type="radio" id="rating-2" name="rating" value="2" />
          <label for="rating-2">2</label>
          <input type="radio" id="rating-3" name="rating" value="3" />
          <label for="rating-3">3</label>
          <input type="radio" id="rating-4" name="rating" value="4" checked="checked" />
          <label for="rating-4">4</label>
          <input type="radio" id="rating-5" name="rating" value="5" />
          <label for="rating-5">5</label>
        </fieldset>
      </form>
    `;
  }

  function handleAddBookmarkClick() {
    console.log('handleadditem, ran');
    $('.js-add-bookmark').click(function (e) {
      e.preventDefault();
      $('.js-rate-add-form').html(generateaddBookmarkForm());
      render();
    });
  }

  function bindEventListenrs() {
    handleAddBookmarkClick();
  }

  return {
    render,
    bindEventListenrs
  };

}());