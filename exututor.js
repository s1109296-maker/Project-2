let execSteps = [];
let execIndex = 0;

/* RUN CODE */
function runCode(){
  let code = document.getElementById("codeInput").value;

  execSteps = [];
  execIndex = 0;

  let lines = code.split("\n");

  let memory = {};

  lines.forEach((line, i)=>{
    try{
      if(line.includes("=")){
        let parts = line.split("=");
        let varName = parts[0].replace("let","").trim();
        let expr = parts[1].trim();

        // evaluate expression safely
        let value = evalExpression(expr, memory);

        memory[varName] = value;

        execSteps.push({
          line: line,
          memory: {...memory}
        });
      }
    }catch(e){
      console.log("Error at line", i);
    }
  });

  alert("Execution Ready. Click Next Step");
}

/* SAFE EVAL */
function evalExpression(expr, memory){
  let replaced = expr;

  for(let key in memory){
    replaced = replaced.replaceAll(key, memory[key]);
  }

  return eval(replaced);
}

/* NEXT STEP */
function nextExec(){
  if(execIndex >= execSteps.length) return;

  let step = execSteps[execIndex];

  document.getElementById("output").innerText =
    "Executing: " + step.line;

  renderMemory(step.memory);

  execIndex++;
}