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

  const updateBookmark = function (stringify, callback) {
    $.ajax({
      url: BASE_URL,
      method: 'PATCH',
      data:stringify,
      success: callback
    });
  };

  const deleteBookmark = function (stringify, callback) {
    
    $.ajax({
      url: BASE_URL,
      method: 'DELETE',
      data: stringify,
      success: callback
    });
  };
  return {
    getBookmarkInfo,
    createBookmark,
    deleteBookmark
  };

}());