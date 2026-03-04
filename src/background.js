console.log("Service Worker Running");


// ===============================
// WEBSITE BLOCKING
// ===============================
chrome.tabs.onUpdated.addListener(
 async (tabId, changeInfo, tab) => {

  if(changeInfo.status !== "loading")
    return;

  if(!tab.url) return;

  const data =
   await chrome.storage.sync.get("blockedSites");

  const blockedSites =
   data.blockedSites || [];

  const isBlocked =
   blockedSites.some(site =>
     tab.url.includes(site)
   );

  if(isBlocked){
    chrome.tabs.update(tabId,{
      url: chrome.runtime.getURL(
        "blocked.html"
      )
    });
  }
});


// ===============================
// KEYBOARD SHORTCUT
// ===============================
chrome.commands.onCommand.addListener(
 async (command)=>{

  if(command === "save-session"){

   const tabs =
   await chrome.tabs.query({
     currentWindow:true
   });

   const urls =
    tabs.map(t=>t.url);

   chrome.storage.local.get(
    "sessions",
    (data)=>{

     const sessions =
      data.sessions || {};

     sessions["quick-save"] =
       urls;

     chrome.storage.local.set({
       sessions
     });

   });

  }
});


// ===============================
// CONTEXT MENU
// ===============================
chrome.runtime.onInstalled.addListener(()=>{

 chrome.contextMenus.create({
   id:"save-selection",
   title:"Save text as Note",
   contexts:["selection"]
 });

});


chrome.contextMenus.onClicked.addListener(
 (info)=>{

  if(info.menuItemId === "save-selection"){

   const selectedText =
     info.selectionText;

   chrome.storage.local.get(
    "notes",
    (data)=>{

     const oldNotes =
       data.notes || "";

     const updated =
       oldNotes + "\n" + selectedText;

     chrome.storage.local.set({
       notes: updated
     });

   });

  }

});