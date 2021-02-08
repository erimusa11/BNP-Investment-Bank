/*
    Reusable javascripts utility all around project
 */

/**
 * Array.prototype.[method name] allows you to define/overwrite an objects method
 * needle is the item you are searching for
 * this is a special variable that refers to "this" instance of an Array.
 * returns true if needle is in the array, and false otherwise
 */
Array.prototype.contains = function ( needle ) {
   for (var i in this) {
       if (this[i] === needle){
            return true;
       }
   }
   return false;
};