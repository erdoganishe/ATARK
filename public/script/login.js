const translations = {
    uk: {
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

let currentLanguage = 'uk';

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
    document.getElementById('registraion-title').innerHTML = getTranslation('authorisation');
    document.getElementById('login').placeholder = getTranslation('userLogin');
    document.getElementById('password').placeholder = getTranslation('password');
    document.getElementById('register').innerHTML = getTranslation('register');
    document.getElementById('have-account').innerHTML = getTranslation('haveAccount');
    document.getElementById('contact-us').innerHTML = getTranslation('contactUs');
    document.getElementById('our-service').innerHTML = getTranslation('ourServices');
    document.getElementById('private-policy').innerHTML = getTranslation('privacyPolicy');
    document.getElementById('terms-cconditions').innerHTML = getTranslation('termsConditions');
}

function addOnClickEventForLanguageSwitch() {

    var languageButtons = document.getElementsByClassName("flag-img");
    for (let i=0;i<languageButtons.length;i++){
        languageButtons[i].addEventListener("click", function () {
            for (let j = 0; j < languageButtons.length; j++) {
                languageButtons[j].classList.remove("choosen");
            }
            
            languageButtons[i].classList.add("choosen");

            switchLanguage();
            updateText();
        });
    }

    updateText();
}


addOnClickEventForLanguageSwitch();

