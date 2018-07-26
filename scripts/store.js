'use strict';


const store = (function(){

  const bookmarks = [];
  const addButton = false;
  const ratingFilter = 5;

  const addbookmark = function(bookmark) {
    this.bookmarks.push(bookmark);
  };

  const findbyid = function(id) {
    return this.bookmarks.find(bookmarkobj => bookmarkobj.id === id);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };


}());