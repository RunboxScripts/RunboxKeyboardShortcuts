// ==UserScript==
// @name        Runbox Keyboard Shortcuts
// @description Add keyboard shortcuts to Runbox Webmail
// @author      https://github.com/RunboxScripts
// @namespace   https://github.com/RunboxScripts
// @version     3.8
// @downloadURL https://raw.githubusercontent.com/RunboxScripts/RunboxKeyboardShortcuts/master/RunboxKeyboardShortcuts.user.js
// @updateURL   https://raw.githubusercontent.com/RunboxScripts/RunboxKeyboardShortcuts/master/RunboxKeyboardShortcuts.meta.js
// @match       https://runbox.com/*
// @grant       none
// @require     https://raw.githubusercontent.com/ccampbell/mousetrap/master/mousetrap.min.js
// @require     https://raw.githubusercontent.com/ccampbell/mousetrap/master/plugins/global-bind/mousetrap-global-bind.min.js
// @require     https://raw.githubusercontent.com/dinbror/bpopup/master/jquery.bpopup.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/select2/3.3.2/select2.min.js
// @require     https://gist.githubusercontent.com/BrockA/2625891/raw/waitForKeyElements.js
// ==/UserScript==
// FUNCTIONS AND VARIABLES
// Get Element by XPath
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
// Get Current View
if (/\/addresses/.test(self.location.href)) {
    var rksRunboxView = 'contacts';
} else if (/\/compose/.test(self.location.href)) {
    var rksRunboxView = 'compose';
} else if (/\/forward/.test(self.location.href)) {
    var rksRunboxView = 'compose';
} else if (/\/reply/.test(self.location.href)) {
    var rksRunboxView = 'compose';
} else if (/\/send/.test(self.location.href)) {
    var rksRunboxView = 'compose';
} else if (/\/read/.test(self.location.href)) {
    var rksRunboxView = 'read';
} else {
    var rksRunboxView = 'list';
}
// Prevent checkboxes from stealing focus
function checkboxFocusReset() {
    $('input[type=checkbox]').mousedown(function(event) {
        event.preventDefault();
    });
}
// Refresh checkbox state upon Ajax refresh
waitForKeyElements(".m1:first", checkboxFocusReset);
// Append script CSS to head
$('head').append ('<style type="text/css" media="screen"> .submenu ul li ul.sub{z-index:7}.rksMailrowFocus{position:relative}.rksMailrowFocus::before{display:block;content:".";color:transparent;font-size:0;border-left:4px solid #2E7AB6;height:100%;position:absolute;left:-5px;padding:1px 0;top:-1px;bottom:-1px}.rksMailrowFocus::after{display:block;content:".";color:transparent;font-size:0;border-right:4px solid #2E7AB6;height:100%;position:absolute;right:-5px;padding:1px 0;top:-1px;bottom:-1px}</style>');
// ACTIONS
// Compose message
Mousetrap.bind('c', function() {
    if (rksRunboxView != 'compose') {
        $('#menuFoldersCompose a')[0].click();
    }
});
// Delete message
Mousetrap.bind('#', function() {
    $('#menuDelete a')[0].click();
});
// Mark as read
Mousetrap.bind('I', function() {
    if (rksRunboxView == 'list') {
        $('#menuRead a')[0].click();
    }
});
// Mark as unread
Mousetrap.bind('U', function() {
    $('#menuUnread a')[0].click();
});
// Flag message
Mousetrap.bind(['=','+'], function() {
    $('#menuFlag a')[0].click();
});
// Unflag message
Mousetrap.bind('-', function() {
    $('#menuUnflag a')[0].click();
});
// Report spam
Mousetrap.bind('!', function() {
    $('#menuSpam a')[0].click();
});
// Not Spam
Mousetrap.bind('@', function() {
    $('#menuNotSpam a')[0].click();
});
// Reply to message
Mousetrap.bind('r', function() {
    if (rksRunboxView == 'read') {
        $('#menuReply a')[0].click();
    }
});
// Reply to all
Mousetrap.bind('a', function() {
    if (rksRunboxView == 'read') {
        $('#menuReplyAll a')[0].click();
    }
});
// Forward message
Mousetrap.bind('f', function() {
    if (rksRunboxView == 'read') {
        $('#menuForward a')[0].click();
    }
});
// Show HTML Version
Mousetrap.bind('h', function() {
    if (rksRunboxView == 'read') {
        getElementByXpath('//A[descendant::text()=\'Show HTML-version\']').click();
    }
});
// Empty Drafts
Mousetrap.bind('e d', function() {
    $('.empty_trash')[0].click();
});
// Empty Spam
Mousetrap.bind('e p', function() {
    $('.empty_trash')[1].click();
});
// Empty Trash
Mousetrap.bind('e r', function() {
    $('.empty_trash')[2].click();
});
// Open keyboard shortcuts help
Mousetrap.bind('?', function() {
    $('#rksPdiv').bPopup();
    return false;
});
// SORT/FILTER COMMANDS
// Run only in list view
if (rksRunboxView == 'list') {
    // Select all or none
    Mousetrap.bind('mod+a', function() {
        $('.checkall')[0].click();
        return false;
    });
    // Sort by flagged
    Mousetrap.bind('s 1', function() {
        $('.orderflag')[0].click();
    });
    // Sort by replied
    Mousetrap.bind('s 2', function() {
        $('.orderrepl')[0].click();
    });
    // Sort by from
    Mousetrap.bind('s 3', function() {
        $('.orderfrom')[0].click();
    });
    // Sort by subject
    Mousetrap.bind('s 4', function() {
        $('.ordersubj')[0].click();
    });
    // Sort by new/old
    Mousetrap.bind('s 5', function() {
        $('.ordernew')[0].click();
    });
    // Sort by date
    Mousetrap.bind('s 6', function() {
        $('.orderrecv')[0].click();
    });
    // Sort by size
    Mousetrap.bind('s 7', function() {
        $('.ordersize')[0].click();
    });
    // Navigate message list
    function ondivchange(div, i) {
        // div is the highlighted div
        // i is index of said div
    } waitForKeyElements('.mailrow:first:not(.mailrow:contains(There\ are\ no\ messages\ in\ this\ folder))', (function (callback) {
        callback = callback || function() {
        };
        var divs = document.getElementById('mailmessages').getElementsByClassName('mailrow'),selectedDiv = 0,i;
        divs[selectedDiv].className = divs[selectedDiv].className + ' rksMailrowFocus';
        // Select message
        Mousetrap.bind(['x','space'], function() {
            divs[selectedDiv].click();
            return false;
        });
        // Reply to focused message
        Mousetrap.bind('r', function() {
            divs[selectedDiv].getElementsByClassName('maillink')[0].click();
            return false;
        });
        // Replyall to focused message
        Mousetrap.bind('a', function() {
            openCompose('/mail/replyall?message=' + divs[selectedDiv].getElementsByClassName('message_id')[0].innerHTML, 750, 670, '_blank');
            return false;
        });
        // Forward focused message
        Mousetrap.bind('f', function() {
            openCompose('/mail/forward?message=' + divs[selectedDiv].getElementsByClassName('message_id')[0].innerHTML, 750, 670, '_blank');
            return false;
        });
        // Open message
        Mousetrap.bind(['enter','o'], function() {
            divs[selectedDiv].getElementsByClassName('subjectlink')[0].click();
            return false;
        });
        // Open message in new tab/window
        Mousetrap.bind(['shift+enter','shift+o'], function() {
            var rksMessageSubjectlink = divs[selectedDiv].getElementsByClassName('subjectlink')[0];
            rksMessageSubjectlink.setAttribute('target', '_blank');
            rksMessageSubjectlink.click();
            rksMessageSubjectlink.removeAttribute('target');
            return false;
        });
        // Prevent default j/down/k/up actions
        Mousetrap.bind(['j','k','up','down'], function() {
            return false;
        });
        // Bind j/down/k/up
        document.onkeydown = function(e) {
            var x = 0;
            if (e.keyCode == 74) // j
                x = 1;
            else if (e.keyCode == 40) // down
                x = 1;
            else if (e.keyCode == 75) // k
                x = -1;
            else if (e.keyCode == 38) // up
                x = -1;
            else
                return;
            $('.mailrow').removeClass('rksMailrowFocus');
            selectedDivEval = ((selectedDiv + x) % divs.length);
            lastDiv = (divs.length - 1);
            selectedDiv = selectedDiv + x;
            if (selectedDivEval < 0 ) {
                selectedDiv = 0;
            }
            if (selectedDiv == divs.length) {
                selectedDiv = lastDiv;
            }
            if (divs.length == 1) {
                selectedDiv = 0;
            }
            divs[selectedDiv].className = divs[selectedDiv].className + ' rksMailrowFocus';
            callback(divs[selectedDiv], selectedDiv);
        };
    })); (ondivchange);
}
// NAVIGATION COMMANDS
// Exclude from compose view
if (rksRunboxView != 'compose') {
    // Refresh message list
    Mousetrap.bind('u', function() {
        $('.btn.menu_refresh')[0].click();
    });
    // Search mail
    Mousetrap.bind('/', function() {
        $('[name=s_new_string]').focus();
        return false;
    });
    // Next inbox section
    Mousetrap.bind(['.','mod+.'], function() {
        $('#menuNext a')[0].click();
    });
    // Previous inbox section
    Mousetrap.bind([',','mod+,'], function() {
        $('#menuPrev a')[0].click();
    });
    // Go to Contacts
    Mousetrap.bind('g c', function() {
        $('.main')[2].click();
    });
    // Go to All Mail
    Mousetrap.bind('g a', function() {
        $('#foldername_0').click();
    });
    // Go to Drafts
    Mousetrap.bind('g d', function() {
        getElementByXpath('//A[descendant::text()=\'Drafts\']').click();
    });
    // Go to Inbox
    Mousetrap.bind('g i', function() {
        if (rksRunboxView == 'contacts') {
            $('.main')[0].click();
        } else {
            getElementByXpath('//A[descendant::text()=\'Inbox\']').click();
        }
    });
    // Go to Sent
    Mousetrap.bind('g s', function() {
        getElementByXpath('//A[descendant::text()=\'Sent\']').click();
    });
    // Go to Spam
    Mousetrap.bind('g p', function() {
        getElementByXpath('//A[descendant::text()=\'Spam\']').click();
    });
    // Go to Templates
    Mousetrap.bind('g t', function() {
        getElementByXpath('//A[descendant::text()=\'Templates\']').click();
    });
    // Go to Trash
    Mousetrap.bind('g r', function() {
        getElementByXpath('//A[descendant::text()=\'Trash\']').click();
    });
}
// COMPOSE COMMANDS
// Run only in compose view
if (rksRunboxView == 'compose') {
    // Append Select2 CSS to head
    $('head').append ("<style type=\"text/css\" media=\"screen\">.select2-container{position:relative;display:inline-block;zoom:1;*display:inline;vertical-align:middle}.select2-container,.select2-drop,.select2-search,.select2-search input{-webkit-box-sizing:border-box;-khtml-box-sizing:border-box;-moz-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box}.select2-container .select2-choice{display:block;height:26px;padding:0 0 0 8px;overflow:hidden;position:relative;border:1px solid #aaa;white-space:nowrap;line-height:26px;color:#444;text-decoration:none;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;-webkit-background-clip:padding-box;-moz-background-clip:padding;background-clip:padding-box;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:#fff;background-image:-webkit-gradient(linear,left bottom,left top,color-stop(0,#eee),color-stop(0.5,#fff));background-image:-webkit-linear-gradient(center bottom,#eee 0,#fff 50%);background-image:-moz-linear-gradient(center bottom,#eee 0,#fff 50%);background-image:-o-linear-gradient(bottom,#eee 0,#fff 50%);background-image:-ms-linear-gradient(top,#fff 0,#eee 50%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#eeeeee', GradientType=0);background-image:linear-gradient(top,#fff 0,#eee 50%)}.select2-container.select2-drop-above .select2-choice{border-bottom-color:#aaa;-webkit-border-radius:0 0 4px 4px;-moz-border-radius:0 0 4px 4px;border-radius:0 0 4px 4px;background-image:-webkit-gradient(linear,left bottom,left top,color-stop(0,#eee),color-stop(0.9,#fff));background-image:-webkit-linear-gradient(center bottom,#eee 0,#fff 90%);background-image:-moz-linear-gradient(center bottom,#eee 0,#fff 90%);background-image:-o-linear-gradient(bottom,#eee 0,#fff 90%);background-image:-ms-linear-gradient(top,#eee 0,#fff 90%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#eeeeee', GradientType=0);background-image:linear-gradient(top,#eee 0,#fff 90%)}.select2-container .select2-choice span{line-height:1.6rem;margin-right:26px;display:block;overflow:hidden;white-space:nowrap;-ms-text-overflow:ellipsis;-o-text-overflow:ellipsis;text-overflow:ellipsis}.select2-container .select2-choice abbr{display:block;width:12px;height:12px;position:absolute;right:26px;top:8px;font-size:1px;text-decoration:none;border:0;background:cursor:pointer;outline:0}.select2-container .select2-choice abbr:hover{background-position:right -11px;cursor:pointer}.select2-drop-mask{position:absolute;left:0;top:0;z-index:9998;background-color:#fff;opacity:0;-ms-filter:\"alpha(Opacity=0)\";filter:\"alpha(opacity=0)\";filter:alpha(opacity=0)}.select2-drop{width:100%;margin-top:-1px;position:absolute;z-index:9999;top:100%;background:#fff;color:#000;border:1px solid #aaa;border-top:0;-webkit-border-radius:0 0 4px 4px;-moz-border-radius:0 0 4px 4px;border-radius:0 0 4px 4px;-webkit-box-shadow:0 4px 5px rgba(0,0,0,.15);-moz-box-shadow:0 4px 5px rgba(0,0,0,.15);box-shadow:0 4px 5px rgba(0,0,0,.15)}.select2-drop.select2-drop-above{margin-top:1px;border-top:1px solid #aaa;border-bottom:0;-webkit-border-radius:4px 4px 0 0;-moz-border-radius:4px 4px 0 0;border-radius:4px 4px 0 0;-webkit-box-shadow:0 -4px 5px rgba(0,0,0,.15);-moz-box-shadow:0 -4px 5px rgba(0,0,0,.15);box-shadow:0 -4px 5px rgba(0,0,0,.15)}.select2-container .select2-choice div{display:block;width:18px;height:100%;position:absolute;right:0;top:0;border-left:1px solid #aaa;-webkit-border-radius:0 4px 4px 0;-moz-border-radius:0 4px 4px 0;border-radius:0 4px 4px 0;-webkit-background-clip:padding-box;-moz-background-clip:padding;background-clip:padding-box;background:#ccc;background-image:-webkit-gradient(linear,left bottom,left top,color-stop(0,#ccc),color-stop(0.6,#eee));background-image:-webkit-linear-gradient(center bottom,#ccc 0,#eee 60%);background-image:-moz-linear-gradient(center bottom,#ccc 0,#eee 60%);background-image:-o-linear-gradient(bottom,#ccc 0,#eee 60%);background-image:-ms-linear-gradient(top,#ccc 0,#eee 60%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#cccccc', GradientType=0);background-image:linear-gradient(top,#ccc 0,#eee 60%)}.select2-container .select2-choice div b{display:block;width:100%;height:100%}.select2-search{display:inline-block;width:100%;min-height:26px;margin:0;padding-left:4px;padding-right:4px;position:relative;z-index:10000;white-space:nowrap}.select2-search-hidden{display:block;position:absolute;left:-10000px}.select2-search input{width:100%;height:auto!important;min-height:26px;padding:4px 20px 4px 5px;margin:0;outline:0;font-family:sans-serif;font-size:1em;border:1px solid #aaa;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;background:#fff url(select2.png) no-repeat 100% -22px;background:-webkit-gradient(linear,left bottom,left top,color-stop(0.85,#fff),color-stop(0.99,#eee));background:-webkit-linear-gradient(center bottom,#fff 85%,#eee 99%);background:-moz-linear-gradient(center bottom,#fff 85%,#eee 99%);background:-o-linear-gradient(bottom,#fff 85%,#eee 99%);background:-ms-linear-gradient(top,#fff 85%,#eee 99%);background:linear-gradient(top,#fff 85%,#eee 99%)}.select2-drop.select2-drop-above .select2-search input{margin-top:4px}.select2-search input.select2-active{background:#fff url(select2-spinner.gif) no-repeat 100%;background:-webkit-gradient(linear,left bottom,left top,color-stop(0.85,#fff),color-stop(0.99,#eee));background:-webkit-linear-gradient(center bottom,#fff 85%,#eee 99%);background:-moz-linear-gradient(center bottom,#fff 85%,#eee 99%);background:-o-linear-gradient(bottom,#fff 85%,#eee 99%);background:-ms-linear-gradient(top,#fff 85%,#eee 99%);background:linear-gradient(top,#fff 85%,#eee 99%)}.select2-container-active .select2-choice,.select2-container-active .select2-choices{border:1px solid #5897fb;outline:0;-webkit-box-shadow:0 0 5px rgba(0,0,0,.3);-moz-box-shadow:0 0 5px rgba(0,0,0,.3);box-shadow:0 0 5px rgba(0,0,0,.3)}.select2-dropdown-open .select2-choice{border-bottom-color:transparent;-webkit-box-shadow:0 1px 0 #fff inset;-moz-box-shadow:0 1px 0 #fff inset;box-shadow:0 1px 0 #fff inset;-webkit-border-bottom-left-radius:0;-moz-border-radius-bottomleft:0;border-bottom-left-radius:0;-webkit-border-bottom-right-radius:0;-moz-border-radius-bottomright:0;border-bottom-right-radius:0;background-color:#eee;background-image:-webkit-gradient(linear,left bottom,left top,color-stop(0,#fff),color-stop(0.5,#eee));background-image:-webkit-linear-gradient(center bottom,#fff 0,#eee 50%);background-image:-moz-linear-gradient(center bottom,#fff 0,#eee 50%);background-image:-o-linear-gradient(bottom,#fff 0,#eee 50%);background-image:-ms-linear-gradient(top,#fff 0,#eee 50%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#ffffff', GradientType=0);background-image:linear-gradient(top,#fff 0,#eee 50%)}.select2-dropdown-open .select2-choice div{background:transparent;border-left:0;filter:none}.select2-dropdown-open .select2-choice div b{background-position:-18px 1px}.select2-results{max-height:200px;padding:0 0 0 4px;margin:4px 4px 4px 0;position:relative;overflow-x:hidden;overflow-y:auto;-webkit-tap-highlight-color:rgba(0,0,0,0)}.select2-results ul.select2-result-sub{margin:0}.select2-results ul.select2-result-sub>li .select2-result-label{padding-left:20px}.select2-results ul.select2-result-sub ul.select2-result-sub>li .select2-result-label{padding-left:40px}.select2-results ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub>li .select2-result-label{padding-left:60px}.select2-results ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub>li .select2-result-label{padding-left:80px}.select2-results ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub>li .select2-result-label{padding-left:100px}.select2-results ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub>li .select2-result-label{padding-left:110px}.select2-results ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub>li .select2-result-label{padding-left:120px}.select2-results li{list-style:none;display:list-item;background-image:none}.select2-results li.select2-result-with-children>.select2-result-label{font-weight:700}.select2-results .select2-result-label{padding:3px 7px 4px;margin:0;cursor:pointer;min-height:1em;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.select2-results .select2-highlighted{background:#3875d7;color:#fff}.select2-results li em{background:#feffde;font-style:normal}.select2-results .select2-highlighted em{background:transparent}.select2-results .select2-highlighted ul{background:#fff;color:#000}.select2-results .select2-no-results,.select2-results .select2-searching,.select2-results .select2-selection-limit{background:#f4f4f4;display:list-item}.select2-results .select2-disabled.select2-highlighted{color:#666;background:#f4f4f4;display:list-item;cursor:default}.select2-results .select2-disabled{background:#f4f4f4;display:list-item;cursor:default}.select2-results .select2-selected{display:none}.select2-more-results.select2-active{background:#f4f4f4 url(select2-spinner.gif) no-repeat 100%}.select2-more-results{background:#f4f4f4;display:list-item}.select2-container.select2-container-disabled .select2-choice{background-color:#f4f4f4;background-image:none;border:1px solid #ddd;cursor:default}.select2-container.select2-container-disabled .select2-choice div{background-color:#f4f4f4;background-image:none;border-left:0}.select2-container.select2-container-disabled .select2-choice abbr{display:none}.select2-container-multi .select2-choices{height:auto!important;height:1%;margin:0;padding:0;position:relative;border:1px solid #aaa;cursor:text;overflow:hidden;background-color:#fff;background-image:-webkit-gradient(linear,0 0,0 100%,color-stop(1%,#eee),color-stop(15%,#fff));background-image:-webkit-linear-gradient(top,#eee 1%,#fff 15%);background-image:-moz-linear-gradient(top,#eee 1%,#fff 15%);background-image:-o-linear-gradient(top,#eee 1%,#fff 15%);background-image:-ms-linear-gradient(top,#eee 1%,#fff 15%);background-image:linear-gradient(top,#eee 1%,#fff 15%)}.select2-locked{padding:3px 5px!important}.select2-container-multi .select2-choices{min-height:26px}.select2-container-multi.select2-container-active .select2-choices{border:1px solid #5897fb;outline:0;-webkit-box-shadow:0 0 5px rgba(0,0,0,.3);-moz-box-shadow:0 0 5px rgba(0,0,0,.3);box-shadow:0 0 5px rgba(0,0,0,.3)}.select2-container-multi .select2-choices li{float:left;list-style:none}.select2-container-multi .select2-choices .select2-search-field{margin:0;padding:0;white-space:nowrap}.select2-container-multi .select2-choices .select2-search-field input{padding:5px;margin:1px 0;font-family:sans-serif;font-size:100%;color:#666;outline:0;border:0;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;background:transparent!important}.select2-container-multi .select2-choices .select2-search-field input.select2-active{background:#fff url(select2-spinner.gif) no-repeat 100%!important}.select2-default{color:#999!important}.select2-container-multi .select2-choices .select2-search-choice{padding:3px 5px 3px 18px;margin:3px 0 3px 5px;position:relative;line-height:13px;color:#333;cursor:default;border:1px solid #aaa;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-webkit-box-shadow:0 0 2px #fff inset,0 1px 0 rgba(0,0,0,.05);-moz-box-shadow:0 0 2px #fff inset,0 1px 0 rgba(0,0,0,.05);box-shadow:0 0 2px #fff inset,0 1px 0 rgba(0,0,0,.05);-webkit-background-clip:padding-box;-moz-background-clip:padding;background-clip:padding-box;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:#e4e4e4;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#f4f4f4', GradientType=0);background-image:-webkit-gradient(linear,0 0,0 100%,color-stop(20%,#f4f4f4),color-stop(50%,#f0f0f0),color-stop(52%,#e8e8e8),color-stop(100%,#eee));background-image:-webkit-linear-gradient(top,#f4f4f4 20%,#f0f0f0 50%,#e8e8e8 52%,#eee 100%);background-image:-moz-linear-gradient(top,#f4f4f4 20%,#f0f0f0 50%,#e8e8e8 52%,#eee 100%);background-image:-o-linear-gradient(top,#f4f4f4 20%,#f0f0f0 50%,#e8e8e8 52%,#eee 100%);background-image:-ms-linear-gradient(top,#f4f4f4 20%,#f0f0f0 50%,#e8e8e8 52%,#eee 100%);background-image:linear-gradient(top,#f4f4f4 20%,#f0f0f0 50%,#e8e8e8 52%,#eee 100%)}.select2-container-multi .select2-choices .select2-search-choice span{cursor:default}.select2-container-multi .select2-choices .select2-search-choice-focus{background:#d4d4d4}.select2-search-choice-close{display:block;width:12px;height:13px;position:absolute;right:3px;top:4px;font-size:1px;outline:0}.select2-container-multi .select2-search-choice-close{left:3px}.select2-container-multi .select2-choices .select2-search-choice .select2-search-choice-close:hover{background-position:right -11px}.select2-container-multi .select2-choices .select2-search-choice-focus .select2-search-choice-close{background-position:right -11px}.select2-container-multi.select2-container-disabled .select2-choices{background-color:#f4f4f4;background-image:none;border:1px solid #ddd;cursor:default}.select2-container-multi.select2-container-disabled .select2-choices .select2-search-choice{padding:3px 5px;border:1px solid #ddd;background-image:none;background-color:#f4f4f4}.select2-container-multi.select2-container-disabled .select2-choices .select2-search-choice .select2-search-choice-close{display:none}.select2-result-selectable .select2-match,.select2-result-unselectable .select2-match{text-decoration:underline}.select2-offscreen{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}@media only screen and (-webkit-min-device-pixel-ratio:1.5),only screen and (min-resolution:144dpi){.select2-search input,.select2-search-choice-close,.select2-container .select2-choice abbr,.select2-container .select2-choice div b{background-image:url(select2x2.png)!important;background-repeat:no-repeat!important;background-size:60px 40px!important}.select2-search input{background-position:100% -21px!important}}.select2-container .select2-choice div b{line-height:1.6rem;text-align:center}.select2-container .select2-choice div b::after{content:'\\25BC'}.select2-dropdown-open .select2-choice div b::after{content:'\\25B2'}</style>");
    // Load Select2 on compose window select boxes
    $('select.formfield[name=from]').select2({width:'408px'});
    $('select.formfield[name=from_files],select.formfield[name=add_tag_id]').select2({width:'auto'});
    // Change From address
    Mousetrap.bindGlobal('mod+shift+f', function() {
        $('#s2id_autogen1').select2('open');
        return false;
    });
    // Add To recipients
    Mousetrap.bindGlobal('mod+shift+t', function() {
        $('#to_').focus();
        return false;
    });
    // Add Cc recipients
    Mousetrap.bindGlobal('mod+shift+c', function() {
        $('#cc_').focus();
        return false;
    });
    // Add Bcc recipients
    Mousetrap.bindGlobal('mod+shift+b', function() {
        $('#bcc_').focus();
        return false;
    });
    // Edit subject
    Mousetrap.bindGlobal('mod+shift+s', function() {
        $('[name=subject]').focus();
        return false;
    });
    // Edit body
    Mousetrap.bindGlobal('mod+shift', function() {
        $('#editor').focus();
        return false;
    });
    // Save draft
    Mousetrap.bindGlobal('mod+s', function() {
        $('[name=save]').click();
        return false;
    });
    // Send message
    Mousetrap.bindGlobal('mod+enter', function() {
        if (confirm('Are sure you want to send this message?')) {
            $('[name=send]').click();
        }
        return false;
    });
    // Show all fields
    Mousetrap.bind('a', function() {
        $('.show_compose_fields')[0].click();
        return false;
    });
    // Hide "show all fields" row on click
    $('.show_compose_fields').click(function() {
        $('#row_show_all_fields').hide();
    });
}
// KEYBOARD SHORTCUTS HELP
// Help popup content
if (rksRunboxView == 'contacts') {
    var rksPcontent = '<div id="rksPtitle">Keyboard Shortcuts</div> \
                        <table id="rksPtable"> \
                        <tbody> \
                        <tr><td class="m pl">g + i</td><td>Go to Inbox</td></tr> \
                        <tr><td>&nbsp;</td></tr> \
                        <tr><td class="m pl">?</td><td>Open keyboard shortcuts help</td></tr> \
                        </tbody> \
                        </table> \
                        ';
} else if (rksRunboxView == 'compose') {
    var rksPcontent = '<div id="rksPtitle">Keyboard Shortcuts</div> \
                <p>These commands do not work inside the HTML text editor.</p> \
                        <table id="rksPtable"> \
                        <tr><td class="e m pl">a</td><td>Show all fields</td></tr> \
                        <tr><td class="e m pl">Ctrl + Shift + f<br>&#8984; + Shift + f</td><td>Change &ldquo;From:&rdquo; address</td></tr> \
                        <tr><td class="e m pl">Ctrl + Shift + t<br>&#8984; + Shift + t</td><td class="e">Add &ldquo;To:&rdquo; recipients<br><em>(Does not work in Chrome)</em></td></tr> \
                        <tr><td class="e m pl">Ctrl + Shift + c<br>&#8984; + Shift + c</td><td>Add &ldquo;CC:&rdquo; recipients</td></tr> \
                        <tr><td class="e m pl">Ctrl + Shift + b<br>&#8984; + Shift + b</td><td>Add &ldquo;BCC:&rdquo; recipients</td></tr> \
                        <tbody> \
                        </tbody> \
            </table> \
                        <table id="rksPtable"> \
                        <tbody> \
                        <tr><td class="e m pl">Ctrl + Shift + s<br>&#8984; + Shift + s</td><td>Edit subject</td></tr> \
                        <tr><td class="e m pl">Ctrl + Shift<br>&#8984; + Shift</td><td>Edit body</td></tr> \
                        <tr><td class="e m pl">Ctrl + s<br>&#8984; + s</td><td>Save draft</td></tr> \
                        <tr><td class="e m pl">Ctrl + Enter<br>&#8984; + Enter</td><td>Send message</td></tr> \
                        </tbody> \
                        </table> \
                        ';
} else {
    var rksPcontent = '<div id="rksPtitle">Keyboard Shortcuts</div> \
                        <table id="rksPtable"> \
                        <tbody> \
                        <tr><td class="h pl">Actions</td></tr> \
                        <tr><td class="m pl">c</td><td>Compose message</td></tr> \
                        <tr><td class="m pl">o or Enter</td><td>Open message</td></tr> \
                        <tr><td class="m pl">Shift + o or Shift + Enter</td><td>Open in new tab/window</td></tr> \
                        <tr><td class="m pl">r</td><td>Reply to message</td></tr> \
                        <tr><td class="m pl">a</td><td>Reply to all</td></tr> \
                        <tr><td class="m pl">f</td><td>Forward message</td></tr> \
                        <tr><td class="m pl">/</td><td>Search mail</td></tr> \
                        <tr><td>&nbsp;</td></tr> \
                        <tr><td class="h pl">Selections</td></tr> \
                        <tr><td class="m pl">x or Space</td><td>Select message</td></tr> \
                        <tr><td class="m pl">Ctrl + a<br>&#8984; + a</td><td>Select All or None</td></tr> \
                        <tr><td class="m pl">Shift + i</td><td>Mark as read</td></tr> \
                        <tr><td class="m pl">Shift + u</td><td>Mark as unread</td></tr> \
                        <tr><td class="m pl">+</td><td>Flag message(s)</td></tr> \
                        <tr><td class="m pl">-</td><td>Unflag message(s)</td></tr> \
                        <tr><td class="m pl">!</td><td>Report spam</td></tr> \
                        <tr><td class="m pl">@</td><td>Not spam</td></tr> \
                        <tr><td class="m pl">#</td><td>Delete message(s)</td></tr> \
                        </tbody> \
                        </table> \
                        <table id="rksPtable"> \
                        <tbody> \
                        <tr><td class="h pl">Navigation</td></tr> \
                        <tr><td class="m pl">u</td><td>Refresh message list</td></tr> \
                        <tr><td class="m pl">j or Down</td><td>Next message in list</td></tr> \
                        <tr><td class="m pl">k or Up</td><td>Previous message in list</td></tr> \
                        <tr><td class="m pl">&#62;</td><td>Next inbox or message page</td></tr> \
                        <tr><td class="m pl">&#60;</td><td>Previous inbox or message page</td></tr> \
                        <tr><td>&nbsp;</td></tr> \
                        <tr><td class="h pl">Jumping</td></tr> \
                        <tr><td class="m pl">g + a</td><td>Go to All mail</td></tr> \
                        <tr><td class="m pl">g + d</td><td>Go to Drafts</td></tr> \
                        <tr><td class="m pl">g + i</td><td>Go to Inbox</td></tr> \
                        <tr><td class="m pl">g + s</td><td>Go to Sent</td></tr> \
                        <tr><td class="m pl">g + t</td><td>Go to Templates</td></tr> \
                        <tr><td class="m pl">g + p</td><td>Go to Spam</td></tr> \
                        <tr><td class="m pl">g + r</td><td>Go to Trash</td></tr> \
                        <tr><td class="m pl">g + c</td><td>Go to Contacts</td></tr> \
                        </tbody> \
                        </table> \
                        <table id="rksPtable"> \
                        <tbody> \
                        <tr><td class="h pl">Sorting</td></tr> \
                        <tr><td class="m pl">s + 1</td><td>Sort by Flagged</td></tr> \
                        <tr><td class="m pl">s + 2</td><td>Sort by Replied</td></tr> \
                        <tr><td class="m pl">s + 3</td><td>Sort by From</td></tr> \
                        <tr><td class="m pl">s + 4</td><td>Sort by Subject</td></tr> \
                        <tr><td class="m pl">s + 5</td><td>Sort by New/Old</td></tr> \
                        <tr><td class="m pl">s + 6</td><td>Sort by Date</td></tr> \
                        <tr><td class="m pl">s + 7</td><td>Sort by Size</td></tr> \
                        <tr><td>&nbsp;</td></tr> \
                        <tr><td class="h pl">Cleaning</td></tr> \
                        <tr><td class="m pl">e + r</td><td>Empty Trash</td></tr> \
                        <tr><td class="m pl">e + p</td><td>Empty Spam</td></tr> \
                        <tr><td class="m pl">e + d</td><td>Empty Drafts</td></tr> \
                        <tr><td>&nbsp;</td></tr> \
                        <tr><td class="h pl">Miscellaneous</td></tr> \
                        <tr><td class="m pl">h</td><td>Show HTML version</td></tr> \
                        <tr><td class="m pl">?</td><td>Open keyboard shortcuts help</td></tr> \
                        </tbody> \
                        </table> \
                        ';
}
// Append popup CSS to head
$('head').append ('<style type="text/css" media="screen"> #rksPdiv{font-family:inherit;background-color:#fff;border-radius:15px;color:#222;display:none;padding:20px;min-width:360px;min-height:180px}#rksPtitle{font-size:14px;font-weight:700;line-height:1em;margin-top:-4px}#rksPtable{float:left;padding-top:14px!important}#rksPtable td{color:#222!important;font-size:12px!important;line-height:1.1em;padding-right:2em;horizontal-align:left;vertical-align:top}#rksPtable td.e{padding-bottom:1em}#rksPtable td.pl{padding-left:1em}#rksPtable td.h{font-weight:700;border-left:1px solid #ABD2FD}#rksPtable td.m{font-family:monospace;border-left:1px solid #ABD2FD}.b-close{cursor:pointer;border-radius:7px;box-shadow:none;font:700 16px sans-serif!important;padding:0 6px 3px;position:absolute;right:-7px;top:-9px;background-color:#155D97;color:#FFF;text-shadow:none}a.b-close:hover{color:#fff}</style> \
<style type="text/css" media="print"> #rksPdiv{display:none}</style>');
// Append popup HTML to body
$('body').append (
    '<div id="rksPdiv"> \
    <a class="b-close">x</a> \
    ' + rksPcontent + ' \
    </div>');
