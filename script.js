const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');


//Show Success outline

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small')
    small.innerText = message;
}


//Show error outline

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//Check Email
function checkEmail(input){
const re =   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
if(re.test(input.value.trim())){
    showSuccess(input)
}else{
    showError(input,'Email is not valid')
}
}

//Check Required Fields
function checkRequiredFields(inputArr){
    inputArr.forEach(function(item,index){
    if(item.value.trim() === ''){
        showError(item,`${getFieldName(item)} is required`);
    }else{
        showSuccess(item)
    }
    })

}

//Get Field Name
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

//Check input Length
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }else if(input.value.length > max ){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    }else{
        showSuccess(input)
    }
}

//Check passwords match
function checkPasswordsMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2,'Passwords do not match')
    }
}

//Event listeners

form.addEventListener('submit', function (e) {
    e.preventDefault();
   checkRequiredFields([username, email, password, confirmPassword])
   checkLength(username,8,15);
   checkLength(password,6,25);
   checkEmail(email);
   checkPasswordsMatch(password,confirmPassword)
   getCountryData('portugal')
}
)


//trial

const getCountryData = function(country){
    fetch(`https://dummy.restapiexample.com/api/v1/employees`)
    .then((res)=>res.json())
    .then((data)=>console.log(data,'data'))
}