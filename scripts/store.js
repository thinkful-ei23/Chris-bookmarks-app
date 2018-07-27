'use strict';


const store = (function(){

  const bookmarks = [];
  const adding = false;
  const rating = 4;
  const desc = '';
  const url = '';

  const addbookmark = function(bookmark) {
    this.bookmarks.push(bookmark);
    console.log(this.bookmarks);
  };

  const findbyid = function(id) {
    return this.bookmarks.find(bookmarkobj => bookmarkobj.id === id);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };


  return {
    bookmarks,
    adding,
    rating,
    desc,
    url,
    
    addbookmark,
    findbyid,
    findAndDelete
  };

}());