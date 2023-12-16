
//get search parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const availableLanguages = {
    Ukrainian: 'uk',
    English: 'en'
}

//variable for current language
let currentLanguage = 'uk';

//get cuurent language from search parameters
if (Object.values(availableLanguages).includes(urlParams.get('lang'))){
    currentLanguage = urlParams.get('lang');
}

//object for list of translations
const translations = {
    uk: {
        title: 'SafeSwipe - Сторінка 404',
        pageNotFound: 'Сторінку не знайдено!',
        toMainPage: 'Повернутись на головну',
        contactUs: "Зв'язатись з нами",
        ourServices: 'Наші послуги',
        privacyPolicy: 'Політика конфеденційості',
        termsConditions: 'Умови користування'
    },
    en: {
        title: 'SafeSwipe - Page404',
        pageNotFound: 'Page not found!',
        toMainPage: 'Return to main page',
        contactUs: 'Contact us',
        ourServices: 'Our Services',
        privacyPolicy: 'Privacy Policy',
        termsConditions: 'Terms & Conditions'
    }
};


//get translation for word for current language
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


//update translations
function updateText(){
    document.title = getTranslation('title');
    document.getElementById('page-not-found').innerHTML = getTranslation('pageNotFound');
    document.getElementById('to-main').innerHTML = getTranslation('toMainPage');
    document.getElementById('contact-us').innerHTML = getTranslation('contactUs');
    document.getElementById('our-service').innerHTML = getTranslation('ourServices');
    document.getElementById('private-policy').innerHTML = getTranslation('privacyPolicy');
    document.getElementById('terms-conditions').innerHTML = getTranslation('termsConditions');
}


//add border to current language flag and update text
function makeChosen() {

    //get flags
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


//start functions
makeChosen();
