import '../styles/style.css';

const form = document.querySelector<HTMLFormElement>('#form');
const username = document.querySelector<HTMLInputElement>('#username');
const email = document.querySelector<HTMLInputElement>('#email');
const password = document.querySelector<HTMLInputElement>('#password');
const confirmPassword = document.querySelector<HTMLInputElement>('#confirm-password');

form?.addEventListener('submit', (e) => {
    e?.preventDefault();

    // username error handling
    if (username)
        if (!username.value.trim()) {
            showErrorMsg(username, 'Please enter a username');
        } else {
            showSuccessMsg(username, 'Username field completed');
        }

    // email error handling
    if (email) {
        if (!email.value.trim()) {
            showErrorMsg(email, 'Please enter a email');
        } else if (!isValidEmail(email.value.trim())) {
            showErrorMsg(email, 'Email is not valid');
        } else {
            showSuccessMsg(email, 'Email field completed');
        }
    }

    // password error handling
    if (password) {
        if (!password.value.trim()) {
            showErrorMsg(password, 'Please enter a password');
        } else {
            showSuccessMsg(password, 'Password field completed');
        }
    }

    // confirm password error handling
    if (confirmPassword) {
        if (!confirmPassword.value.trim()) {
            showErrorMsg(confirmPassword, 'Please enter a valid password');
        } else if (confirmPassword.value.trim() !== password?.value.trim()) {
            showErrorMsg(confirmPassword, "Password dose't match");
        } else {
            showSuccessMsg(confirmPassword, 'Confirm password field completed');
        }
    }
});

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

// email is valid or not checker
function isValidEmail(email: string) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
}
