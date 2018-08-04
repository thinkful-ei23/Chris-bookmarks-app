'use strict';
/* global $, store, api */

const bookmarkList = (function(){

  function generatesliElements(bookmark) {
    let description = '';
    let buttonLabel = 'Show more';
    let visitLink = '';
    let deleteButton = '';
    if (bookmark.expanded === true) {
      description = `<div class="desc-container js-desc"><label for="desc">Description: </label> <p>${bookmark.desc}</p> </div>`;
      buttonLabel = 'Show less';
      visitLink = `<a href="${bookmark.url}" target="_blank"><button>Visit Site</button></a>`;
      deleteButton = '<button class="js-delete-button">Delete Bookmark</button>';
    }
    let starRating = `<span class="fa fa-star star1"></span>
      <span class="fa fa-star star2"></span>
      <span class="fa fa-star star3"></span>
      <span class="fa fa-star star4"></span>
      <span class="fa fa-star star5"></span>
      `;
    return ` 
      <li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">
        <div class="title-container js-title"> ${bookmark.title}  >> <button class="js-show-more-less">${buttonLabel}</button></div>
        ${description}
        <div class="visit-delete">${visitLink} ${deleteButton}</div>
        <div class="stars js-stars rating-${bookmark.rating}">${starRating}</div>
      </li>
    `;
  }

  function generateShoppingBookmarksString(bookmarkList) {
    const bookmark = bookmarkList.map(item => generatesliElements(item));
    return bookmark.join('');
  }

  function render() {
    let filteredBookmarks = store.bookmarks.filter(bookmark => bookmark.rating >= store.rating);
    const bookmarkliString = generateShoppingBookmarksString(filteredBookmarks);
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
        <button type="button" class="js-cancel-button">Cancel</button>

        <fieldset>
          <legend>How would you rate it?</legend>
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
      const ratingValue = $('#js-rate-order-option').val();
      store.filterRating(ratingValue);
      render();
    });
  }

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

  function handleBookmarkAddSubmitForm() {
    console.log('event handle bookmark');
    $('.add-bookmark').on('submit', function (e) {
      e.preventDefault();
      if (store.adding === false) {
        store.adding = true;
        render();
        return;
      }
      const bookmarkInfo = $(e.target).serializeJson();
      api.createBookmark(bookmarkInfo, response => {
        store.addbookmark(response);
        store.adding = false;
        render();
      });
    });
  }

  function handleBookmarkCancelClick() {
    console.log('event handle bookmark')
    // might need event delegation here
    $('.add-bookmark').on('click', '.js-cancel-button', function (e) {
      if (store.adding === true) {
        store.adding = false;
        render();
        return;
      }
    });
  }

  function getItemIdFromElement(element) {
    console.log('inside get item id from element');
    console.log(element);
    return $(element).closest('.js-bookmark-element').data('bookmark-id');
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
      api.deleteBookmark(idtoDelete, () => { 
        store.findAndDelete(idtoDelete);
        render();
      });

    });
  }

  function bindEventListenrs() {
    handleRatingFilter();
    handleBookmarkAddSubmitForm();
    handleBookmarkCancelClick();
    handleShowMoreButton();
    handleDeleteBookmarkClick();
    // handleErrors();
  }

  return {
    render,
    bindEventListenrs
  };

}());