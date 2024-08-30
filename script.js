function generateRandomCharacter(characters) {
    return characters[Math.floor(Math.random() * characters.length)];
}

function copyToClipboard() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
}

function generateAdditionalPasswords(userInput) {
    const additionalPasswordsDiv = document.getElementById('additional-passwords');
    additionalPasswordsDiv.innerHTML = ''; 

    for (let i = 0; i < 2; i++) {
        const password = document.createElement('input');
        password.type = 'text';
        password.className = 'password-box bg-gray-200 w-full text-center p-2 rounded-lg text-gray-800 mb-2'; // Changed background color
        password.readOnly = true;

        const length = document.getElementById('length').value;
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

        let newPassword = '';

        for (let j = 0; j < length; j++) {
            newPassword += userInput[j % userInput.length] || generateRandomCharacter(uppercaseChars + lowercaseChars + numberChars + symbolChars);
        }

        newPassword = newPassword.split('').sort(() => 0.5 - Math.random()).join('');
        password.value = newPassword;

        additionalPasswordsDiv.appendChild(password);
    }
}

function generatePersonalizedPassword() {
    const userInput = document.getElementById('userInput').value.split(''); 
    const length = document.getElementById('length').value;

    if (userInput.length < length) {
        alert('Your input is shorter than the selected password length. Please enter more characters.');
        return;
    }

    let personalizedPassword = '';

    for (let i = 0; i < length; i++) {
        personalizedPassword += userInput[i % userInput.length] || generateRandomCharacter(uppercaseChars + lowercaseChars + numberChars + symbolChars);
    }

    personalizedPassword = personalizedPassword.split('').sort(() => 0.5 - Math.random()).join('');

    document.getElementById('password').value = personalizedPassword;

    generateAdditionalPasswords(userInput);
}

document.getElementById('copy').addEventListener('click', copyToClipboard);
document.getElementById('generate-personalized').addEventListener('click', generatePersonalizedPassword);
document.getElementById('generate-more').addEventListener('click', () => {
    generateAdditionalPasswords(document.getElementById('userInput').value.split(''));
});

document.getElementById('length').addEventListener('input', function() {
    document.getElementById('lengthDisplay').textContent = `${this.value} Characters`;
});
