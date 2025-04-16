import '../styles/style.css';

const form = document.querySelector<HTMLFormElement>('#form')!;
const username = document.querySelector<HTMLInputElement>('#username')!;
const email = document.querySelector<HTMLInputElement>('#email')!;
const password = document.querySelector<HTMLInputElement>('#password')!;
const confirmPassword = document.querySelector<HTMLInputElement>('#confirm-password')!;

// submit form
form?.addEventListener('submit', (e) => {
    e?.preventDefault();
    validateForm([username, email, password, confirmPassword]);

    // username  validation
    checkTextLength(username, 3, 15);

    // email  validation
    isValidEmail(email);

    // password  validation
    isValidPassword(password);

    // confirm password  validation
    isValidConfirmPassword(password, confirmPassword);
});

// validate form felids
function validateForm(inputFelids: HTMLInputElement[]) {
    inputFelids.forEach((input) => {
        const inputValue = input?.value?.trim();
        const inputLabel = input.dataset.label?.trim();
        if (!inputValue) {
            showErrorMsg(input, `${inputLabel} felid is required`);
        }
    });
}

// text length checker
function checkTextLength(input: HTMLInputElement, minLength: number, maxLength: number) {
    const textValLength = input.value.trim().length;
    const inputLabel = input?.dataset?.label;

    if (textValLength < minLength) {
        showErrorMsg(input, `${inputLabel} must have ${minLength} character.`);
    } else if (textValLength > maxLength) {
        showErrorMsg(input, `${inputLabel} don't have  more then ${maxLength} character.`);
    } else {
        showSuccessMsg(input, `${inputLabel} completed successfully`);
    }
}

// email is valid or not checker
function isValidEmail(email: HTMLInputElement) {
    const emailValue = email.value.trim();
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (emailRegex.test(emailValue)) {
        showSuccessMsg(email, 'Email is completed');
    } else {
        showErrorMsg(email, 'Email is not valid');
    }
}

// password is valid or not checker
function isValidPassword(password: HTMLInputElement) {
    const passValue = password.value.trim();
    const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (passRegex.test(passValue)) {
        showSuccessMsg(password, 'Password felid completed');
    } else {
        showErrorMsg(
            password,
            'Password must include 8 character with at least one uppercase, lowercase, digit and special character.'
        );
    }
}

// confirm password valid or nor checker
function isValidConfirmPassword(password: HTMLInputElement, confirmPassword: HTMLInputElement) {
    const passValue = password.value.trim();
    const confirmPassValue = confirmPassword.value.trim();

    if (passValue && confirmPassValue) {
        if (passValue === confirmPassValue) {
            showSuccessMsg(confirmPassword, 'Confirm password felid completed.');
        }
    }
}

// show error message function
function showErrorMsg(input: HTMLInputElement, message: string) {
    const inputParentEl = input.parentElement;
    const formMsg = inputParentEl?.querySelector<HTMLSpanElement>('.form-msg');
    inputParentEl?.classList.add('error-msg');
    if (formMsg) formMsg.innerText = message;
}

// show success message function
function showSuccessMsg(input: HTMLInputElement, message: string) {
    const inputParentEl = input.parentElement;
    const formMsg = inputParentEl?.querySelector<HTMLSpanElement>('.form-msg');
    inputParentEl?.classList.add('success-msg');
    if (formMsg) formMsg.innerText = message;
}
