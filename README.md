# Runbox Keyboard Shortcuts

Adds keyboard shortcuts to the Runbox.com Webmail client.

View complete list of shortcuts: [RunboxKeyboardShortcuts.md](https://github.com/RunboxScripts/RunboxKeyboardShortcuts/blob/master/RunboxKeyboardShortcuts.md)

Once installed, press **?** ( Shift + / ) to see a list of available shortcuts.

## How to install

Make sure you meet the requirements below. Then click this link:

<https://raw.githubusercontent.com/RunboxScripts/RunboxKeyboardShortcuts/master/RunboxKeyboardShortcuts.user.js>

### Requirements

1. You need a web browser that can run user scripts:

   * Firefox with Greasemonkey: <https://addons.mozilla.org/en-US/firefox/addon/greasemonkey>
   * Chrome with Tampermonkey: <https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo>
   * Opera (not tested)

2. You need the "New" Search bar:
![New Search Bar](https://cloud.githubusercontent.com/assets/9103375/11760387/94473aba-a04d-11e5-9fd2-dcf014abdf89.jpg)

3. You need to enable Runbox Webmail Enhanced Mode:

   * Scroll to the bottom left and click "Switch to Runbox Enhanced":

   ![Switch to Runbox Enhanced](https://cloud.githubusercontent.com/assets/9103375/11760358/9859883e-a04c-11e5-8dcb-b5fccd44b1d6.jpg)

   * When Enhanced mode is enabled, the link will show: "Switch to Runbox Basic"

   ![Switch to Runbox Basic](https://cloud.githubusercontent.com/assets/9103375/11760368/0ff84ac4-a04d-11e5-83fc-555b6f16325b.jpg)

## Support

[Open an issue](https://github.com/RunboxScripts/RunboxKeyboardShortcuts/issues) or email us: runboxscripts@runbox.com

Feel free to:

* Ask **any** questions
* Report bugs and problems
* Suggest new key shortcuts

We look forward to hearing from you, thanks!

## Changelog

* 2.9: Fix improper binding on "Show all fields" command.

* 2.8: Added "Show all fields" command in compose view. Clarified keybind explanations.

* 2.7: Extended next/previous functionality to individual message views. Redefined selectors for multiple keybinds. Fixed various bugs.

* 2.6: Added print CSS stylesheet. Improved & minified all CSS.

* 2.5: Reverted change to "Show HTML version" keybind.

* 2.4: Improved message focus logic. Fixed bug where checkboxes were stealing focus after an AJAX refresh.

* 2.3: Rebound "Refresh message list" to new target.

* 2.2: Improved visibility of message focus indicator.

* 2.1: Clarified shortcut details. Cleaned up CSS and JS notation.

* 2.0: Added support for new Aero theme. Backwards compatible with old themes.

  * Changed message selection styling to fit with Aero theme.
  * Fixed bug where checkbox was auto-stealing focus.
  * Mouseover no longer affects message selection focus.

* 1.4: Updated message selection method.

* 1.3: Changed message selection color.

* 1.2: Fixed bug where j/k keybinds were accidentally inverted.

* 1.1: Redefined next panel/previous panel keybinds. Added forward window to compose state. Script now properly recognizes the compose window when forwarding a message.

* 1.0: Initial commit.
