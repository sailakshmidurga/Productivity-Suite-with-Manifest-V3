// STEP 6 FIXED VERSION

document.addEventListener("DOMContentLoaded", () => {

  const input =
  document.querySelector(
   '[data-testid="block-hostname-input"]'
  );

  const addBtn =
  document.querySelector(
   '[data-testid="add-block-btn"]'
  );

  const listContainer =
  document.querySelector(
   '[data-testid="blocked-sites-list"]'
  );


  // LOAD BLOCKED SITES
  function loadBlockedSites(){

    chrome.storage.sync.get(
      ["blockedSites"],
      (result)=>{

        const sites =
          result.blockedSites || [];

        listContainer.innerHTML="";

        sites.forEach(site=>{

          const div =
          document.createElement("div");

          div.textContent = site;

          listContainer.appendChild(div);

        });

      }
    );
  }


  // ADD WEBSITE BUTTON
  addBtn.addEventListener("click", ()=>{

    const hostname =
      input.value.trim();

    if(!hostname){
      alert("Enter hostname");
      return;
    }

    chrome.storage.sync.get(
      ["blockedSites"],
      (result)=>{

        let sites =
          result.blockedSites || [];

        if(!sites.includes(hostname)){
          sites.push(hostname);
        }

        chrome.storage.sync.set(
          { blockedSites: sites },
          ()=>{

            input.value="";
            loadBlockedSites();

          }
        );

      }
    );

  });


  // INITIAL LOAD
  loadBlockedSites();

});

// EXPORT DATA FEATURE

const exportBtn =
document.querySelector(
 '[data-testid="export-data-btn"]'
);

exportBtn.addEventListener("click", async ()=>{

 // GET LOCAL DATA
 const localData =
 await chrome.storage.local.get(null);

 // GET SYNC DATA
 const syncData =
 await chrome.storage.sync.get(null);

 // MERGE DATA
 const allData = {
   ...localData,
   ...syncData
 };

 const blob =
 new Blob(
   [JSON.stringify(allData,null,2)],
   {type:"application/json"}
 );

 const url =
 URL.createObjectURL(blob);

 chrome.downloads.download({
   url:url,
   filename:
   "productivity_suite_export.json",
   saveAs:true
 });

});