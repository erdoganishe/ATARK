//get seach parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const availableLanguages = {
    Ukrainian: 'uk',
    English: 'en'
}

//variable for current language
let currentLanguage = 'uk';

//variables for locks data
let locksData;
let lockCount;

//variable for current page
let currentPage =0;

//get current language from search parameters
if (Object.values(availableLanguages).includes(urlParams.get('lang'))){
    currentLanguage = urlParams.get('lang');
}

//object for list of translations
const translations = {
    uk: {
        title: 'SafeSwipe - Головна',
        yourLocks: 'Ваші замки',
        contactUs: "Зв'язатись з нами",
        ourServices: 'Наші послуги',
        privacyPolicy: 'Політика конфеденційості',
        termsConditions: 'Умови користування',
        noLockCase: 'Ще немає замка'
    },
    en: {
        title: 'SafeSwipe - Main',
        yourLocks: 'Your Locks',
        contactUs: 'Contact us',
        ourServices: 'Our Services',
        privacyPolicy: 'Privacy Policy',
        termsConditions: 'Terms & Conditions',
        noLockCase: 'You haven`t this lock yet'
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
    document.getElementById('your-locks').innerHTML = getTranslation('yourLocks');
    document.getElementById('contact-us').innerHTML = getTranslation('contactUs');
    document.getElementById('our-service').innerHTML = getTranslation('ourServices');
    document.getElementById('private-policy').innerHTML = getTranslation('privacyPolicy');
    document.getElementById('terms-conditions').innerHTML = getTranslation('termsConditions');

}


//add borders for current language and update transations
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

    //update translations
    updateText();

}


//add redirects
function addHrefToButtons(){

    //get button
    const toNewLock = document.getElementById('new-lock-href');
    
    //add redirect event 
    toNewLock.addEventListener('click', ()=>{
        window.location.href = `/newLock?lang=${urlParams.get('lang')}`; 
    });

}


//get lock data from back-end
async function getLocks(){
    const responce = await fetch('/api/lock');
    const lockData = await responce.json();

    return lockData;
}


//set default values for locks
function cleanLocks(){

    //get locks
    const locks = document.getElementsByClassName('lock-container');
    
    //set default values
    for (let i = 0; i < 8; i++){
        locks[i].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src = 'img/lock/sample.png';
        locks[i].getElementsByTagName("a")[0].href = '';
        locks[i].getElementsByTagName("div")[0].innerHTML = getTranslation('noLockCase');
    }  
}


//set values of locks on current page
function updateLocks(){

    //get locks
    const locks = document.getElementsByClassName('lock-container');

    //get count of locks on page
    let countOfLocksOnPage = 8;
    if ( (currentPage+1) * 8 > lockCount){
        countOfLocksOnPage = lockCount % 8;
    }

    //update values for locks on this page
    for (let i = 0; i < countOfLocksOnPage; i++){
        locks[i].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src = `../img/lock/${locksData[0].uId}/${locksData[i+currentPage*8]._id}.png`;
        locks[i].getElementsByTagName("a")[0].href = `/lock?lang=${urlParams.get('lang')}&id=${locksData[i+currentPage*8]._id}`;
        locks[i].getElementsByTagName("div")[0].innerHTML = `${locksData[i+currentPage*8].name}`;
    }  
    
}


//add page swap
function addSwapPagesEvents(){

    //get swap button
    const PrevPageButton = document.getElementById('button-previous');
    const nextPageButton = document.getElementById('button-next');

    //add event for previous page
    PrevPageButton.addEventListener('click', () => {

        //get new current page
        if (currentPage*8 - 8 >= 0) {
            currentPage -= 1;
        }
        else
        {
            currentPage = (lockCount - lockCount % 8)/8;
        }

        //update info
        cleanLocks();
        updateLocks();
    });

    //add event for next page
    nextPageButton.addEventListener('click', ()=>{

         //get new current page
        if (currentPage*8 + 8 < lockCount) {
            currentPage += 1;
        }
        else {
            currentPage = 0;
        }

        //update info
        cleanLocks();
        updateLocks();
    });
}


//start functions
async function setup(){

    //get lock data
    locksData = await getLocks();
    lockCount = locksData.length;
    
    //start functions
    makeChosen();
    addHrefToButtons();
    addSwapPagesEvents();
    cleanLocks();
    updateLocks();
    
}


//start functions
setup();
