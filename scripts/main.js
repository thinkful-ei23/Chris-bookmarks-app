'use strict';

$(document).ready(function () {

// add getbook mark API
  bookmarkList.bindEventListenrs();
  api.getBookmarkInfo(bookmarks => {
    bookmarks.forEach(element => store.addbookmark(element));
    bookmarkList.render();
  });
  console.log('Hi');
});