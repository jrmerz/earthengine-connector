/**
 * Load Polymer
 */
var link = document.createElement('link');
link.setAttribute('rel', 'import');
link.setAttribute('href', chrome.extension.getURL('scripts/build.html'));
link.onload = function() {
  /**
   * Inject App Elements
   */
  var button = document.createElement('main-button');
  document.body.appendChild(button);
};

document.head.appendChild(link);