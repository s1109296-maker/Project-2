let dsType = localStorage.getItem("ds");
document.getElementById("title").innerText = dsType;

if(dsType==="stack") structure=new Stack();
if(dsType==="queue") structure=new Queue();
if(dsType==="cqueue") structure=new CircularQueue(5);
if(dsType==="linkedlist") structure=new LinkedList();
if(dsType==="cll") structure=new CircularLinkedList();
if(dsType==="tree") structure=new Tree();
if(dsType==="graph") structure=new Graph();

/* CODE PANEL */
function highlightCode(line){
  let code=["1. insert(x)","2. delete()"];
  document.getElementById("code").innerHTML =
    code.map((l,i)=>`<div class="${i+1===line?'highlight':''}">${l}</div>`).join("");
}

/* RENDER */
function render(state){
  document.getElementById("visual").innerHTML = structure.visualize(state);
}

/* ICON */
function getIcon(t){
  return {stack:"📚",queue:"🚶",cqueue:"🔄",linkedlist:"🔗",cll:"🔁",tree:"🌳",graph:"🕸️"}[t];
}

/* FILE LIST */
function loadFileList(){
  let html="";
  for(let k in localStorage){
    try{
      let d=JSON.parse(localStorage.getItem(k));
      if(d && d.type){
        let preview = d.data?.slice(0,3).join(", ") || "empty";

        html+=`
        <div class="file-item">
          <div onclick="loadFromList('${k}')">
            ${getIcon(d.type)} <b>${k}</b>
            <div class="preview">[${preview}]</div>
          </div>
          <span onclick="deleteFile('${k}')">❌</span>
        </div>`;
      }
    }catch(e){}
  }
  document.getElementById("fileList").innerHTML = html;
}

/* FILE SYSTEM */
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
  if(dsType==="cqueue") structure=new CircularQueue(5);
  if(dsType==="linkedlist") structure=new LinkedList();
  if(dsType==="cll") structure=new CircularLinkedList();

  structure.data = d.data;
  render(d.data);
}

function deleteFile(name){
  localStorage.removeItem(name);
  loadFileList();
}

function filterFiles(){
  let v=document.getElementById("searchBox").value.toLowerCase();
  document.querySelectorAll(".file-item").forEach(i=>{
    i.style.display=i.innerText.toLowerCase().includes(v)?"block":"none";
  });
}

loadFileList();