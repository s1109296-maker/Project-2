function saveFile(name,data){
    localStorage.setItem(name,JSON.stringify(data));
}

function loadFile(name){
    return JSON.parse(localStorage.getItem(name)) || [];
}

function getAllFiles(prefix){
    let arr=[];
    for(let i=0;i<localStorage.length;i++){
        let key=localStorage.key(i);
        if(key.includes(prefix)) arr.push(key);
    }
    return arr;
}