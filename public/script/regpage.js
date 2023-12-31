
//get search params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const availableLanguages = {
    Ukrainian: 'uk',
    English: 'en'
}

//variable for current language
let currentLanguage = 'uk';

//get language from search params
if (Object.values(availableLanguages).includes(urlParams.get('lang'))){
    currentLanguage = urlParams.get('lang');
}

//object for list of translations
const translations = {
    uk: {
        timeError: 'Помилка. Спробуйте пізніше',
        passError: 'Паролі не збігаються',
        title: 'SafeSwipe - Реєстрація',
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
        timeError: 'Error. Try again later',
        passError: 'Passwords are not matched!',
        title: 'SafeSwipe - Registration',
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


//update translations
function updateText(){
    document.title = getTranslation('title');
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


//get translation for word for current language
function getTranslation(key) {
    return translations[currentLanguage][key] || key;
}


//switch language and update text
function switchLanguage (){

    if (currentLanguage == 'uk'){
        currentLanguage = 'en';
    }
    else
    {
        currentLanguage = 'uk';
    }

}


//add border to current language flag
function makeChosen() {

    //add border
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

    //update translations
    updateText();

}


//add redirect for authorisation
function addHrefToLink(){
    const haveAccountA = document.getElementById('have-account');
    haveAccountA.href = `/login?lang=${urlParams.get('lang')}`; 
}

//add event for click to registration button
function registrationButtonAddEvent(){

    //get text fields
    const emailInput = document.getElementById('email');
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');
    const passwordConInput = document.getElementById('confirm-password');
    const registrButton = document.getElementById('register');

    //add event listener for click
    registrButton.addEventListener('click', async () => {

        //get input values
        const email = emailInput.value;
        const username = loginInput.value;
        const password = passwordInput.value;
        const passwordCon = passwordConInput.value;
        
        if(password != passwordCon) {
            //alert not equal passwords error
            alert(getTranslation('passError'));

        } else {
            //request to back-end to register
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'user': username, 'pwd': password, 'email': email })
            });


            //get resonce
            const data = await response.json();

            if (response.ok) {
                //login if 
                console.log(data);
                window.location.href = `/login?lang=${urlParams.get('lang')}`;
            } else {
                alert(data.message ?? getTranslation('timeError'));
            }
        }
    });
}

//start events
addHrefToLink();
registrationButtonAddEvent();
makeChosen();
