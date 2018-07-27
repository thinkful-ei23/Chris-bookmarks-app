'use strict';
/* gloabal $ */

const api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/christopher/bookmarks';

  const getBookmarkInfo = function(callback) {
    $.getJSON(BASE_URL, callback);
  };

  const createBookmark = function (stringify, callback) {
    console.log(stringify);
    $.ajax({
      url: BASE_URL,
      method: 'POST',
      contentType: 'application/json',
      data: stringify,
      success: callback
    });
  };
  // for extension to edit inputs and pass to api for change and filter?
  const updateBookmark = function (stringify, callback) {
    $.ajax({
      url: BASE_URL,
      method: 'PATCH',
      contentType: 'applocation/json',
      data: stringify,
      success: callback
    });
  };

  const deleteBookmark = function (id, callback) {
    
    $.ajax({
      url: BASE_URL + '/' +id,
      method: 'DELETE',
      success: callback
    });
  };
  return {
    getBookmarkInfo,
    createBookmark,
    updateBookmark,
    deleteBookmark
  };

}());