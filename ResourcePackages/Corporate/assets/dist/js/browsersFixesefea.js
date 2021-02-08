(function ($) {
    $(function () {

        // Solve "startsWith" function problem in IE 
        if (!String.prototype.startsWith) {
            String.prototype.startsWith = function (searchString, position) {
                position = position || 0;
                return this.indexOf(searchString, position) === position;
            };
        }

    });
})(jQuery);