class Node {
  constructor(val){
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor(){
    this.head = null;
  }

  insert(val){
    let newNode = new Node(val);

    if(!this.head){
      this.head = newNode;
      return;
    }

    let temp = this.head;
    while(temp.next){
      temp = temp.next;
    }
    temp.next = newNode;
  }

  delete(){
    if(!this.head) return;

    if(!this.head.next){
      this.head = null;
      return;
    }

    let temp = this.head;
    while(temp.next.next){
      temp = temp.next;
    }
    temp.next = null;
  }

  /* 🔥 STEP WITH MEMORY */
  getSteps(type,val){
    let steps=[];

    if(type==="insert"){
      this.insert(val);

      steps.push({
        action:"Insert "+val,
        state:this.getState(),
        memory:{
          head:this.getState()
        }
      });
    }

    if(type==="delete"){
      this.delete();

      steps.push({
        action:"Delete",
        state:this.getState(),
        memory:{
          head:this.getState()
        }
      });
    }

    return steps;
  }

  getState(){
    let arr=[];
    let temp=this.head;
    while(temp){
      arr.push(temp.val);
      temp=temp.next;
    }
    return arr;
  }

  /* 🔥 POINTER VISUAL */
  visualize(state){
    return `
      <div>
        ${state.map((x,i)=>`
          <div class="node">
            <div class="box">${x}</div>
            <div class="pointer-arrow">↓</div>
          </div>
          ${i<state.length-1?'<span class="arrow">→</span>':''}
        `).join("")}
        → NULL
      </div>
    `;
  }
}