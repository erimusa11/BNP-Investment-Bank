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

/**
 * [ReformatTwitter Convert twitter string url link into real and valid html link for output has html]
 */
function ReformatTwitter(content) {
    var regex1 = new RegExp('((^|\\s)#(\\w+))', 'g');
    //var regex1 = new RegExp('(([^&#]|#)[\\w\-éèàçâ]*)', 'gi');
    var regex2 = new RegExp('(@[\\w\-éèàçâ]*)', 'gi');
    //var regex2 = new RegExp('(^|\\s)(@\\w+)', 'g');
    var regex3 = new RegExp('((http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(\\w)*)?(\\?(\\w)*)?)', 'g');

    content = content.replace(regex3, "<a href='$1' target='_blank' class='hashtag'>$1</a>");
    content = content.replace(regex1, function (_, $1) {
        if ($1.indexOf("#") != 0) {
            return " <a href='https://twitter.com/search?q=" + encodeURIComponent($1.substr(1)) + "' target='_blank' class='hashtag'>" + $1.substr(1) + "</a>";
        }
        return "<a href='https://twitter.com/search?q=" + encodeURIComponent($1) + "' target='_blank' class='hashtag'>" + $1 + "</a>";
    });
    content = content.replace(regex2, function (_, $1) {
        return "<a href='https://twitter.com/" + encodeURIComponent($1.substr(1)) + "' target='_blank' class='hashtag'>" + $1 + "</a>";
    });

    return content;
}

// Get IE or Edge browser detectIE-version
var detectIEversion = detectIE();

/**
 * detect IE
 * returns detectIE-version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
  var ua = window.navigator.userAgent;

  // Test values; Uncomment to check result …

  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  
  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  
  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
  
  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return detectIE-version number
    return true;
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    return true;
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return detectIE-version number
    return true;
  }

  // other browser
  return false;
}