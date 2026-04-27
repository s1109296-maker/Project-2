let steps = [];
let currentStep = -1;

function addStep(type){
  let val = document.getElementById("val").value;

  if(type==="insert"){
    structure.insert(val);
    steps.push({
      action:"Insert "+val,
      state:structure.getState(),
      line:1
    });
  }

  if(type==="delete"){
    structure.delete();
    steps.push({
      action:"Delete",
      state:structure.getState(),
      line:2
    });
  }

  nextStep();
}

function nextStep(){
  if(currentStep < steps.length-1){
    currentStep++;
    showStep();
  }
}

function prevStep(){
  if(currentStep > 0){
    currentStep--;
    showStep();
  }
}

function showStep(){
  let s = steps[currentStep];
  document.getElementById("status").innerText = s.action;
  highlightCode(s.line);
  render(s.state);
  renderMemory(s.memory);
}

function addStep(type){
  let val = document.getElementById("val").value;

  let newSteps = structure.getSteps(type,val);

  steps.push(...newSteps);

  nextStep();
}