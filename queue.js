class Queue {
  constructor(){
    this.data = [];
  }

  /* ENQUEUE */
  insert(val){
    this.data.push(val);
  }

  /* DEQUEUE */
  delete(){
    if(this.isEmpty()) return "Underflow";
    return this.data.shift();
  }

  /* FRONT ELEMENT */
  front(){
    return this.data[0];
  }

  isEmpty(){
    return this.data.length === 0;
  }

  /* STEP GENERATOR (for animation) */
  getSteps(type, val){
    let steps = [];

    if(type === "insert"){
      this.insert(val);

      steps.push({
        action: "Enqueue " + val,
        state: [...this.data],
        memory: {
          queue: [...this.data],
          front: 0,
          rear: this.data.length - 1
        }
      });
    }

    if(type === "delete"){
      let removed = this.delete();

      steps.push({
        action: "Dequeue (" + removed + ")",
        state: [...this.data],
        memory: {
          queue: [...this.data],
          front: 0,
          rear: this.data.length - 1
        }
      });
    }

    return steps;
  }

  getState(){
    return [...this.data];
  }

  /* VISUAL */
  visualize(state){
    return `
      <div>
        <div>Front →</div>
        ${state.map((x,i)=>
          `<span class="box ${i===0?'pointer':''}">${x}</span>`
        ).join("")}
        <div>← Rear</div>
      </div>
    `;
  }
}