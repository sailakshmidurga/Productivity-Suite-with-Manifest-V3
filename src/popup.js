// ============================
// NOTES FEATURE (STEP 3)
// ============================

const textarea =
document.querySelector('[data-testid="notes-textarea"]');

const saveNotesBtn =
document.querySelector('[data-testid="save-notes-btn"]');

// Load Notes
document.addEventListener("DOMContentLoaded", () => {

  chrome.storage.local.get("notes", (data) => {
    textarea.value = data.notes || "";
  });

  loadSessions();
});

// Save Notes
saveNotesBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    notes: textarea.value
  });
});


// ============================
// STEP 4 - SAVE TAB SESSION
// ============================

const saveSessionBtn =
document.querySelector('[data-testid="save-session-btn"]');

saveSessionBtn.addEventListener("click", async () => {

  const sessionName =
    prompt("Enter Session Name");

  if (!sessionName) return;

  const tabs =
    await chrome.tabs.query({
      currentWindow: true
    });

  const urls =
    tabs.map(tab => tab.url);

  chrome.storage.local.get("sessions", (data) => {

    const sessions =
      data.sessions || {};

    sessions[sessionName] = urls;

    chrome.storage.local.set({ sessions }, () => {
      alert("Session Saved ");
      loadSessions();
    });

  });

});


// ============================
// SHOW SAVED SESSIONS
// ============================

function loadSessions(){

 const container =
 document.querySelector(
 '[data-testid="sessions-list"]'
 );

 chrome.storage.local.get("sessions",(data)=>{

   const sessions =
     data.sessions || {};

   container.innerHTML = "";

   for(const name in sessions){

     const wrapper =
       document.createElement("div");

     wrapper.style.marginBottom="8px";

     // Session Name
     const title =
       document.createElement("span");

     title.textContent = name;

     // Restore Button
     const restoreBtn =
       document.createElement("button");

     restoreBtn.textContent="Restore";

     //  REQUIRED TEST ID
     restoreBtn.setAttribute(
       "data-testid",
       `restore-session-${name}`
     );

     restoreBtn.onclick = ()=>{

       const urls = sessions[name];

       chrome.windows.create({
         url: urls
       });

     };

     wrapper.appendChild(title);
     wrapper.appendChild(restoreBtn);

     container.appendChild(wrapper);
   }

 });

}