'use strict';

const bookmarkList = (function(){

  function generatesliElements(bookmark) {
    return ` 
      <li class="js-bookmark-element" data-item-id="bookmark.id">
        <div class="title-container">
          ${bookmark.title}  >> <button>Show more</button>
        </div>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
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

  


  return {
    render
  };

}());