class Stack {
  constructor(){
    this.data=[];
  }

  insert(val){
    this.data.push(val);
  }

  delete(){
    this.data.pop();
  }

  getSteps(type,val){
    let steps=[];

    if(type==="insert"){
      this.insert(val);

      steps.push({
        action:"Push "+val,
        state:[...this.data],
        memory:{
          stack:[...this.data],
          top:this.data.length-1
        }
      });
    }

    if(type==="delete"){
      this.delete();

      steps.push({
        action:"Pop",
        state:[...this.data],
        memory:{
          stack:[...this.data],
          top:this.data.length-1
        }
      });
    }

    return steps;
  }

  getState(){
    return [...this.data];
  }

  visualize(state){
    return `
      <div>
        ${state.map((x,i)=>
          `<div class="box ${i===state.length-1?'pointer':''}">${x}</div>`
        ).reverse().join("")}
      </div>
    `;
  }
}