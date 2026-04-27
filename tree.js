class TreeNode {
  constructor(val){
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(){
    this.root = null;
    this.nodes = [];
  }

  /* INSERT (LEVEL ORDER for visualization) */
  insert(val){
    let newNode = new TreeNode(val);
    this.nodes.push(newNode);

    if(this.nodes.length === 1){
      this.root = newNode;
      return;
    }

    let parentIndex = Math.floor((this.nodes.length - 2) / 2);
    let parent = this.nodes[parentIndex];

    if(!parent.left){
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }
  }

  /* DELETE LAST NODE */
  delete(){
    if(this.nodes.length === 0) return;

    this.nodes.pop();

    // rebuild tree
    this.root = null;
    let temp = [...this.nodes];
    this.nodes = [];

    temp.forEach(n => this.insert(n.val));
  }

  /* BFS STEPS */
  bfs(){
    let steps = [];
    let queue = [this.root];

    while(queue.length){
      let node = queue.shift();

      if(!node) continue;

      steps.push({
        action: "Visit " + node.val,
        current: node.val
      });

      queue.push(node.left);
      queue.push(node.right);
    }

    return steps;
  }

  /* DFS (Preorder) */
  dfs(){
    let steps = [];

    const traverse = (node)=>{
      if(!node) return;

      steps.push({
        action: "Visit " + node.val,
        current: node.val
      });

      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);
    return steps;
  }

  getState(){
    return this.root;
  }

  /* VISUAL TREE */
  visualize(node){
    if(!node) return "";

    return `
      <div style="text-align:center;">
        <div class="box">${node.val}</div>
        <div style="display:flex;justify-content:center;">
          <div>${this.visualize(node.left)}</div>
          <div>${this.visualize(node.right)}</div>
        </div>
      </div>
    `;
  }
}