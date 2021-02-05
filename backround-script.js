'use strict';

const translateScript = {
  matches: ['*://*.com/*'],
  js: [{file : "./translate-script.js"}],
  runAt: "document_idle"
}
let registeredScript = null;

// -------------- translate script toggle --------------

async function processChange(request){
  if (request.toggle){
    registeredScript = await browser.contentScripts.register(translateScript);
  }
  else {
    if (registeredScript){
      registeredScript.unregister();
    }
  }
}

browser.runtime.onMessage.addListener(processChange);
