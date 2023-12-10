const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const availableLanguages = {
    Ukrainian: 'uk',
    English: 'en'
}
let currentLanguage = 'uk';

let locksData;
let lockCount;
let currentPage =0;

if (Object.values(availableLanguages).includes(urlParams.get('lang'))){
    currentLanguage = urlParams.get('lang');
}

const translations = {
    uk: {
        title: 'SafeSwipe - Головна',
        yourLocks: 'Ваші замки',
        contactUs: "Зв'язатись з нами",
        ourServices: 'Наші послуги',
        privacyPolicy: 'Політика конфеденційості',
        termsConditions: 'Умови користування'
    },
    en: {
        title: 'SafeSwipe - Main',
        yourLocks: 'Your Locks',
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
    document.getElementById('your-locks').innerHTML = getTranslation('yourLocks');
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
    const toNewLock = document.getElementById('new-lock-href');
    
    toNewLock.addEventListener('click', ()=>{
        window.location.href = `/newLock?lang=${urlParams.get('lang')}`; 
    });
}



async function getLocks(){
    const responce = await fetch('/api/lock');
    const lockData = await responce.json();

    return lockData;
}


function cleanLocks(){
    const locks = document.getElementsByClassName('lock-container');
    for (let i = 0; i < 8; i++){
        locks[i].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src = 'img/lock/sample.png';
        locks[i].getElementsByTagName("a")[0].href = '';
        locks[i].getElementsByTagName("div")[0].innerHTML = 'You haven`t this lock yet';
    }  
}

function updateLocks(){
    const locks = document.getElementsByClassName('lock-container');

    let countOfLocksOnPage = 8;
    if ( (currentPage+1) * 8 > lockCount){
        countOfLocksOnPage = lockCount % 8;
    }

    for (let i = 0; i < countOfLocksOnPage; i++){
        locks[i].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src = `../img/lock/${locksData[0].uId}/${locksData[i+currentPage*8]._id}.png`;
        locks[i].getElementsByTagName("a")[0].href = `/lock?lang=${urlParams.get('lang')}&id=${locksData[i+currentPage*8]._id}`;
        locks[i].getElementsByTagName("div")[0].innerHTML = `${locksData[i+currentPage*8].name}`;
    }  
    
}

function addSwapPagesEvents(){

    const PrevPageButton = document.getElementById('button-previous');
    const nextPageButton = document.getElementById('button-next');

    PrevPageButton.addEventListener('click', () => {
        if (currentPage*8 - 8 >= 0) {
            currentPage -= 1;
        }
        else
        {
            currentPage = (lockCount - lockCount % 8)/8;
        }
        console.log(currentPage);
        cleanLocks();
        updateLocks();
    });

    nextPageButton.addEventListener('click', ()=>{
        if (currentPage*8 + 8 < lockCount) {
            currentPage += 1;
        }
        else {
            currentPage = 0;
        }
        console.log(currentPage);
        cleanLocks();
        updateLocks();
    });
}


async function setup(){

    locksData = await getLocks();
    console.log(locksData);
    lockCount = locksData.length;
    makeChosen();
    addHrefToButtons();
    addSwapPagesEvents();
    cleanLocks();
    updateLocks();
    

}

setup();
