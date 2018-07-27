'use strict';
/* global $ */

const bookmarkList = (function(){

  function generatesliElements(bookmark) {
    let description = '';
    let buttonLabel = 'Show more';
    let visitLink = '';
    let deleteButton = '';
    if (bookmark.expanded === true) {
      description = `<div class="js-desc">${bookmark.desc}</div>`;
      buttonLabel = 'Show less';
      visitLink = `<a href="${bookmark.url}" target="_blank"><button>Visit Site</button></a>`;
      deleteButton = '<button class="js-delete-button">Delete Bookmark</button>';
    }
    return ` 
      <li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">
        <div class="title-container js-title">
          ${bookmark.title}  >> <button class="js-show-more-less">${buttonLabel}</button>
        </div>
        ${description}
        <div>
          ${visitLink}
          ${deleteButton}
        </div>
        <div>${bookmark.rating}</div>
      </li>
    `;
  }

  function generateShoppingBookmarksString(bookmarkList) {
    const bookmark = bookmarkList.map(item => generatesliElements(item));
    return bookmark.join('');
  }

  function render() {
    console.log('render, ran');
    let filteredBookmarks = store.bookmarks.filter(bookmark => bookmark.rating >= store.rating);
    const bookmarkliString = generateShoppingBookmarksString(filteredBookmarks);
    // console.log(bookmarkliString);
    if (store.adding === true) {
      $('.add-bookmark').html(generateaddBookmarkForm());
    }
    else {
      $('.add-bookmark').html('<button class="js-add-bookmark">Add Bookmark</button>');
    }
    $('.js-bookmark-list').html(bookmarkliString);
  }

  function generateaddBookmarkForm() {
    return `
        <div class="title-url">
          <label for="book-title">Title:</label>
          <input type="text" name="title" id="book-title" placeholder="ex: The Great Gatsby" required>
          <label for="url">URL:</label>
          <input type="text" name="url" id="url" placeholder="ex: https://books.com" required>
        </div>
        <label for="book-description">Description: </label>
        <input type="text" name="desc" id="book-description" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, sunt sit provident eaque officia molestiae. Veritatis
        laudantium quis voluptates corporis.">

        <input class="js-add-bookmark" type="submit" value="add" />
        <button class="js-cancel-button">Cancel</button>
        <fieldset>
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
    `;
  }

  function handleRatingFilter() {
    $('.js-rate-form').on('change', function (e) {
      // e.preventDefault();
      const ratingValue = $('#js-rate-order-option').val();
      console.log(ratingValue);
      store.filterRating(ratingValue);
      render();
    });
  }

  // function handleAddBookmarkClick() {
  // console.log('handleadditem, ran');
  // $('.add-bookmark').on('submit', function (e) {
  //   e.preventDefault();
  //     store.adding = true;
  //     render();
  //   });
  // }

  $.fn.extend({
    serializeJson: function serializeJson() {
      const formData = new FormData(this[0]);
      const Objbookmarks = {};
      formData.forEach((val, name) => {
        Objbookmarks[name] = val;
      });
      return JSON.stringify(Objbookmarks);
    }
  });

  function handleBookmarkSubmitForm() {
    console.log('event handle bookmark')
    // might need event delegation here
    $('.add-bookmark').on('submit', function (e) {
      e.preventDefault();
      if (store.adding === false) {
        store.adding = true;
        render();
        return;
      }
      console.log('in hadnesubmitform' + e.target);
      const bookmarkInfo = $(e.target).serializeJson();
      api.createBookmark(bookmarkInfo, response => {
        store.addbookmark(response);
        store.adding = false;
        render();
      });
    });
  }

  // function handleCancelSubmit() {
  //   $('.add-bookmark').on('click', '.js-cancel-button', function(e) {

  //   });
  // }

  function getItemIdFromElement(bookmark) {
    return $(bookmark).closest('.js-bookmark-element').data('bookmark-id');
  }
  function handleShowMoreButton() {
    $('.js-bookmark-list').on('click', '.js-show-more-less', function(e) {
      console.log('show more clicked');
      const id = getItemIdFromElement(e.currentTarget);
      console.log(id);
      const bookmark = store.findbyid(id);
      bookmark.expanded = !bookmark.expanded;
      render();
    });
  }

  function handleDeleteBookmarkClick() {
    $('.js-bookmark-list').on('click', '.js-delete-button', function (e) {
      e.preventDefault();
      const idtoDelete = getItemIdFromElement(e.currentTarget);
      console.log(idtoDelete);
      // const bookmarkObj = $(e.target).serializeJson();
      api.deleteBookmark(idtoDelete, () => { 
        store.findAndDelete(idtoDelete);
        render();
      });

    });
  }

  function bindEventListenrs() {
    handleRatingFilter();
    // handleAddBookmarkClick();
    handleBookmarkSubmitForm();
    handleShowMoreButton();
    handleDeleteBookmarkClick();
  }

  return {
    render,
    bindEventListenrs
  };

}());