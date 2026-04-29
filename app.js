let currentDS="";
let data=[];
let graph={nodes:[],edges:[]};

let steps=[];
let currentStep=0;
let isPlaying=false;
let speed=800;

function selectDS(ds){
    currentDS=ds;
    document.getElementById("title").innerText=ds;

    document.getElementById("operations").innerHTML=`
    <input id="valueInput" placeholder="value">
    <button onclick="insert()">Insert</button>
    <button onclick="deleteItem()">Delete</button>

    <br><br>
    <input id="startNode" placeholder="Start Node">
    <button onclick="generateBFS()">Generate BFS</button>
    <button onclick="generateDFS()">Generate DFS</button>

    <br>
    <button onclick="prevStep()">⏮</button>
    <button onclick="play()">▶</button>
    <button onclick="pause()">⏸</button>
    <button onclick="nextStep()">⏭</button>
    `;
}

function insert(){
    let val=document.getElementById("valueInput").value;

    if(currentDS==="graph"){
        graph.nodes.push({id:val,x:Math.random()*500,y:Math.random()*300});
    } else{
        data.push(val);
    }

    visualize();
}

function deleteItem(){
    data.pop();
    visualize();
}

function visualize(){
    let area=document.getElementById("visualArea");
    area.innerHTML="";

    if(currentDS==="graph") visualizeGraph();
}

function visualizeGraph(){
    let area=document.getElementById("visualArea");

    let canvas=document.createElement("canvas");
    canvas.width=600;
    canvas.height=350;
    area.appendChild(canvas);

    let ctx=canvas.getContext("2d");

    graph.edges.forEach(e=>{
        let n1=graph.nodes.find(n=>n.id==e.from);
        let n2=graph.nodes.find(n=>n.id==e.to);

        if(n1 && n2){
            ctx.beginPath();
            ctx.moveTo(n1.x,n1.y);
            ctx.lineTo(n2.x,n2.y);
            ctx.stroke();
        }
    });

    graph.nodes.forEach(n=>{
        ctx.beginPath();
        ctx.arc(n.x,n.y,20,0,Math.PI*2);
        ctx.fillStyle="pink";
        ctx.fill();
        ctx.fillStyle="white";
        ctx.fillText(n.id,n.x-5,n.y+5);
    });
}

function getNeighbors(node){
    let arr=[];
    graph.edges.forEach(e=>{
        if(e.from==node) arr.push(e.to);
        if(e.to==node) arr.push(e.from);
    });
    return arr;
}

/* BFS */
function generateBFS(){
    steps=[];
    let start=document.getElementById("startNode").value;
    let visited=new Set();
    let queue=[start];

    while(queue.length){
        let n=queue.shift();

        if(!visited.has(n)){
            visited.add(n);

            steps.push({
                node:n,
                queue:[...queue],
                visited:[...visited]
            });

            getNeighbors(n).forEach(x=>{
                if(!visited.has(x)) queue.push(x);
            });
        }
    }

    currentStep=0;
    renderStep();
}

/* DFS */
function generateDFS(){
    steps=[];
    let start=document.getElementById("startNode").value;
    let visited=new Set();

    function dfs(n){
        if(visited.has(n)) return;

        visited.add(n);

        steps.push({
            node:n,
            visited:[...visited]
        });

        getNeighbors(n).forEach(dfs);
    }

    dfs(start);
    currentStep=0;
    renderStep();
}

/* PLAYBACK */
function renderStep(){
    visualizeGraph();

    let step=steps[currentStep];
    if(!step) return;

    let canvas=document.querySelector("canvas");
    let ctx=canvas.getContext("2d");

    let n=graph.nodes.find(x=>x.id==step.node);

    if(n){
        ctx.beginPath();
        ctx.arc(n.x,n.y,20,0,Math.PI*2);
        ctx.fillStyle="yellow";
        ctx.fill();
    }

    document.getElementById("memoryPanel").innerHTML=
    `Step:${currentStep}<br>Visited:${step.visited}<br>Queue:${step.queue||[]}`;
}

function nextStep(){
    if(currentStep<steps.length-1){
        currentStep++;
        renderStep();
    }
}

function prevStep(){
    if(currentStep>0){
        currentStep--;
        renderStep();
    }
}

function play(){
    isPlaying=true;

    function loop(){
        if(!isPlaying) return;
        nextStep();
        if(currentStep<steps.length-1)
            setTimeout(loop,speed);
    }

    loop();
}

function pause(){
    isPlaying=false;
}