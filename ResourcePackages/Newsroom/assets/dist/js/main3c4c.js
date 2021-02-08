function GetCount(language,itemType,itemsCount,target) {

    var url = '/restapi/' + itemType + '/' + language + '/count';
    //console.log(url);
    $.ajax({
        url: url,
        type: 'get',
        contentType: 'application/json',
        success: function (result) {
            //console.log("count: " + result.Count);
            var count = parseInt(result.Count);

            if (count > itemsCount) {
                $("#" + target).show();
            }
        }
    });
    window.BNPtoolbox.bindShareButton();
}

function GetItems(language,itemType,skip,take,target) {
    var url = '/restapi/' + itemType + '/' + language + '?Skip=' + skip + "&Take=" + take;
    //console.log(url);
    $.ajax({
        url: url,
        type: 'get',
        contentType: 'application/json',
        success: function (result) {
            var output = '';
            $.each(result.Results, function (i, item) {
                output += '<li><p><a href="' + item.Url + '">' + item.Title + '</a></p><p>' + item.Description + '</p></li>';
            });
            $("#" + target).html(output);
        }
    });
    window.BNPtoolbox.bindShareButton();
}

function SubscribeToNewsAlerts(language, firstName, lastName, email, company, funct, newsAlertThemes) {
    var url = '/restapi/NewsAlert/subscribe';
    var parameters = JSON.stringify({ 'FirstName': firstName, 'LastName': lastName, 'Email': email, 'Company': company, 'Function': funct, 'Language': language, 'NewsAlertThemes': newsAlertThemes });

    $.ajax({
        url: url,
        type: 'put',
        data: parameters,
        contentType: 'application/json',
        success: function (result) {
            console.log(result.ResultCode + " : " + result.Message);
        }
    });
}
function ReformatTwitter(content) {
    var regex1 = new RegExp('((^|\\s)#(\\w+))', 'g');
    //var regex1 = new RegExp('(([^&#]|#)[\\w\-�����]*)', 'gi');
    var regex2 = new RegExp('(@[\\w\-�����]*)', 'gi');
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