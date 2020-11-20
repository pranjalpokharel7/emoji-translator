'use strict';

let registeredScript = null;

async function processToggle(request){
  console.log(request.toggle);
  if (request.toggle){
    registeredScript = await browser.contentScripts.register({
      matches: ['*://*.com/*'],
      js: [{file : "./translate-script.js"}],
      runAt: "document_idle"
    });
  }
  else {
    if (registeredScript){
      registeredScript.unregister();
    }
  }
}

browser.runtime.onMessage.addListener(processToggle);
