document.getElementById('contact_form').addEventListener('submit', function (event) {
  
    event.preventDefault();

    const form_errors = [];
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const commentField = document.getElementById('comments');
    

    //validateName(nameField,form_errors);
    if(!nameField.checkValidity()){
        form_errors.push({ field: 'name', message: nameField.validationMessage});
        console.log("invalid name"); 
    }
    if(!emailField.checkValidity()){
        //flashField(emailField);
        form_errors.push({ field: 'email', message: 'Invaild email address.' });
        console.log("invalid email");
    }

    if(!commentField.checkValidity()){
        form_errors.push({ field: 'comments', message: 'Please write some comments.' });
    }



    const illegalCharactersRegex = /[^a-zA-Z0-9.,!? ]/g;

    if (commentField.value.match(illegalCharactersRegex)) {
        commentField.setCustomValidity('Illegal characters detected.');
        flashField(commentField);
        form_errors.push({ field: 'comments', message: 'Illegal characters detected.' });
    } else {
        commentField.setCustomValidity('');
    }

    const maxChars = 500;
    const charCount = commentField.value.length;
    const remainingChars = maxChars - charCount;

    commentField.setCustomValidity('');
    document.getElementById('info_output').textContent = `Remaining characters: ${remainingChars}`;

    if (remainingChars <= 20) {
        if (remainingChars <= 10) {
            document.getElementById('info_output').classList.add('warning');
        } else {
            document.getElementById('info_output').classList.remove('warning');
        }

        if (remainingChars <= 0) {
            form_errors.push({ field: 'comments', message: 'Character limit exceeded.' });
        }
    }

    if (form_errors.length > 0) {
        displayErrors(form_errors);
        submitFormErrors(form_errors);
    } else {
        document.getElementById('info_output').textContent = '';
        this.submit(); 
    }
});

document.getElementById('comments').addEventListener('input', function () {
    const maxChars = 500;
    const charCount = this.value.length;
    const remainingChars = maxChars - charCount;


    document.getElementById('info_output').textContent = `Remaining characters: ${remainingChars}`;

    if (remainingChars <= 20) {
        if (remainingChars <= 10) {
            document.getElementById('info_output').classList.add('warning');
        } else {
            document.getElementById('info_output').classList.remove('warning');
        }
        if (remainingChars <= 0) {
            form_errors.push({ field: 'comments', message: 'Character limit exceeded.' });
        }
    }
});

function displayErrors(errors) {
    const errorOutput = document.getElementById('error');
   // errorOutput.innerHTML = errors.map(error => `${error.field}: ${error.message}`).join('<br>');
}

function validateName(field, errors) {
    const value = field.value.trim();
    if (value === '') {
        flashField(nameField);
        errors.push({ field: 'name', message: 'Name is required.' });
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        flashField(nameField);
        errors.push({ field: 'name', message: 'Name contains non-typical characters.' });
    }
}



function flashField(field) {
    field.classList.add('error');
    const errorMessage = document.createElement('div');
    errorMessage.textContent = 'Illegal characters detected';
    errorMessage.classList.add('error-message', 'fade-out');
    field.parentElement.insertBefore(errorMessage, field.nextSibling);
    setTimeout(() => {
        field.classList.remove('error');
        errorMessage.classList.remove('fade-out');
        setTimeout(() => {
            errorMessage.remove();
        }, 2000);
    }, 500);
}

function submitFormErrors(errors) {
    const formErrorsInput = document.getElementById('form-errors');
    formErrorsInput.value = JSON.stringify(errors);
}
 

document.querySelector("#switch-input").addEventListener("click",()=>{
    document.body.classList.toggle("dark");
    console.log("clicked");
});