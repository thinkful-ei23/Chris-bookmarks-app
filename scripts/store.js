'use strict';


const store = (function(){

  const bookmarks = [];
  const adding = false;
  const rating = 1;
  const url = '';

  const addbookmark = function(bookmark) {
    this.bookmarks.push(Object.assign(bookmark, {expanded: false}));
  };

  const findbyid = function(id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
    console.log(this.bookmarks);
  };

  const filterRating = function (rating) {
    this.rating = Number(rating);
  };


  return {
    bookmarks,
    adding,
    rating,
    url,
    
    addbookmark,
    findbyid,
    findAndDelete,
    filterRating
  };

}());