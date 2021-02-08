function getLanguageCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function setLanguageCookie(cname, cvalue, exdays, path) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    if (cname == "bnppflanguageselector"
        && document.domain.startsWith("www")) {

        var rootDomain = document.domain;
        //extract root domain

        var splitDomain = document.domain.split('.');
        splitDomain.shift();
        rootDomain = splitDomain.join('.');

        document.cookie = cname + "=" + cvalue + "; " + expires + (";domain=." + rootDomain + "; path=/");
        return;
    }
    document.cookie = cname + "=" + cvalue + "; " + expires + ("; path=/");

}

function deleteLanguageCookie(name, path, domain) {
    if (getLanguageCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

function SetCookiePreselectedLanguage(langText) {

    var cookieName = "bnppflanguageselector";
    var cookieNameStr = getLanguageCookie(cookieName);

    if (cookieNameStr != '') {

        if (document.domain.startsWith("www")) {
            var splitDomain = document.domain.split('.');
            splitDomain.shift();
            var rootDomain = splitDomain.join('.');

            deleteLanguageCookie(cookieName, '/', rootDomain);
            deleteLanguageCookie(cookieName, '/nl', rootDomain);
            deleteLanguageCookie(cookieName, '/fr', rootDomain);
        }

        deleteLanguageCookie(cookieName, '/', document.domain);
        deleteLanguageCookie(cookieName, '/nl', document.domain);
        deleteLanguageCookie(cookieName, '/fr', document.domain);// delete prevously set cookie
    }
    setLanguageCookie(cookieName, langText, 600, ''); // sets new cookie

    checkPreselectedLanguageCookie(); // Redirect to the correct language page
}

function checkPreselectedLanguageCookie() {
    var cookieName = "bnppflanguageselector";
    var cookieNameStr = getLanguageCookie(cookieName);
    var hostUrl;
    if (window.location.port.length > 0 && window.location.port != '80' && window.location.port != '8080') {
        hostUrl = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
    } else {
        hostUrl = window.location.protocol + "//" + window.location.hostname;
    }

    if (window.location.href.indexOf("/fr/") > -1) {
        setLanguageCookie(cookieName, "fr", 600, ''); // sets new cookie
    }
    else if (window.location.href.indexOf("/nl/") > -1) {
        setLanguageCookie(cookieName, "nl", 600, ''); // sets new cookie
    }
    else if (window.location.href.indexOf("/en/") > -1) {
        setLanguageCookie(cookieName, "en", 600, ''); // sets new cookie
    }
    else if (cookieNameStr !== "") {
        if (cookieNameStr === "fr" && !(window.location.pathname.indexOf("/fr") > -1)) {
            window.location.href = hostUrl + "/fr/";
        }
        else if (cookieNameStr === "nl" && !(window.location.pathname.indexOf("/nl") > -1)) {
            window.location.href = hostUrl + "/nl/";
        }
        else if (cookieNameStr === "en" && !(window.location.pathname.indexOf("/en") > -1)) {
            window.location.href = hostUrl + "/en/";
        }
    }
    else {
        window.location.href = hostUrl + "/en/"
    }
}
