# interactive-form-v3
 project
real time error message :
first i've created one event listener for each input field.this way at every new input it will be possible to verify if that input is valid or not.
the functions created to verify the validity of the form fields will be called when the correspondent input field event listener is triggered.this functions will display a valid or invalid message each time a the correspondent input field is changed or return valid or invalid when the user tries to submit the form.
I added the real time error message to the following inputs:
Name
Email
Activities
Credit card number 
Zip number
CVV number

conditional error message :
using the functions discribed above i also added a condition in the credit card number input field that checks if it only contains numbers. 
if false a error message saying "Card number must contain only numbers". if the name input field is left blank a message saying "Credit card number must be between 13 - 16 digits" will be displayed in that casa.
