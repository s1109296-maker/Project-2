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


/* RUN BFS */
function runBFS(){
  let start = prompt("Enter start node:");
  let steps = structure.bfs(start);
  animateGraph(steps);
}

/* RUN DFS */
function runDFS(){
  let start = prompt("Enter start node:");
  let steps = structure.dfs(start);
  animateGraph(steps);
}

/* GRAPH ANIMATION ENGINE */
function animateGraph(steps){
  let i = 0;

  function step(){
    if(i >= steps.length) return;

    let s = steps[i];

    if(s.type === "visit"){
      document.querySelectorAll(".box").forEach(b=>{
        b.classList.remove("pointer");
      });

      let node = document.getElementById("node-"+s.current);
      if(node){
        node.classList.add("pointer");
      }
    }

    if(s.type === "enqueue" || s.type === "explore"){
      let from = document.getElementById("node-"+s.from);
      let to = document.getElementById("node-"+s.to);

      if(from) from.style.background = "blue";
      if(to) to.style.background = "green";
    }

    i++;
    setTimeout(step, 800);
  }

  step();
}


function renderMemory(mem){
  let html = "";

  for(let key in mem){
    html += `
      <div class="mem-box">
        <b>${key}</b> : ${JSON.stringify(mem[key])}
      </div>
    `;
  }

  document.getElementById("memory").innerHTML = html;
}
if(dsType==="queue") structure = new Queue();
if(dsType==="tree") structure = new Tree();
function runTreeBFS(){
  let steps = structure.bfs();
  animateTraversal(steps);
}

function runTreeDFS(){
  let steps = structure.dfs();
  animateTraversal(steps);
}

function animateTraversal(steps){
  let i = 0;

  function run(){
    if(i >= steps.length) return;

    let s = steps[i];

    document.getElementById("status").innerText = s.action;

    // highlight node
    document.querySelectorAll(".box").forEach(b=>{
      b.classList.remove("pointer");
    });

    let el = document.querySelector(`.box:contains(${s.current})`);
    if(el) el.classList.add("pointer");

    i++;
    setTimeout(run, 800);
  }

  run();
}