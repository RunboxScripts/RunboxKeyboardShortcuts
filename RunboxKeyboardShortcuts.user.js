// ==UserScript==
// @name        Runbox Keyboard Shortcuts
// @namespace   https://github.com/RunboxScripts
// @description Adds keyboard shortcuts to Runbox Webmail
// @downloadURL https://raw.githubusercontent.com/RunboxScripts/RunboxKeyboardShortcuts/master/RunboxKeyboardShortcuts.user.js
// @updateURL   https://raw.githubusercontent.com/RunboxScripts/RunboxKeyboardShortcuts/master/RunboxKeyboardShortcuts.meta.js
// @match       https://runbox.com/*
// @require     https://raw.githubusercontent.com/ccampbell/mousetrap/master/mousetrap.min.js
// @require     https://raw.githubusercontent.com/ccampbell/mousetrap/master/plugins/global-bind/mousetrap-global-bind.min.js
// @require     https://raw.githubusercontent.com/dinbror/bpopup/master/jquery.bpopup.min.js
// @version     1.1
// @grant       none
// ==/UserScript==
//
// ========================
// Functions and Variables
// ========================
//
// Get Element by XPath
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null) .singleNodeValue;
};
//
// Get Variables from URL
function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}
//
// Set Message Value
var rksMessageValue = getUrlParameter('message');
//
// Get Current View
if (/addresses/.test(self.location.href)) {
    var rksRunboxView = 'contacts';
} else if (/compose/.test(self.location.href)) {
    var rksRunboxView = 'compose';
} else if (/forward/.test(self.location.href)) {
    var rksRunboxView = 'compose';
} else if (/reply/.test(self.location.href)) {
    var rksRunboxView = 'compose';
} else if (/send/.test(self.location.href)) {
    var rksRunboxView = 'compose';
} else if (/read/.test(self.location.href)) {
    var rksRunboxView = 'read';
} else {
    var rksRunboxView = 'list';
}
//
// ========
// Actions
// ========
//
// Compose message
Mousetrap.bind('c', function () {
    if (rksRunboxView != 'compose') {
        openCompose('/mail/compose', 900, 700, '_blank');
    }
});
//
// Delete message
Mousetrap.bind('#', function () {
    if (rksRunboxView == 'read') {
        window.location = '/mail/list?delete_msg=1&message=' + rksMessageValue;
    } else if (rksRunboxView == 'list') {
        document.list.delete_msg.value = '1';
        document.list.submit();
    }
});
//
// Mark as read
Mousetrap.bind('I', function () {
    if (rksRunboxView == 'list') {
        document.list.mark_msg.value = '1';
        document.list.mark_read.value = '1';
        document.list.submit();
    }
});
//
// Mark as unread
Mousetrap.bind('U', function () {
    if (rksRunboxView == 'read') {
        window.location = '/mail/list?mark_msg=1&mark_read=0&message=' + rksMessageValue;
    } else if (rksRunboxView == 'list') {
        document.list.mark_msg.value = '1';
        document.list.mark_read.value = '0';
        document.list.submit();
    }
});
//
// Flag message
Mousetrap.bind(['=','+'], function () {
    if (rksRunboxView == 'read') {
        window.location = '/mail/list?flag_msg=1&flag_flagged=1&message=' + rksMessageValue;
    } else if (rksRunboxView == 'list') {
        document.list.flag_msg.value = '1';
        document.list.flag_flagged.value = '1';
        document.list.submit();
    }
});
//
// Unflag message
Mousetrap.bind('-', function () {
    if (rksRunboxView == 'read') {
        window.location = '/mail/list?flag_msg=1&flag_flagged=0&message=' + rksMessageValue;
    } else if (rksRunboxView == 'list') {
        document.list.flag_msg.value = '1';
        document.list.flag_flagged.value = '0';
        document.list.submit();
    }
});
//
// Report spam
Mousetrap.bind('!', function () {
    if (rksRunboxView == 'read') {
        window.location = '/mail/list?learn=spam&message=' + rksMessageValue;
    } else if (rksRunboxView == 'list') {
        document.list.learn.value = 'spam';
        document.list.submit();
    }
});
//
// Show HTML Version
Mousetrap.bind('h', function () {
    if (rksRunboxView == 'read') {
        getElementByXpath('//A[descendant::text()=\'Show HTML-version\']') .click();
    }
});
//
// Reply to message
Mousetrap.bind('r', function () {
    if (rksRunboxView == 'read') {
        openCompose('/mail/reply?message=' + rksMessageValue, 900, 700, '_blank');
    }
});
//
// Reply to all
Mousetrap.bind('a', function () {
    if (rksRunboxView == 'read') {
        openCompose('/mail/replyall?message=' + rksMessageValue, 900, 700, '_blank');
    }
});
//
// Forward message
Mousetrap.bind('f', function () {
    if (rksRunboxView == 'read') {
        openCompose('/mail/forward?message=' + rksMessageValue, 900, 700, '_blank');
    }
});
//
// Not Spam
Mousetrap.bind('@', function () {
    if (rksRunboxView == 'read') {
        window.location = '/mail/list?learn=innocent&message=' + rksMessageValue;
    } else if (rksRunboxView == 'list') {
        document.list.learn.value = 'innocent';
        document.list.submit();
    }
});
//
// Empty Drafts
Mousetrap.bind('e d', function () {
    getElementByXpath('//FORM[@name=\'list\']/TABLE/TBODY/TR[1]/TD[1]/TABLE/TBODY/TR[3]/TD/TABLE/TBODY/TR[2]/TD[1]/A[3]').click();
});
//
// Empty Spam
Mousetrap.bind('e p', function () {
    getElementByXpath('//FORM[@name=\'list\']/TABLE/TBODY/TR[1]/TD[1]/TABLE/TBODY/TR[3]/TD/TABLE/TBODY/TR[5]/TD[1]/A[3]').click();
});
//
// Empty Trash
Mousetrap.bind('e r', function () {
    getElementByXpath('//FORM[@name=\'list\']/TABLE/TBODY/TR[1]/TD[1]/TABLE/TBODY/TR[3]/TD/TABLE/TBODY/TR[7]/TD[1]/A[3]').click();
});
//
// ====================
// Sort/Filter Commands
// ====================
//
// Run only in list view
if (rksRunboxView == 'list') {
    //
    // Check all/none
    Mousetrap.bind('mod+a', function () {
        $('[name=checkall]').click();
        CheckAll();
        // getElementByXpath('//DIV[@id=\'messagecell\']/DIV[2]/DIV[1]/INPUT').click();
        return false;
    });
    //
    // Sort by flagged
    Mousetrap.bind('s 1', function () {
        $('.orderflag')[0].click();
        // getElementByXpath('//DIV[@id=\'messagecell\']/DIV[2]/DIV[2]/NOBR/A[1]').click();
    });
    //
    // Sort by replied
    Mousetrap.bind('s 2', function() {
        $('.orderrepl')[0].click();
        // getElementByXpath('//DIV[@id=\'messagecell\']/DIV[2]/DIV[2]/NOBR/A[2]').click();
    });
    //
    // Sort by from
    Mousetrap.bind('s 3', function() {
        $('.orderfrom')[0].click();
        // getElementByXpath('//DIV[@id=\'messagecell\']/DIV[2]/DIV[3]/A').click();
    });
    //
    // Sort by subject
    Mousetrap.bind('s 4', function() {
        $('.ordersubj')[0].click();
        // getElementByXpath('//DIV[@id=\'messagecell\']/DIV[2]/DIV[4]/A[1]').click();
    });
    //
    // Sort by new/old
    Mousetrap.bind('s 5', function() {
        $('.ordernew')[0].click();
        // getElementByXpath('//DIV[@id=\'messagecell\']/DIV[2]/DIV[4]/A[2]').click();
    });
    //
    // Sort by date
    Mousetrap.bind('s 6', function() {
        $('.orderrecv')[0].click();
        // getElementByXpath('//DIV[@id=\'messagecell\']/DIV[2]/DIV[5]/A').click();
    });
    //
    // Sort by size
    Mousetrap.bind('s 7', function() {
        $('.ordersize')[0].click();
        // getElementByXpath('//DIV[@id=\'messagecell\']/DIV[2]/DIV[6]/NOBR/A').click();
    });
    //
    // Navigate message list
    // TODO: rewrite, cleanup, optimize
    function ondivchange(div, i) {
        // div is the highlighted div
        // i is index of said div
    }(function (callback) {
        callback = callback || function () {
        };
        var divs = document.getElementById('mailmessages').getElementsByClassName('mailrow'),
        selectedDiv = 0,
        i;
        for (i = 0; i < divs.length; i++) {
            divs[i].onmouseover = (function (i) {
                return function () {
                    divs[selectedDiv].style.backgroundColor = '';
                    selectedDiv = i;
                    divs[selectedDiv].style.backgroundColor = '#E6EAF2';
                    callback(divs[selectedDiv], selectedDiv);
                }
            }) (i);
        }
        divs[selectedDiv].style.backgroundColor = '#E6EAF2';
        //
        // Check message
        //
        Mousetrap.bind(['x','space'], function () {
            divs[selectedDiv].click();
            return false;
        });
        //
        // Reply to selected message
        Mousetrap.bind('r', function() {
            divs[selectedDiv].getElementsByClassName('maillink')[0].click();
            return false;
        });
        //
        // Open message
        Mousetrap.bind(['enter','o'], function() {
            divs[selectedDiv].getElementsByClassName('subjectlink')[0].click();
            return false;
        });
        //
        // Unbind j/k/up/down
        Mousetrap.bind(['j','k','up','down'], function() {
            return false;
        });
        //
        // j/k/up/down listeners
        document.onkeydown = function(e) {
            var x = 0;
            // Check for j/k/up/down
            if (e.keyCode == 74)
            x = - 1;
             else if (e.keyCode == 38)
            x = - 1;
             else if (e.keyCode == 75)
            x = 1;
             else if (e.keyCode == 40)
            x = 1;
             else
            return ;
            divs[selectedDiv].style.backgroundColor = '';
            selectedDiv = ((selectedDiv + x) % divs.length);
            selectedDiv = selectedDiv < 0 ?
            divs.length + selectedDiv : selectedDiv;
            divs[selectedDiv].style.backgroundColor = '#E6EAF2';
            callback(divs[selectedDiv], selectedDiv);
        };
    }) (ondivchange);
}
//
// ===================
// Navigation Commands
// ===================
//
// Exclude from compose view
if (rksRunboxView != 'compose') {
    //
    // Refresh message list
    Mousetrap.bind('u', function() {
        $('.btn.refresh')[0].click();
    });
    //
    // Search mail
    Mousetrap.bind('/', function() {
        $('[name=s_new_string]').focus();
        return false;
    });
    //
    // Next inbox section
    Mousetrap.bind(['.','mod+.'], function() {
        $('li').find('a:contains(">>")').click();
        // getElementByXpath('//FORM[@name=\'list\']/TABLE/TBODY/TR[1]/TD[2]/DIV/DIV[1]/UL[2]/LI[3]/A/SPAN/SPAN').click();
    });
    //
    // Previous inbox section
    Mousetrap.bind([',','mod+,'], function() {
        $('li').find('a:contains("<<")').click();
        // getElementByXpath('//FORM[@name=\'list\']/TABLE/TBODY/TR[1]/TD[2]/DIV/DIV[1]/UL[2]/LI[2]/A/SPAN/SPAN').click();
    });
    //
    // Go to Contacts
    Mousetrap.bind('g c', function() {
        window.location = '/mail/addresses';
    });
    //
    // Go to All Mail
    Mousetrap.bind('g a', function() {
        getElementByXpath('//FORM[@name=\'list\']/TABLE/TBODY/TR[1]/TD[1]/TABLE/TBODY/TR[3]/TD/TABLE/TBODY/TR[1]/TD[1]/A[2]').click();

    });
    //
    // Go to Drafts
    Mousetrap.bind('g d', function() {
        getElementByXpath('//A[descendant::text()=\'Drafts\']').click();
    });
    //
    // Go to Inbox
    Mousetrap.bind('g i', function() {
        if (rksRunboxView == 'contacts') {
            window.location = '/mail/list';
        } else {
            getElementByXpath('//A[descendant::text()=\'Inbox\']').click();
        }
    });
    //
    // Go to Sent
    Mousetrap.bind('g s', function() {
        getElementByXpath('//A[descendant::text()=\'Sent\']').click();
    });
    //
    // Go to Spam
    Mousetrap.bind('g p', function() {
        getElementByXpath('//A[descendant::text()=\'Spam\']').click();
    });
    //
    // Go to Templates
    Mousetrap.bind('g t', function() {
        getElementByXpath('//A[descendant::text()=\'Templates\']').click();
    });
    //
    // Go to Trash
    Mousetrap.bind('g r', function() {
        getElementByXpath('//A[descendant::text()=\'Trash\']').click();
    });
}
//
// ================
// Compose Commands
// ================
//
// Run only in compose view
if (rksRunboxView == 'compose') {
    //
    // From address resize
    var fromSel = $('[name=from]')[0];
    fromSel.onblur = function () {
        fromSel.size = 1;
    }
    //
    // Change From address
    Mousetrap.bindGlobal('mod+shift+f', function() {
        var fromLen = fromSel.options.length;
        fromSel.size = fromLen;
        fromSel.focus();
        return false;
    });
    //
    // Add To recipients
    Mousetrap.bindGlobal('mod+shift+t', function() {
        $('#to_').focus();
        return false;
    });
    //
    // Add Cc recipients
    Mousetrap.bindGlobal('mod+shift+c', function() {
        $('#cc_').focus();
        return false;
    });
    //
    // Add Bcc recipients
    Mousetrap.bindGlobal('mod+shift+b', function() {
        $('#bcc_').focus();
        return false;
    });
    //
    // Edit subject
    Mousetrap.bindGlobal('mod+shift+s', function() {
        $('[name=subject]').focus();
        return false;
    });
    //
    // Edit body
    Mousetrap.bindGlobal('mod+shift', function() {
        $('#editor').focus();
        return false;
    });
    //
    // Save draft
    Mousetrap.bindGlobal('mod+s', function() {
        $('[name=save]').click();
        return false;
    });
    //
    // Send message
    Mousetrap.bindGlobal('mod+enter', function() {
        if (confirm('Are sure you want to send this message?')) {
            $('[name=send]').click();
        }
        return false;
    });
}
//
// ========================
// Keyboard Shortcuts Help
// ========================
//
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
                        <table id="rksPtable"> \
                        <tbody> \
                        <tr><td class="m pl">Ctrl + Shift + f<br>&#8984; + Shift + f</td><td>Change "From:" address</td></tr> \
                        <tr><td>&nbsp;</td></tr> \
                        <tr><td class="m pl">Ctrl + Shift + t<br>&#8984; + Shift + t</td><td>Add "To:" recipients</td><td class="pl">&larr; This command does not work in Chrome unless<br>Runbox is opened via <a href="https://support.google.com/chrome/answer/95710?hl=en" target="_blank">Application Shortcut</a>.</td></tr> \
                        <tr><td>&nbsp;</td></tr> \
                        <tr><td class="m pl">Ctrl + Shift + c<br>&#8984; + Shift + c</td><td>Add "CC:" recipients</td></tr> \
                        <tr><td>&nbsp;</td></tr> \
                        <tr><td class="m pl">Ctrl + Shift + b<br>&#8984; + Shift + b</td><td>Add "BCC:" recipients</td></tr> \
                        <tr><td>&nbsp;</td></tr> \
                        <tr><td class="m pl">Ctrl + Shift + s<br>&#8984; + Shift + s</td><td>Edit subject</td></tr> \
                        <tr><td>&nbsp;</td></tr> \
                        <tr><td class="m pl">Ctrl + Shift<br>&#8984; + Shift</td><td>Edit body</td></tr> \
                        <tr><td>&nbsp;</td></tr> \
                        <tr><td class="m pl">Ctrl + s<br>&#8984; + s</td><td>Save draft</td></tr> \
                        <tr><td>&nbsp;</td></tr> \
                        <tr><td class="m pl">Ctrl + Enter<br>&#8984; + Enter</td><td>Send message</td></tr> \
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
                        <tr><td class="m pl">r</td><td>Reply to message</td></tr> \
                        <tr><td class="m pl">a</td><td>Reply to all</td></tr> \
                        <tr><td class="m pl">f</td><td>Forward message</td></tr> \
                        <tr><td class="m pl">#</td><td>Delete message</td></tr> \
                        <tr><td>&nbsp;</td></tr> \
                        <tr><td class="m pl">/</td><td>Search mail</td></tr> \
                        <tr><td class="m pl">x or Space</td><td>Check message</td></tr> \
                        <tr><td class="m pl">Ctrl + a<br>&#8984; + a</td><td>Check All/None</td></tr> \
                        <tr><td class="m pl">Shift + i</td><td>Mark as read</td></tr> \
                        <tr><td class="m pl">Shift + u</td><td>Mark as unread</td></tr> \
                        <tr><td class="m pl">+ or =</td><td>Flag message</td></tr> \
                        <tr><td class="m pl">-</td><td>Unflag message</td></tr> \
                        <tr><td class="m pl">!</td><td>Report spam</td></tr> \
                        <tr><td class="m pl">@</td><td>Not spam</td></tr> \
                        </tbody> \
                        </table> \
                        <table id="rksPtable"> \
                        <tbody> \
                        <tr><td class="h pl">Navigation</td></tr> \
                        <tr><td class="m pl">u</td><td>Refresh message list</td></tr> \
                        <tr><td class="m pl">k or Down</td><td>Next message</td></tr> \
                        <tr><td class="m pl">j or Up</td><td>Previous message</td></tr> \
                        <tr><td class="m pl">Ctrl + .<br>&#8984; + .</td><td>Next inbox section</td></tr> \
                        <tr><td class="m pl">Ctrl + ,<br>&#8984; + ,</td><td>Previous inbox section</td></tr> \
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
//
// Append popup CSS to head
$('head').append (
    '<style media="screen" type="text/css"> \
    #rksPdiv { \
        font-family: inherit; \
        background-color:#fff; \
        border-radius:15px; \
        color: #222; \
        display:none; \
        padding:20px; \
        min-width: 360px; \
        min-height: 180px; \
    } \
    #rksPtitle { \
        font-size: 14px; \
        font-weight: bold; \
        line-height: 1em; \
    } \
    #rksPtable { \
        float: left; \
        padding-top: 14px !important; \
    } \
    #rksPtable td { \
        color: #222 !important; \
        font-size: 12px !important; \
        line-height: 1.1em; \
        padding-right: 2em; \
        horizontal-align: left; \
        vertical-align: top; \
    } \
    #rksPtable td.pl { \
        padding-left: 1em; \
    } \
    #rksPtable td.h { \
       font-weight: bold; \
       border-left: 1px solid #ABCDEF; \
    } \
    #rksPtable td.m { \
       font-family: monospace; \
       border-left: 1px solid #ABCDEF; \
    } \
    .b-close { \
        cursor:pointer; \
        border-radius: 7px; \
        box-shadow: none; \
        font: bold 16px sans-serif !important; \
        padding: 0px 6px 3px; \
        position: absolute; \
        right: -7px; \
        top: -9px; \
        background-color: #2B91AF; \
        color: #FFF; \
        text-shadow: none; \
    }'
);
//
// Append popup HTML to body
$('body').append (
    '<div id="rksPdiv"> \
    <a class="b-close">x<a/> \
    ' + rksPcontent + ' \
    </div>'
);
//
// Open keyboard shortcuts help
Mousetrap.bind('?', function() {
    $('#rksPdiv').bPopup();
    return false;
});
