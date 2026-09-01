function mostra(){
    let senha = document.getElementById("senha");
    if(senha.type == "text"){
        senha.type = "password";
    }else{
        senha.type = "text";
    }
}
function muda(){
    let t = document.getElementById("titulo");
    //mudar de forma dinamica só com uma funcão: se tem tira, se não tem coloca
    t.classList.toggle("c1");
    t.classList.toggle("c2");
    /*pra mudar o css de forma dinamica
    if(t.classList.contains("c2")){
        t.classList.add("c1");
        t.classList.remove("c2");
    }else{
        t.classList.add("c2");
        t.classList.remove("c1");
    }/*

    /*pra mudar css
    t.style.fontSize = "30px";
    t.style.color = "blue";*/
}
function verifica(){
    //OBS:length é uma funçao apenas para strings, se for para int coloca parseInt(), para float é a mesma coisa
    //ex: let ver = parseInt(document.getElementById("senha").value);
    let ver = document.getElementById("senha").value;
    if(ver.length < 8){ 
        alert("a senha deve conter minimos 8 digitos");
    }else{
        alert("vc criou uma senha!");
    }
}