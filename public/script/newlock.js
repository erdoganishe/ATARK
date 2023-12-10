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
        title: 'SafeSwipe - Новий замок',
        newLock: 'Новий замок',
        identificator: 'Ідентифікатор',
        name: "Ім'я",
        adress: 'Адреса',
        image: 'Зображення',
        addLock: 'Додати замок',
        contactUs: "Зв'язатись з нами",
        ourServices: 'Наші послуги',
        privacyPolicy: 'Політика конфеденційості',
        termsConditions: 'Умови користування',
        imageOrDataError: 'Немає зображення або інформації'
    },
    en: {
        title: 'SafeSwipe - New Lock',
        newLock: 'New Lock',
        identificator: 'Identificator',
        name: 'Name',
        adress: 'Adress',
        image: 'Image',
        addLock: 'Add Lock',
        contactUs: 'Contact us',
        ourServices: 'Our Services',
        privacyPolicy: 'Privacy Policy',
        termsConditions: 'Terms & Conditions',
        imageOrDataError: 'Image or data missing'
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
    document.getElementById('new-lock-title').innerHTML = getTranslation('newLock');
    document.getElementById('name-input-title').innerHTML = getTranslation('name');
    document.getElementById('name-input').placeholder = getTranslation('name');
    document.getElementById('adress-input-title').innerHTML = getTranslation('adress');
    document.getElementById('adress-input').placeholder = getTranslation('adress');
    document.getElementById('image-input-title').innerHTML = getTranslation('image');
    document.getElementById('add-button-title').innerHTML = getTranslation('addLock');
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

async function getProfileData(){
    const responce = await fetch('/api/user');
    const resData = await responce.json();

    return resData;
}

async function addNewLock (){
    const nameLock = document.getElementById('name-input').value;
    const adressLock = document.getElementById('adress-input').value;
    const addNewLockButton = document.getElementById('add-button-title');
    resData = await getProfileData();

    addNewLockButton.addEventListener('click', async () => {

        const nameLock = document.getElementById('name-input').value;
        const adressLock = document.getElementById('adress-input').value;
        
        const formData = new FormData();
        const myFiles = document.getElementById('myFiles').files

        let tmp = 0;
        if(myFiles)
            Object.keys(myFiles).forEach(key => {
                tmp++;
            });
        console.log(tmp);
        
        if(tmp > 0 && checkData()){
            const lockResponce = await fetch('/api/lock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'uId': `${resData._id}`, 'name': nameLock,'adress': adressLock})
            });
            const lockData = await lockResponce.json();
  
            jsonData = { "uId": `${resData._id}`, "isProfile": false, "fileId": `${lockData._id}`};
            formData.append('file', myFiles[0]);
            formData.append('jsonData', JSON.stringify(jsonData));

            const fileUpResponce = await fetch('/fileUpload', {
                method: 'POST',
                body: formData
            });
            const fileUpData = await fileUpResponce.json();
            window.location.href = `/main?lang=${urlParams.get('lang')}`;
        } else {

            alert(getTranslation('imageOrDataError'));
        }
    });
}

makeChosen();
addNewLock();