//variables for the html elements
let nameInput =document.getElementById("name");
let emailAddress = document.getElementById("email");
let cardNumber = document.getElementById("cc-num");
let zipCode = document.getElementById("zip");
let cvvNumber = document.getElementById("cvv")
let formElement = document.querySelector("form");
let jobRole = document.getElementById("title") ;
let other_job_role = document.getElementById("other-job-role");
let designEle = document.getElementById("design");
let colorEle = document.getElementById("color");
let colorOptions = colorEle.children;
let activitiesField= document.getElementById("activities");
let totalCostParagraph= document.getElementById("activities-cost");
let totalCost = 0;
let payment = document.getElementById("payment");
let creditCardDiv = document.getElementById("credit-card")
let paypalDiv = document.getElementById("paypal");
let bitcoinDiv = document.getElementById("bitcoin");
let activitiesStyle =document.querySelectorAll("input[type='checkbox']");

//the 'color' options will be disabled until the user selects the shirts design
colorEle.disabled = true;
nameInput.focus();
//the other job input will only show after the user selects the job role 'other job'
other_job_role.style.display = "none";
//the page will load with the payment option 'credit card as active choice
paypalDiv.style.display = "none";
bitcoinDiv.style.display = "none";
payment.children[1].setAttribute("selected",true);
//loop to give focus or not to the activities
for(let i =0;i<activitiesStyle.length;i++){
    console.log(activitiesStyle[i].checked);
    activitiesStyle[i].addEventListener('focus',(e)=>{
        activitiesStyle[i].parentNode.classList.add('focus');
    })
    activitiesStyle[i].addEventListener('blur',(e)=>{
        activitiesStyle[i].parentNode.classList.remove('focus');
    })
}
//event that will verify if the form can be validated or not
formElement.addEventListener("submit", (e)=>{
    //verifyng if the input fields are valid using regular expressions
    let nameValue = nameInput.value; 
    let validName = /^[space a-z]+$/.test(nameValue);
    let emailValue =emailAddress.value;
    let validEmail = /^[^@]+@[^@.]+\.[a-zA-Z]+$/.test(emailValue);
    let cardNumberValue =cardNumber.value;
    let validCarNumber =/^[0-9]{14,16}$/.test(cardNumberValue);
    let zipCodeValue = zipCode.value;
    let validZipCode = /^[0-9]{5}$/.test(zipCodeValue)
    let cvvValue = cvvNumber.value;
    let validCvv = /^[0-9]{3}$/.test(cvvValue);
    if (payment.value == "credit-card"){
        if(validName && validEmail && totalCost!=0 && validCarNumber && validZipCode &&validCvv ){
        }
        else{
            e.preventDefault();
            //if not possible to validate the form then every not valid field will display a error message 
            if (!validName){
                validInput(nameInput);
            }
            else{
                invalidInput(nameInput);
            }
            if(!validEmail){
                validInput(emailAddress);
            }
            else{
                invalidInput(emailAddress);
            }
            if(totalCost==0){
                validInput(activitiesField.children[0]);
            }
            else{
                validInput(activitiesField);
            }
            if(!validCarNumber){
                validInput(cardNumber);
            }
            else{
                validInput(cardNumber);
            }
            if(!validZipCode){
                validInput(zipCode);
            }
            else{
                validInput(zipCode);
            }
            if(!validCvv){
                validInput(cvvNumber);
            }
            else{
                validInput(cvvNumber);
            }
        }
    }
    else{
        if(validName && validEmail && totalCost!=0 ){
            
        }
        else{
            if (!validName){
                validInput(nameInput);
            }
            else{
                invalidInput(nameInput);
            }
            if(!validEmail){
                validInput(emailAddress);
            }
            else{
                invalidInput(emailAddress);
            }
            if(totalCost==0){
                validInput(activitiesField.children[0]);
            }
            else{
                validInput(activitiesField);
            }
            e.preventDefault();
        }
    }
})
//functions to display valid or invalid messages to the user
function validInput(input){
        input.parentNode.classList.add("not-valid");
        input.parentNode.classList.remove("valid");
        input.parentNode.lastElementChild.style.display ="block"; 
}
function invalidInput(input){
    input.parentNode.classList.add("valid");
    input.parentNode.classList.remove("not-valid");
    input.parentNode.lastElementChild.style.display ="none"; 
}
//event to choose the payment method and hide the non choosen methods
payment.addEventListener("change", (e)=>{
    console.log(e.target.value);
    switch (e.target.value){
        case 'credit-card':
            paypalDiv.style.display = "none";
            bitcoinDiv.style.display = "none";
            creditCardDiv.style.display = "";
        break;
        case 'paypal' :
            paypalDiv.style.display = "";
            bitcoinDiv.style.display = "none";
            creditCardDiv.style.display = "none";
        break;
        case 'bitcoin' :
            paypalDiv.style.display = "none";
            bitcoinDiv.style.display = "";
            creditCardDiv.style.display = "none";
        break;
    }
})
//update the total price when activities are choosen 
activitiesField.addEventListener("change", (e)=>{
    let cost = +e.target.getAttribute("data-cost");
    if (e.target.checked){
        totalCost += cost;
    }
    else{
        totalCost-=cost;
    }
    totalCostParagraph.innerHTML = `Total ${totalCost}€`;
})
//display or hide the 'other job' form field
jobRole.addEventListener("change", (e)=>{
    if (e.target.value == 'other'){
        other_job_role.style.display = "";
    }
    else {
        other_job_role.style.display = "none";
    }

})
//when the user selects a shirt Theme the possible colors associated with that Theme will be available to be choosen
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

