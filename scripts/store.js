'use strict';


const store = (function(){

  const bookmarks = [];
  const adding = false;
  const rating = 4;
  // const desc = '';
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

  // const filterRating = function () {
  //   this.bookmarks.rating = !this.rating;
  // }


  return {
    bookmarks,
    adding,
    rating,
    // desc,
    url,
    
    addbookmark,
    findbyid,
    findAndDelete
  };

}());