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



// function clear(callback) {
//   click('.goog-inline-block.goog-flat-menu-button.custom-reset-button');
//   setTimeout(function(){
//     click('.goog-menuitem.editor-custom-save-item');
//     callback();
//   }, 2000);
// }

// function click(eleQuery) {
//     var clickEvent = new MouseEvent('mouseover',{bubbles:true});
//     document.querySelector(eleQuery).dispatchEvent(clickEvent);

//     clickEvent = new MouseEvent('mousedown',{bubbles:true});
//     document.querySelector(eleQuery).dispatchEvent(clickEvent);

//     clickEvent = new MouseEvent('mouseup',{bubbles:true});
//     document.querySelector(eleQuery).dispatchEvent(clickEvent);
//     clickEvent = new MouseEvent('click',{bubbles:true});
//     document.querySelector(eleQuery).dispatchEvent(clickEvent);
// }
