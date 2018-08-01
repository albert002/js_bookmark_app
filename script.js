//Getting the form and adding event listener
document.getElementById("form").addEventListener("submit",savebookmark);

function savebookmark(e){
  //Geting the values
  var siteName = document.getElementById("name").value;
  var siteUrl = document.getElementById("url").value;

  //Validating form
  if(!siteUrl || !siteName){
    alert("Please fill the forms");
    return false;
  }

  var bookmark = {
    siteName:siteName,
    siteUrl:siteUrl
  }

//Check if localstorage is empty create variable and assign it [] else get the data and push new item
  if(localStorage.getItem("bookmarks") === null){
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
  }else{
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
  }
  fetchData();

  //Reseting form fils
  document.getElementById("form").reset()
  e.preventDefault();
}

//Delete bookmarks
function deleteBookmark(url){
var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
for(let i = 0; i < bookmarks.length;i++){
  if(bookmarks[i].siteUrl == url){
    bookmarks.splice(i,1)
  }
}
localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
  fetchData()
}

//Show the data
function fetchData(){
  if(localStorage.getItem("bookmarks") === null){
    document.getElementById("root").innerHTML= "It's empty add something";
  }
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks")).reverse();
  document.getElementById("root").innerHTML= "";
  console.log(bookmarks)
  for(let i = 0 ; i< bookmarks.length;i++){
    document.getElementById("root").innerHTML += "<p>"+ bookmarks[i].siteName+"</p>" + "<a href=http://"+ bookmarks[i].siteUrl + " target='_blank' id='visit'>" +"VISIT" + "</a>" +"<a href='#' id='delete' onclick='deleteBookmark(\"" + bookmarks[i].siteUrl + "\")'>DELETE</a>"
  }
}
