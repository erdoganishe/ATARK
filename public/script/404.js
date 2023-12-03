const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const availableLanguages = {
    Ukrainian: 'uk',
    English: 'en'
}
let currentLanguage = 'uk';
console.log(currentLanguage);

if (Object.values(availableLanguages).includes(urlParams.get('lang'))){
    currentLanguage = urlParams.get('lang');
}

console.log(currentLanguage);

const translations = {
    uk: {
        pageNotFound: 'Сторінку не знайдено!',
        toMainPage: 'Повернутись на головну',
        contactUs: "Зв'язатись з нами",
        ourServices: 'Наші послуги',
        privacyPolicy: 'Політика конфеденційості',
        termsConditions: 'Умови користування'
    },
    en: {
        pageNotFound: 'Page not found!',
        toMainPage: 'Return to main page',
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
    
    document.getElementById('page-not-found').innerHTML = getTranslation('pageNotFound');
    document.getElementById('to-main').innerHTML = getTranslation('toMainPage');
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


function addHrefToButtons(){
    const toProfile = document.getElementById('profile-href');
    toProfile.addEventListener('click', ()=>{
        window.location.href = `/profile?lang=${urlParams.get('lang')}`; 
    });

    const toMain = document.getElementById('to-main-link');
    toMain.href = `/?lang=${urlParams.get('lang')}`; 
 
    const toMainHref = document.getElementById('to-main-href');
    toMainHref.addEventListener('click', ()=>{
        window.location.href = `/main?lang=${urlParams.get('lang')}`; 
    });
}

makeChosen();
addHrefToButtons();