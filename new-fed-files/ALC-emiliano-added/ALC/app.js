
var tabid;




function addinventory(that) {

  var e = document.getElementById("user-select");
  var strUser = e.options[e.selectedIndex].value;

  /*chrome.tabs.executeScript(null,	{code:"appendCompiler('"+strUser+"');"});*/
  chrome.scripting.executeScript(
    {
      target: { tabId: tabid, allFrames: true },
      func: (args) => {appendCompiler(args)},
      args: [strUser]
    }
  );


  var selectx = document.getElementById("user-select");
  var user = selectx.options[selectx.selectedIndex].value;
  localStorage.setItem("user", user);

}



window.onload = function () {
  document.getElementById("gobtn").onclick = addinventory;
  document.onkeydown = keydown;
  getTabIDd();
  var user = localStorage.getItem("user");
  if (user != null) {
    document.getElementById("user-select").value = user;


   
    
  }
};


function keydown(e) {
  if(e.altKey  && e.keyCode == 87){
    document.getElementById("gobtn").click();
    window.close();
  } 
}  


function getTabID() {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.query({
        currentWindow: true,
        active: true
      }, function (tabs) {
        resolve(tabs[0].id);
      })
    } catch (e) {
      reject(e);
    }
  })
}
async function getTabIDd() {
  tabid = await getTabID();
}






