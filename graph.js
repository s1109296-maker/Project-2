class Graph {
  constructor(){
    this.adjList = {};
    this.nodes = [];
  }

  /* ADD NODE */
  insert(val){
    if(!this.adjList[val]){
      this.adjList[val] = [];
      this.nodes.push(val);
    }
  }

  /* REMOVE NODE */
  delete(){
    let val = this.nodes.pop();
    delete this.adjList[val];

    for(let key in this.adjList){
      this.adjList[key] = this.adjList[key].filter(v => v !== val);
    }
  }

  /* ADD EDGE */
  addEdge(u, v){
    if(!this.adjList[u]) this.insert(u);
    if(!this.adjList[v]) this.insert(v);

    this.adjList[u].push(v);
    this.adjList[v].push(u);
  }

  /* GET STATE */
  getState(){
    return {
      nodes: this.nodes,
      adj: this.adjList
    };
  }

  /* 🔥 BFS ANIMATION STEPS */
  bfs(start){
    let visited = {};
    let queue = [start];
    let steps = [];

    visited[start] = true;

    while(queue.length){
      let node = queue.shift();

      steps.push({
        type: "visit",
        current: node,
        visited: {...visited}
      });

      for(let nei of this.adjList[node]){
        if(!visited[nei]){
          visited[nei] = true;
          queue.push(nei);

          steps.push({
            type: "enqueue",
            from: node,
            to: nei
          });
        }
      }
    }

    return steps;
  }

  /* 🔥 DFS ANIMATION STEPS */
  dfs(start){
    let visited = {};
    let steps = [];

    const dfsVisit = (node) => {
      visited[node] = true;

      steps.push({
        type: "visit",
        current: node,
        visited: {...visited}
      });

      for(let nei of this.adjList[node]){
        if(!visited[nei]){
          steps.push({
            type: "explore",
            from: node,
            to: nei
          });

          dfsVisit(nei);
        }
      }
    };

    dfsVisit(start);
    return steps;
  }

  /* 🔥 VISUALIZATION */
  visualize(state){
    let nodes = state.nodes;

    return `
      <div style="display:flex;flex-wrap:wrap;justify-content:center;">
        ${nodes.map(n=>`
          <div class="box" id="node-${n}">${n}</div>
        `).join("")}
      </div>
    `;
  }
}