var link = document.createElement('link');
link.setAttribute('rel', 'import');
link.setAttribute('href', chrome.extension.getURL('scripts/build.html'));
link.onload = function() {
  var button = document.createElement('main-button');
  document.body.appendChild(button);
};
document.head.appendChild(link);


function writeChar(char) {
    document.querySelector('.ace_text-input').value = char;

    testKeydown = new KeyboardEvent('keydown', {});
    document.querySelector('.ace_text-input').dispatchEvent(testKeydown);

    testKeypress = new KeyboardEvent('keypress', {});
    document.querySelector('.ace_text-input').dispatchEvent(testKeypress);

    testInput = new KeyboardEvent('input', {});
    document.querySelector('.ace_text-input').dispatchEvent(testInput);

    testKeyup = new KeyboardEvent('keyup', {});
    document.querySelector('.ace_text-input').dispatchEvent(testKeyup);
}

function clear(callback) {
  click('.goog-inline-block.goog-flat-menu-button.custom-reset-button');
  setTimeout(function(){
    click('.goog-menuitem.editor-custom-save-item');
    callback();
  }, 2000);
}

function click(eleQuery) {
    var clickEvent = new MouseEvent('mouseover',{bubbles:true});
    document.querySelector(eleQuery).dispatchEvent(clickEvent);
    
    clickEvent = new MouseEvent('mousedown',{bubbles:true});
    document.querySelector(eleQuery).dispatchEvent(clickEvent);

    clickEvent = new MouseEvent('mouseup',{bubbles:true});
    document.querySelector(eleQuery).dispatchEvent(clickEvent);
    clickEvent = new MouseEvent('click',{bubbles:true});
    document.querySelector(eleQuery).dispatchEvent(clickEvent);
}

function getLocalEEScript() {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = alertContents;
  httpRequest.open('GET', 'http://127.0.0.1:9812/pixel-selector.js');
  httpRequest.send();

  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      writeChar(httpRequest.responseText);

      // var click = new MouseEvent('click');
      // document.querySelector('.goog-button.run-button').dispatchEvent(click);
    }
  }

}

function loadList() {

  var httpRequest2 = new XMLHttpRequest();
  httpRequest2.onreadystatechange = done;
  httpRequest2.open('GET', 'http://127.0.0.1:9812/_/list');
  httpRequest2.send();

  function done() {
    if (httpRequest2.readyState === XMLHttpRequest.DONE) {

      var files = JSON.parse(httpRequest2.responseText);
      console.log(files);
    }
  }
}

function onPolymerReady() {
  
}

setTimeout(function(){


  // var script = document.createElement('script');
  // script.setAttribute('src', chrome.extension.getURL('scripts/build.js'));
  // script.onload = resolve();
  // document.head.appendChild(script);
  

  // var button = document.createElement('button');
  // document.body.appendChild(button);
  // button.innerHTML = 'Reload local script';
  // button.style.position = 'fixed';
  // button.style.zIndex = 10000;
  // button.style.bottom = 0;
  // button.style.right = 0;
  
  // button.addEventListener('click', function(){
  //   setTimeout(function(){
  //     clear(function(){
  //       setTimeout(getLocalEEScript, 2000);
  //     });
  //   }, 1000);

  // });

  getLocalEEScript();
}, 3000);

