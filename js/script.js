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
let selectedActivities= [];
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
    activitiesStyle[i].addEventListener('focus',(e)=>{
        activitiesStyle[i].parentNode.classList.add('focus');
    })
    activitiesStyle[i].addEventListener('blur',(e)=>{
        activitiesStyle[i].parentNode.classList.remove('focus');
    })
}
nameInput.addEventListener("input",(e)=>{
    nameValidity();
})
cardNumber.addEventListener("input",(e)=>{
    cardValidity();
})
zipCode.addEventListener("input",(e)=>{
    zipValidity();
})
cvvNumber.addEventListener("input",(e)=>{
    cvvValidity();
})
function nameValidity(){
    let nameValue = nameInput.value;
    let nameRegEx = /^[a-zspace]+$/.test(nameValue);
    if(!nameRegEx){
        invalidInput(nameInput);
        let errorMessage =nameInput.parentNode.lastElementChild;
        errorMessage.innerHTML = "Name must contain only letters";
    }
    else{
        validInput(nameInput);
    }
    return nameRegEx;
}
function mailValidity(){
    let emailValue =emailAddress.value;
    return /^[^@]+@[^@.]+\.[a-zA-Z]+$/.test(emailValue);
}
function cardValidity(){
    let cardNumberValue =cardNumber.value;
    cardRegEx =/^[0-9]{14,16}$/.test(cardNumberValue);
    if(/[a-zA-Z]/.test(cardNumberValue)){
        invalidInput(cardNumber);
        let errorMessage =cardNumber.parentNode.lastElementChild;
        errorMessage.innerHTML = "Card number must contain only numbers";
    }
    else if(cardRegEx){
        validInput(cardNumber);
    }
    else{
        invalidInput(cardNumber);
        let errorMessage =cardNumber.parentNode.lastElementChild;
        errorMessage.innerHTML = "Credit card number must be between 13 - 16 digits";
    }
    return cardRegEx;
}
function zipValidity(){
    let zipCodeValue = zipCode.value;
    zipRegEx =/^[0-9]{5}$/.test(zipCodeValue);
    if(/[a-zA-Z]/.test(zipCodeValue)){
        invalidInput(zipCode);
        let errorMessage =zipCode.parentNode.lastElementChild;
        errorMessage.innerHTML = "Zip code must contain only numbers";
    }
    else if(zipRegEx){
        validInput(zipCode);
    }
    else{
        invalidInput(zipCode);
        let errorMessage =zipCode.parentNode.lastElementChild;
        errorMessage.innerHTML = "Zip Code must be 5 digits";
    }
    return zipRegEx;
}
function cvvValidity(){
    let cvvValue = cvvNumber.value;
    let cvvRegEx= /^[0-9]{3}$/.test(cvvValue);
    if(/[a-zA-Z]/.test(cvvValue)){
        invalidInput(cvvNumber);
        let errorMessage =cvvNumber.parentNode.lastElementChild;
        errorMessage.innerHTML = "CVV must contain only numbers";
    }
    else if(cvvRegEx){
        validInput(cvvNumber);
    }
    else{
        invalidInput(cvvNumber);
        let errorMessage =cvvNumber.parentNode.lastElementChild;
        errorMessage.innerHTML = "CVV must be 3 digits";
    }
    return cvvRegEx;
}

function activitiesValidity(bol){
    console.log(bol);
}

//event that will verify if the form can be validated or not
formElement.addEventListener("submit", (e)=>{
    //verifyng if the input fields are valid using regular expressions
    let validName = nameValidity();  
    let validEmail = mailValidity();
    let validCarNumber = cardValidity();
    let validZipCode = zipValidity();
    let validCvv = cvvValidity();
    let validActivities = activitiesValidity();
    if (payment.value == "credit-card"){
        if(validName && validEmail && totalCost!=0 && validCarNumber && validZipCode &&validCvv ){
        }
        else{
            e.preventDefault();
            //if not possible to validate the form then every not valid field will display a error message 
            if(!validEmail){
                invalidInput(emailAddress);
            }
            else{
                validInput(emailAddress);
            }
            if(totalCost==0){
                invalidInput(activitiesField.children[0]);
            }
            else{
                validInput(activitiesField.children[0]);
            }
            if(!validZipCode){
                invalidInput(zipCode);
            }
            else{
                validInput(zipCode);
            }
            if(!validCvv){
                invalidInput(cvvNumber);
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
            if(!validEmail){
                invalidInput(emailAddress);
            }
            else{
                validInput(emailAddress);
            }
            if(totalCost==0){
                invalidInput(activitiesField.children[0]);
            }
            else{
                validInput(activitiesField);
            }
            e.preventDefault();
        }
    }
})
//functions to display valid or invalid messages to the user
function invalidInput(input){
        input.parentNode.classList.add("not-valid");
        input.parentNode.classList.remove("valid");
        input.parentNode.lastElementChild.style.display ="block"; 
}
function validInput(input){
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
    let activityName = e.target.getAttribute("name")
    let activityDate = e.target.getAttribute("data-day-and-time").toString();
    let activityError = false;
    let matchCount = 0;
    if (e.target.checked){
        totalCost += cost; 
        selectedActivities.push(e.target);
        for(let i = 0;i<selectedActivities.length;i++){
            if(activityDate===selectedActivities[i].getAttribute("data-day-and-time") && activityName!==selectedActivities[i].getAttribute("name")){
                console.log("diferent activity");
            }
        }
        activitiesValidity(activityError);
    }
    else{
        totalCost-=cost;
        for(let i = 0 ;i<selectedActivities.length;i++){
            if(activityName===selectedActivities[i].getAttribute("name")){
            selectedActivities.splice(i,1);
            }
            if(selectedActivities.length>0 && !selectedActivities.includes(activityDate)){
                activitiesValidity(true);
        }
        
        }
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

