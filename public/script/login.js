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
        timeError: 'Помилка. Спробуйте пізніше',
        title: 'SafeSwipe - Авторизація',
        authorisation: 'Авторизація',
        userLogin: 'Логін',
        password: 'Пароль',
        login: 'Авторизуватись',
        haveAccount: 'Немає аккаунта? Реєстрація',
        contactUs: "Зв'язатись з нами",
        ourServices: 'Наші послуги',
        privacyPolicy: 'Політика конфеденційості',
        termsConditions: 'Умови користування'
    },
    en: {
        timeError: 'Error. Try again later',
        title: 'SafeSwipe - Authorisation',
        authorisation: 'Authorisation',
        userLogin: 'Login',
        password: 'Password',
        login: 'Login',
        haveAccount: 'Have no account? Register',
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
    
    document.title = getTranslation('title');
    document.getElementById('registraion-title').innerHTML = getTranslation('authorisation');
    document.getElementById('login').placeholder = getTranslation('userLogin');
    document.getElementById('password').placeholder = getTranslation('password');
    document.getElementById('register').innerHTML = getTranslation('login');
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
    haveAccountA.href = `/registration?lang=${urlParams.get('lang')}`; 
}

function addLoginButtonEvent(){
    const login = document.getElementById('login');
    const password = document.getElementById('password');

    const register = document.getElementById('register');

    register.addEventListener('click', async () => {
        const loginValue = login.value;
        const passwordValue = password.value;
        
        
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'pwd': passwordValue, 'email': loginValue })
        });

        const data = await response.json();

        if (response.ok) {

            console.log('ok');
            window.location.href = `/main?lang=${urlParams.get('lang')}`;

        } else {
            alert(data.message ?? getTranslation('timeError'));
        }
    });
}


makeChosen();
addHrefToLink();
addLoginButtonEvent();

