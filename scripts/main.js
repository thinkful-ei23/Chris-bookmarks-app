'use strict';
/* global $, api, bookmarkList */

$(document).ready(function () {

// call getbookmarkInfo API to reneder list when DOM loads
  bookmarkList.bindEventListenrs();
  api.getBookmarkInfo(bookmarks => {
    bookmarks.forEach(element => store.addbookmark(element));
    bookmarkList.render();
  });
});