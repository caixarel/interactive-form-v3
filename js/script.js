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
const colorEle = document.getElementById("color");
const colorOptions = colorEle.children;
let activitiesField= document.getElementById("activities");
let totalCostParagraph= document.getElementById("activities-cost");
let totalCost = 0;
let payment = document.getElementById("payment");
let creditCardDiv = document.getElementById("credit-card");
let paypalDiv = document.getElementById("paypal");
let bitcoinDiv = document.getElementById("bitcoin");
let activitiesStyle =document.querySelectorAll("input[type='checkbox']");
let numberOfSelectedActivities =0;

//the 'color' options will be disabled until the user selects the shirts design
colorEle.disabled = true;
nameInput.focus();
//the other job input will only show after the user selects the job role 'other job'
other_job_role.style.display = "none";
//the page will load with the payment option 'credit card as active choice
paypalDiv.style.display = "none";
bitcoinDiv.style.display = "none";
//makes the credit card option the selected option when the page loads
payment.children[1].setAttribute("selected",true);
payment.removeChild(payment.firstElementChild);
//loop to give focus or not to the activities
for(let i =0;i<activitiesStyle.length;i++){
    activitiesStyle[i].addEventListener('focus',(e)=>{
        activitiesStyle[i].parentNode.classList.add('focus');
    })
    activitiesStyle[i].addEventListener('blur',(e)=>{
        activitiesStyle[i].parentNode.classList.remove('focus');
    })
}
//events to call the functions that will verify in real time if the input fields are valid
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
emailAddress.addEventListener("input",(e)=>{
    mailValidity();
})
//functions to verify if the input fields are valid
function nameValidity(){
    let nameValue = nameInput.value;
    let nameRegEx = false;
    if(nameValue==""){
        invalidInput(nameInput);
        let errorMessage =nameInput.parentNode.lastElementChild;
        errorMessage.innerHTML = "Name field cannot be blank";
        nameRegEx =false;
    }
    else{
        validInput(nameInput);
        nameRegEx = true;
    }
    return nameRegEx;
}
function mailValidity(){
    let emailValue =emailAddress.value;
    let mailRegEx =/^[^@]+@[^@.]+\.[a-zA-Z]+$/.test(emailValue);
    if(!mailRegEx){
        invalidInput(emailAddress);
    }
    else{
        validInput(emailAddress);
    }
    return mailRegEx;
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
function activitiesValidity(number){
    if (number==0){
        invalidInput(activitiesField.children[0]);
    }
    else{
        validInput(activitiesField.children[0])
    }
}
//event that will verify if the form can be validated or not
formElement.addEventListener("submit", (e)=>{
    //verifyng if the input fields are valid using regular expressions
    let validName = nameValidity();  
    let validEmail = mailValidity();
    let validCarNumber = cardValidity();
    let validZipCode = zipValidity();
    let validCvv = cvvValidity();
    if (payment.value == "credit-card"){
        if(validName && validEmail && totalCost!=0 && validCarNumber && validZipCode &&validCvv ){
        }
        else{
            e.preventDefault();
            if(totalCost==0){
                invalidInput(activitiesField.children[0]);
            }
        }
    }
    else{
        if(validName && validEmail && totalCost!=0 ){         
        }
        else{
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
    let activityName = e.target.getAttribute("name");
    let activityDate = e.target.getAttribute("data-day-and-time");
    if (e.target.checked){
        numberOfSelectedActivities++;
        totalCost += cost; 
        for(let i = 0 ; i<activitiesStyle.length ;i++){
            if(activityName!==activitiesStyle[i].getAttribute("name") && activityDate===activitiesStyle[i].getAttribute("data-day-and-time")){
                activitiesStyle[i].setAttribute("type","hidden");
                activitiesStyle[i].parentNode.classList.add("disabled");
            }
        }
    }
    else{
        numberOfSelectedActivities--;
        totalCost-=cost;
        for(let i = 0 ; i<activitiesStyle.length ;i++){
            if(activityName!==activitiesStyle[i].getAttribute("name") && activityDate===activitiesStyle[i].getAttribute("data-day-and-time")){
                activitiesStyle[i].setAttribute("type","checkbox");
                activitiesStyle[i].parentNode.classList.remove("disabled");
            }
        }
    }
    totalCostParagraph.innerHTML = `Total ${totalCost}???`;
    activitiesValidity(numberOfSelectedActivities);
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
//create an array with all the color options to be used on the next event
let colorText = [];
for(let j = 0;j<colorOptions.length;j++){
    colorText.push(colorOptions[j]);
}
designEle.firstElementChild.hidden = false;
//when the user selects a shirt Theme the possible colors associated with that Theme will be available to be choosen
designEle.addEventListener("change", (e)=>{
    let target = e.target.value;
    //reset the content of the color select and then insert all the options
    colorEle.innerHTML= '';
    for(let j = 0; j<colorText.length ; j++){
        colorEle.appendChild(colorText[j]);
    }
        //loop through the options for shirt theme
        for(let j= 0; j<designEle.length;j++){
            //Selects one option and semove selection from the others
            if (target === designEle[j].value){
                designEle[j].setAttribute("selected",true);
                //if the user choose the "Select Theme" option the color drop down field becomes disabled again
                //and is asked to the user to select a theme
                if (j==0){
                    colorEle.insertBefore(colorText[0],colorEle.firstElementChild)
                    colorEle.children[0].hidden= false;
                    colorEle.children[0].setAttribute("selected",true);
                    for(let i=1;i<colorEle.children.length;i++){
                        colorEle.children[i].removeAttribute("selected");
                    }
                    colorEle.disabled= true; 

                }
                else{
                    colorEle.disabled= false; 
                    colorEle.children[0].hidden= true;
                    colorEle.children[0].removeAttribute("selected");
                     //loop through the color options to select the make only thte options that match the theme available to the user
                    for(let i=0;i<colorEle.children.length;i++){

                        let data_theme = colorEle.children[i].getAttribute('data-theme');
                        if (target == data_theme){
                            colorEle.children[i].hidden =false;
                            colorEle.children[i].setAttribute("selected",true);
                        }
                        else{
                            colorEle.children[i].hidden =true;
                            colorEle.children[i].removeAttribute("selected");
                            //there was a bug when using the browser Safari , the 2 lines above for some reason 
                            //where not working and i had to find this solution to make it work
                            colorEle.removeChild(colorEle.children[i]);
                            i--;
                        }
                
                    }
                }
            }
            else{
                designEle[j].removeAttribute("selected");

            }
        }
        
    })
    //when a color is choosen it becomes the "selected" option all others became not "selected"
    colorEle.addEventListener("change", (e)=>{
        for(let i=1;i<colorEle.children.length;i++){
            if (e.target.value == colorEle.children[i].value){
                colorEle.children[i].setAttribute("selected",true);
            }
            else{
                colorEle.children[i].removeAttribute("selected");
            }
        }
})

