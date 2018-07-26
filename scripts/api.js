'use strict';

const api = (function(){

  const BASE_URL = ' https://thinkful-list-api.herokuapp.com';

  const getBookmarkInfo = function(callback) {
    $.getJSON(`${BASE_URL}/christopher/items`, callback);
  };

  

}());