document.addEventListener("DOMContentLoaded",()=>{

 const notesContainer =
 document.querySelector(
 '[data-testid="widget-notes"]'
 );

 const sessionsContainer =
 document.querySelector(
 '[data-testid="widget-sessions"]'
 );


 // LOAD NOTES
 chrome.storage.local.get(
  "notes",
  (data)=>{
    notesContainer.textContent =
      data.notes || "No Notes Saved";
  }
 );


 // LOAD SESSIONS
 chrome.storage.local.get(
  "sessions",
  (data)=>{

   const sessions =
     data.sessions || {};

   sessionsContainer.innerHTML="";

   for(const name in sessions){

     const div =
       document.createElement("div");

     div.textContent = name;

     sessionsContainer.appendChild(div);
   }

 });

});