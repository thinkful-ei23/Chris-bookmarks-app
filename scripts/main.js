'use strict';

$(document).ready(function () {

// add getbook mark API
  bookmarkList.bindEventListenrs();
  bookmarkList.render();
  api.getBookmarkInfo(bookmarks => {
    bookmarks.forEach(element => store.addbookmark(element));
  });
});