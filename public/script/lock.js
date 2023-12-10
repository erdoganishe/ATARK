const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let lockId = urlParams.get('id');
let lockData;


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
        title: 'SafeSwipe - Замок',
        idLabel: 'Ідентифікатор',
        nameLabel: "Ім'я",
        placeholderName: "Введіть нове ім'я",
        adressLabel: 'Адреса',
        placeholderAdress: 'Введіть новy адресу',
        saveChanges: 'Зберігти зміни',
        change: 'Змінити', 
        contactUs: "Зв'язатись з нами",
        ourServices: 'Наші послуги',
        privacyPolicy: 'Політика конфеденційості',
        termsConditions: 'Умови користування',
    },
    en: {
        title: 'SafeSwipe - Lock',
        idLabel: 'ID',
        nameLabel: 'Name',
        placeholderName: 'Put new name',
        adressLabel: 'Adress',
        placeholderAdress: 'Put new adress',
        saveChanges: 'Save changes',
        change: 'Change', 
        contactUs: 'Contact us',
        ourServices: 'Our Services',
        privacyPolicy: 'Privacy Policy',
        termsConditions: 'Terms & Conditions',
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
    document.getElementById('edit-lock-button').innerHTML = getTranslation('change');
    document.getElementById('id-label').innerHTML = getTranslation('idLabel');
    document.getElementById('name-label').innerHTML = getTranslation('nameLabel');
    document.getElementById('name-input').placeholder = getTranslation('placeholderName');
    document.getElementById('adress-label').innerHTML = getTranslation('adressLabel');
    document.getElementById('adress-input').placeholder = getTranslation('placeholderAdress');
    document.getElementById('save-changes-lock-button').innerHTML = getTranslation('saveChanges');
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

async function getLockData(){
    const responce = await fetch(`/api/lock/${lockId}`);
    const lockData = await responce.json();

    return lockData;
}

function blockInputs(){
    const nameInput = document.getElementById('name-input');
    const adressInput = document.getElementById('adress-input');

    nameInput.disabled = true;
    adressInput.disabled = true;
}

function unblockInputs(){
    const nameInput = document.getElementById('name-input');
    const adressInput = document.getElementById('adress-input');

    nameInput.disabled = false;
    adressInput.disabled = false;
}

function showButton(){
    document.getElementById("hidden-wrapper").classList.remove("hidden");
    document.getElementById("save-changes-lock-button").classList.remove("hidden");
}

function hideButton(){
    document.getElementById("hidden-wrapper").classList.add("hidden");
    document.getElementById("save-changes-lock-button").classList.add("hidden");
}

async function editButtonAddEvent(){
    blockInputs();
    const saveChanges = document.getElementById("save-changes-lock-button");
    const editButton = document.getElementById("edit-lock-button");

    editButton.addEventListener('click', async ()=>{

        showButton();
        unblockInputs();
        editButton.classList.add("hidden");

        saveChanges.addEventListener('click', async () => {
            
            const newName = document.getElementById('name-input').value;
            const newAdress = document.getElementById('adress-input').value;

            let putBody = {};

            putBody.id = lockId;
            
            if (newName!=""){
                putBody.name = newName;
            }
            if (newAdress!=""){
                putBody.adress = newAdress;
            }

            const lockResponce = await fetch('/api/lock', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(putBody)
            });
            const lockData = await lockResponce.json();
            
            const myFiles = document.getElementById('myFiles').files[0];
            console.log(myFiles);
            let formData = new FormData();
            jsonData = { "uId": `${lockData.uId}`, "isProfile": false, "fileId": `${lockData._id}`};
            formData.append('file', myFiles);
            formData.append('jsonData', JSON.stringify(jsonData));

            const fileUpResponce = await fetch('/fileUpload', {
                method: 'POST',
                body: formData
            });
            const fileUpData = await fileUpResponce.json();
            console.log(fileUpData);

            blockInputs();
            hideButton();
            editButton.classList.remove("hidden");

            window.location.href = `?lang=${urlParams.get('lang')}&id=${lockId}`;
        });


    });

}

async function setData(){
    const lockImage = document.getElementById('lock-image');
    const lockIdContainer = document.getElementById('placeholder-id');
    const lockNameContainer = document.getElementById('name-input');
    const lockAdressContainer = document.getElementById('adress-input');

    lockImage.src = `../img/lock/${lockData.uId}/${lockData._id}.png`;
    lockIdContainer.innerHTML = lockData._id;
    lockNameContainer.value = lockData.name;
    lockAdressContainer.value = lockData.adress;
}

function updateHrefs(){
    const ukHref = document.getElementById('uk-redirect');
    const enHref = document.getElementById('en-redirect');

    ukHref.href = `?lang=uk&id=${lockId}`;
    enHref.href = `?lang=en&id=${lockId}`;
}

async function setup(){
        
    lockData = await getLockData();
    setData();
    makeChosen();
    editButtonAddEvent();    
    updateHrefs();
}



setup();