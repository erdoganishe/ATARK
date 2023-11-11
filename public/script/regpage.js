const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const availableLanguages = {
    Ukrainian: 'uk',
    English: 'en'
}
let currentLanguage = 'uk';

if (Object.values(availableLanguages).includes(urlParams.get('lang'))){
    currentLanguage = urlParams.get('lang');
}


const translations = {
    uk: {
        registration: 'Реєстрація',
        login: 'Логін',
        email: 'Електронна пошта',
        password: 'Пароль',
        confirm: 'Підтвердження',
        register: 'Зареєструватись',
        haveAccount: 'Вже є аккаунт? Авторизація',
        contactUs: "Зв'язатись з нами",
        ourServices: 'Наші послуги',
        privacyPolicy: 'Політика конфеденційості',
        termsConditions: 'Умови користування'
    },
    en: {
        registration: 'Registration',
        login: 'Login',
        email: 'Email',
        password: 'Password',
        confirm: 'Confirm',
        register: 'Register',
        haveAccount: 'Already have an account? Login',
        contactUs: 'Contact us',
        ourServices: 'Our Services',
        privacyPolicy: 'Privacy Policy',
        termsConditions: 'Terms & Conditions'
    }
};


function getTranslation(key) {
    return translations[currentLanguage][key] || key;
}

function switchLanguage (){
    if (currentLanguage == 'uk'){
        currentLanguage = 'en';
    }
    else
    {
        currentLanguage = 'uk';
    }
}

function updateText(){
    document.getElementById('registraion-title').innerHTML = getTranslation('registration');
    document.getElementById('login').placeholder = getTranslation('login');
    document.getElementById('email').placeholder = getTranslation('email');
    document.getElementById('password').placeholder = getTranslation('password');
    document.getElementById('confirm-password').placeholder = getTranslation('confirm');
    document.getElementById('register').innerHTML = getTranslation('register');
    document.getElementById('have-account').innerHTML = getTranslation('haveAccount');
    document.getElementById('contact-us').innerHTML = getTranslation('contactUs');
    document.getElementById('our-service').innerHTML = getTranslation('ourServices');
    document.getElementById('private-policy').innerHTML = getTranslation('privacyPolicy');
    document.getElementById('terms-conditions').innerHTML = getTranslation('termsConditions');
}

function makeChosen() {

    var languageButtons = document.getElementsByClassName("flag-img");
    for (let i=0;i<languageButtons.length;i++){
        languageButtons[i].classList.remove("choosen");
    }
    if (currentLanguage=='uk'){
        languageButtons[0].classList.add("choosen");
    }
    else{
        languageButtons[1].classList.add("choosen");
    }
    updateText();

}

function addHrefToLink(){
    const haveAccountA = document.getElementById('have-account');
    haveAccountA.href = `/login?lang=${urlParams.get('lang')}`; 
}


function registrationButtonAddEvent(){
    const emailInput = document.getElementById('email');
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');
    const passwordConInput = document.getElementById('confirm-password');

    const registrButton = document.getElementById('register');


    registrButton.addEventListener('click', async () => {
        const email = emailInput.value;
        const username = loginInput.value;
        const password = passwordInput.value;
        const passwordCon = passwordConInput.value;
        if(password != passwordCon) {
            console.log("Passwords are not matched!");
            alert("Passwords are not matched!");
        } else {
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'user': username, 'pwd': password, 'email': email })
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data);
                window.location.href = `/login?lang=${urlParams.get('lang')}`;
            } else {
                alert(data.message ?? "Error. Try again later");
            }
        }
    });
}

makeChosen();
addHrefToLink();
registrationButtonAddEvent();

