
//get search parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const availableLanguages = {
    Ukrainian: 'uk',
    English: 'en'
}

//variable for current language
let currentLanguage = 'uk';

//get current languages from parameters
if (Object.values(availableLanguages).includes(urlParams.get('lang'))){
    currentLanguage = urlParams.get('lang');
}

//object for list of translations
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


//get tranlation for word for current language
function getTranslation(key) {
    return translations[currentLanguage][key] || key;
}


//switch language 
function switchLanguage (){
    if (currentLanguage == 'uk'){
        currentLanguage = 'en';
    }
    else
    {
        currentLanguage = 'uk';
    }
}


//set translation for text fields
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


//add border to cuurent language flag and update text
function makeChosen() {

    //get buttons
    var languageButtons = document.getElementsByClassName("flag-img");
    
    //add border
    for (let i=0;i<languageButtons.length;i++){
        languageButtons[i].classList.remove("choosen");
    }
    if (currentLanguage=='uk'){
        languageButtons[0].classList.add("choosen");
    }
    else{
        languageButtons[1].classList.add("choosen");
    }
    
    //update text
    updateText();

}


//add redirect to registration
function addHrefToLink(){
    const haveAccountA = document.getElementById('have-account');
    haveAccountA.href = `/registration?lang=${urlParams.get('lang')}`; 
}


//add event for login click
function addLoginButtonEvent(){

    //get login and password input
    const login = document.getElementById('login');
    const password = document.getElementById('password');

    //get button
    const register = document.getElementById('register');

    //add event listener
    register.addEventListener('click', async () => {
        
        //get input values
        const loginValue = login.value;
        const passwordValue = password.value;
        
        //fetch to back-end
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'pwd': passwordValue, 'email': loginValue })
        });

        //get responce
        const data = await response.json();

        if (response.ok) {
            //login if ok
            window.location.href = `/main?lang=${urlParams.get('lang')}`;

        } else {

            //alert error if wrong input
            alert(data.message ?? getTranslation('timeError'));
        }
 
    });

}

//start functions
makeChosen();
addHrefToLink();
addLoginButtonEvent();

