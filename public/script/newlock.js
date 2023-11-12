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
        newLock: 'Новий замок',
        identificator: 'Ідентифікатор',
        name: "Ім'я",
        adress: 'Адреса',
        image: 'Зображення',
        addLock: 'Додати замок',
        contactUs: "Зв'язатись з нами",
        ourServices: 'Наші послуги',
        privacyPolicy: 'Політика конфеденційості',
        termsConditions: 'Умови користування'
    },
    en: {
        newLock: 'New Lock',
        identificator: 'Identificator',
        name: 'Name',
        adress: 'Adress',
        image: 'Image',
        addLock: 'Add Lock',
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
    document.getElementById('new-lock-title').innerHTML = getTranslation('newLock');
    document.getElementById('id-input-title').innerHTML = getTranslation('identificator');
    document.getElementById('id-input').placeholder = getTranslation('identificator');
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



// async function getProfileData(){
//     const responce = await fetch('/api/user');
//     const resData = await responce.json();

//     return resData;
// }

// async function saveChangesAddEventListener(){
//     resData = await getProfileData();
//     const saveChangesButton = document.getElementById('save-changes-profile-button');
//     saveChangesButton.addEventListener('click', async () => {
//         jsonData = { "uId": `${resData._id}`, "isProfile": true 
//     }
//     const myFiles = document.getElementById('myFiles').files[0];

//     const formData = new FormData();

//     formData.append('file', myFiles);
//     formData.append('jsonData', JSON.stringify(jsonData));
//     const fileUpResponce = await fetch('/fileUpload', {
//       method: 'POST',
//       body: formData
//     });
//     const fileUpData = await fileUpResponce.json();
//     console.log(fileUpData);
//     });
// }

//saveChangesAddEventListener();
makeChosen();
