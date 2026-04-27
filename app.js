let dsType = localStorage.getItem("ds");
document.getElementById("title").innerText = dsType;

/* INIT */
if(dsType==="stack") structure = new Stack();
if(dsType==="queue") structure = new Queue();
if(dsType==="cqueue") structure = new CircularQueue(5);
if(dsType==="linkedlist") structure = new LinkedList();
if(dsType==="tree") structure = new Tree();
if(dsType==="graph") structure = new Graph();

/* CODE PANEL */
function highlightCode(line){
  let code = ["1. insert(x)","2. delete()"];
  document.getElementById("code").innerHTML =
    code.map((l,i)=>`<div class="${i+1===line?'highlight':''}">${l}</div>`).join("");
}

/* RENDER */
function render(state){
  document.getElementById("visual").innerHTML = structure.visualize(state);
}

/* FILE SYSTEM */
function getIcon(type){
  return {stack:"📚",queue:"🚶",cqueue:"🔄",linkedlist:"🔗",tree:"🌳",graph:"🕸️"}[type];
}

function loadFileList(){
  let list="";
  for(let k in localStorage){
    try{
      let d=JSON.parse(localStorage.getItem(k));
      if(d && d.type){
        list+=`
        <div class="file-item">
          <span onclick="loadFromList('${k}')">${getIcon(d.type)} ${k}</span>
          <span onclick="deleteFile('${k}')">❌</span>
        </div>`;
      }
    }catch(e){}
  }
  document.getElementById("fileList").innerHTML=list;
}

function createDS(){
  let name=document.getElementById("dsName").value;
  localStorage.setItem(name,JSON.stringify({type:dsType,data:[]}));
  loadFileList();
}

function saveDS(){
  let name=document.getElementById("dsName").value;
  localStorage.setItem(name,JSON.stringify({
    type:dsType,
    data:structure.getState()
  }));
  loadFileList();
}

function loadFromList(name){
  let d=JSON.parse(localStorage.getItem(name));
  dsType=d.type;

  if(dsType==="stack") structure=new Stack();
  if(dsType==="queue") structure=new Queue();

  structure.data=d.data;
  render(d.data);
}

function deleteFile(name){
  localStorage.removeItem(name);
  loadFileList();
}

function filterFiles(){
  let val=document.getElementById("searchBox").value.toLowerCase();
  document.querySelectorAll(".file-item").forEach(i=>{
    i.style.display=i.innerText.toLowerCase().includes(val)?"flex":"none";
  });
}

loadFileList();