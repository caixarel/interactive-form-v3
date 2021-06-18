let nameInput =document.getElementById("name");
nameInput.focus();
let jobRole = document.getElementById("title") ;
let other_job_role = document.getElementById("other-job-role");
other_job_role.style.display = "none";

let designEle = document.getElementById("design");
let colorEle = document.getElementById("color");
let colorOptions = colorEle.children;

colorEle.disabled = true;

let activitiesField= document.getElementById("activities");
let totalCostParagraph= document.getElementById("activities-cost");
let totalCost = 0;

activitiesField.addEventListener("change", (e)=>{
    let cost = +e.target.getAttribute("data-cost");
    if (e.target.checked){
        totalCost += cost;
        console.log(totalCost);
        console.log(e.target.checked);  
    }
    else{
        totalCost-=cost;
        console.log(totalCost);
        console.log(e.target.checked);  
    }
    totalCostParagraph.innerHTML = `Total ${totalCost}€`;
})

jobRole.addEventListener("change", (e)=>{
    if (e.target.value == 'other'){
        other_job_role.style.display = "";
    }
    else {
        other_job_role.style.display = "none";
    }

})

designEle.addEventListener("change", (e)=>{
    colorEle.disabled= false; 
    for(let i=0;i<colorOptions.length;i++){
        let target = e.target.value;
        let data_theme = colorEle.children[i].getAttribute('data-theme');
        if (target == data_theme){
            colorEle.children[i].hidden =false;
            colorEle.children[i].setAttribute("selected",true);
        }
        else{
            colorEle.children[i].hidden =true;
            colorEle.children[i].removeAttribute("selected");
        }

    }
})

