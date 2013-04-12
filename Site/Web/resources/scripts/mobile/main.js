﻿$.mobile.defaultDialogTransition = 'none';
$.mobile.defaultPageTransition = 'none';

$(window).bind('orientationchange', function(e) {
    if ($.event.special.orientationchange.orientation() == "portrait") {
        $($.find('html')[0]).removeClass('landscape');
        $($.find('html')[0]).addClass('portrait');
    } else {
        $($.find('html')[0]).addClass('landscape');
        $($.find('html')[0]).removeClass('portrait');
    }
});

function CreateButton(icon, title, callback, callbackpars) {
    var ret = $('<span class="NormalButton"></span>');
    ret.append('<span></span>');
    if (icon != null) {
        $(ret.children()[0]).append('<strong><img class="' + icon + '">' + title + '</strong>');
    } else {
        $(ret.children()[0]).append('<strong>' + title + '</strong>');
    }
    if (callback != null) {
        ret.bind('click',
        { callback: callback, pars: (callbackpars == undefined ? null : callbackpars), button: ret },
        function(event) {
            if (event.data.pars != null) {
                event.data.callback(event.data.button, event.data.pars);
            } else {
                event.data.callback(event.data.button);
            }
        });
    }
    return ret;
}

FreeswitchConfig.Site = $.extend(FreeswitchConfig.Site, {
    AttachNPANXXHelpToInput: function(input) {
        var img = $('<img class="' + HELP_CLASS + '">');
        $(input).after(img);
        RegisterToolTip(img, null, NPANXX_HELP);
    },
    RegisterToolTip: function(element, delay, content) {
        var tmp = $('<div class="ToolTip" style="display:none;"></div>');
        if ($(element).attr('title') != '') {
            $(element).attr('bt-xTitle', $(element).attr('title'));
            $(element).attr('title', '');
        }
        $(element).bt(content,
        {
            cssClass: 'ToolTip',
            fill: tmp.css('background-color'),
            strokeStyle: tmp.css('border-color'),
            killTitle: false
        });
    },
    PreloadImages: function() {
        return [
            '/resources/images/icons.png',
            '/resources/images/buttonBack.png',
            '/resources/images/buttonBackAlt.png',
            '/resources/images/buttonCorners.png',
            '/resources/images/buttonCornersAlt.png',
            '/resources/images/thbackground.png'
        ];
    },
    InitPage: function() {
        $(document.body).html($('<div data-role="page"><div data-role="header"><img src="/resources/images/mobile/logo.png"/><h3 id="PageTitleContainer"/></div><div data-role="content" id="MainContainer"></div><div data-role="footer"></div></div>'));
        $($.find('div:first')[0]).page();
        $($.find('div:first')[0]).show();
        if (window.innerHeight > window.innerWidth) {
            $($.find('html')[0]).removeClass('landscape');
            $($.find('html')[0]).addClass('portrait');
        } else {
            $($.find('html')[0]).addClass('landscape');
            $($.find('html')[0]).removeClass('portrait');
        }
    },
    MainContainer: function() {
        return $('#MainContainer');
    },
    TitleContainer: function() {
        return $('#PageTitleContainer');
    }
});