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
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version     3.0
// @grant       none
// ==/UserScript==
// FUNCTIONS AND VARIABLES
// Get Element by XPath
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
};
// Get Variables from URL
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}
// Get Message Value
var rksMessageValue = getUrlParameter('message');
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
$('head').append ('<style type="text/css" media="screen"> .submenu ul li ul.sub{z-index:7}.rksMailrowFocus{position:relative}.rksMailrowFocus::before{display:block;content:".";color:transparent;font-size:0;border-left:6px solid #2E7AB6;height:100%;position:absolute;left:-6px;padding:1px 0;top:-1px;bottom:-1px}.rksMailrowFocus::after{display:block;content:".";color:transparent;font-size:0;border-left:5px solid #2E7AB6;height:100%;position:absolute;right:-5px;padding:1px 0;top:-1px;bottom:-1px}</style>');
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
    $('#menuFlag a')[0].click()
});
// Unflag message
Mousetrap.bind('-', function() {
    $('#menuUnflag a')[0].click()
});
// Report spam
Mousetrap.bind('!', function() {
    $('#menuSpam a')[0].click()
});
// Not Spam
Mousetrap.bind('@', function() {
    $('#menuNotSpam a')[0].click()
});
// Reply to message
Mousetrap.bind('r', function() {
    if (rksRunboxView == 'read') {
    	$('#menuReply a')[0].click()
    }
});
// Reply to all
Mousetrap.bind('a', function() {
    if (rksRunboxView == 'read') {
    	$('#menuReplyAll a')[0].click()
    }
});
// Forward message
Mousetrap.bind('f', function() {
	if (rksRunboxView == 'read') {
		$('#menuForward a')[0].click()
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
    } waitForKeyElements('.mailrow:first', (function (callback) {
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
        // Open message
        Mousetrap.bind(['enter','o'], function() {
            divs[selectedDiv].getElementsByClassName('subjectlink')[0].click();
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
    // From address resize
    var fromSel = $('[name=from]')[0];
    fromSel.onblur = function() {
        fromSel.size = 1;
    }
    // Change From address
    Mousetrap.bindGlobal('mod+shift+f', function() {
        var fromLen = fromSel.options.length;
        fromSel.size = fromLen;
        fromSel.focus();
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
$('head').append ('<style type="text/css" media="screen"> #rksPdiv{font-family:inherit;background-color:#fff;border-radius:15px;color:#222;display:none;padding:20px;min-width:360px;min-height:180px}#rksPtitle{font-size:14px;font-weight:700;line-height:1em;margin-top:-4px}#rksPtable{float:left;padding-top:14px!important}#rksPtable td{color:#222!important;font-size:12px!important;line-height:1.1em;padding-right:2em;horizontal-align:left;vertical-align:top}#rksPtable td.e{padding-bottom:1em}#rksPtable td.pl{padding-left:1em}#rksPtable td.h{font-weight:700;border-left:1px solid #ABD2FD}#rksPtable td.m{font-family:monospace;border-left:1px solid #ABD2FD}.b-close{cursor:pointer;border-radius:7px;box-shadow:none;font:700 16px sans-serif!important;padding:0 6px 3px;position:absolute;right:-7px;top:-9px;background-color:#155D97;color:#FFF;text-shadow:none}a.b-close:hover{color:#000}</style> \
<style type="text/css" media="print"> #rksPdiv{display:none}</style>');
// Append popup HTML to body
$('body').append (
    '<div id="rksPdiv"> \
    <a class="b-close">x</a> \
    ' + rksPcontent + ' \
    </div>');
