
//get search parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

//variale for lock id from params
let lockId = urlParams.get('id');

//variable for lock data
let lockData;

const availableLanguages = {
    Ukrainian: 'uk',
    English: 'en'
}

//variable for current language
let currentLanguage = 'uk';

//get language from search parameters
if (Object.values(availableLanguages).includes(urlParams.get('lang'))){
    currentLanguage = urlParams.get('lang');
}

//object for list of translations
const translations = {
    uk: {
        logContainer: 'Логування',
        openCase: 'Спроба відкрити замок',
        addCase: 'Додавання нового замка',
        removeCase: 'Видалення старого замка',
        date: 'Дата та час відкриття: ',
        typeOfInteruption: ' Дія: ',
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
        openCase: 'Attemp to open',
        addCase: 'Add new key',
        removeCase: 'Remove old key',
        logContainer: 'Logs',
        date: 'Date and time of opening: ',
        typeOfInteruption: ' Interuption: ',
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

//get translation of word for current language
function getTranslation(key) {
    return translations[currentLanguage][key] || key;
}

//switch languages
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
    document.getElementById('log-label').innerHTML = getTranslation('logContainer');

}


//add border and update text
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

//fetch from back-end lock data
async function getLockData(){
    const responce = await fetch(`/api/lock/${lockId}`);
    const lockData = await responce.json();
    return lockData;
}

//block inputs while no permission
function blockInputs(){

    //get inputs
    const nameInput = document.getElementById('name-input');
    const adressInput = document.getElementById('adress-input');

    //make inputs blocked
    nameInput.disabled = true;
    adressInput.disabled = true;

}


//unblock inputs while permission
function unblockInputs(){

    //get inputs
    const nameInput = document.getElementById('name-input');
    const adressInput = document.getElementById('adress-input');

    //unblock inputs
    nameInput.disabled = false;
    adressInput.disabled = false;
}


//show buttons 
function showButton(){
    document.getElementById("hidden-wrapper").classList.remove("hidden");
    document.getElementById("save-changes-lock-button").classList.remove("hidden");
}


//hide buttons 
function hideButton(){
    document.getElementById("hidden-wrapper").classList.add("hidden");
    document.getElementById("save-changes-lock-button").classList.add("hidden");
}


//add event for edit buuton click
async function editButtonAddEvent(){

    //block inputs
    blockInputs();

    //get buttons
    const saveChanges = document.getElementById("save-changes-lock-button");
    const editButton = document.getElementById("edit-lock-button");

    //add event listener
    editButton.addEventListener('click', async ()=>{

        //show buttons and unblock inputs
        showButton();
        unblockInputs();
        editButton.classList.add("hidden");

        //add event for save changes
        saveChanges.addEventListener('click', async () => {
            
            //get values
            const newName = document.getElementById('name-input').value;
            const newAdress = document.getElementById('adress-input').value;

            //variable for responce body
            let putBody = {};

            //modify body
            putBody.id = lockId;
            if (newName!=""){
                putBody.name = newName;
            }
            if (newAdress!=""){
                putBody.adress = newAdress;
            }

            //fetch to db for changes
            const lockResponce = await fetch('/api/lock', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(putBody)
            });

            //get responce
            const lockData = await lockResponce.json();
            
            //get image to upload
            const myFiles = document.getElementById('myFiles').files[0];
            
            //variable for image request body
            let formData = new FormData();
            jsonData = { "uId": `${lockData.uId}`, "isProfile": false, "fileId": `${lockData._id}`};
            
            //modify image body
            formData.append('file', myFiles);
            formData.append('jsonData', JSON.stringify(jsonData));

            //fetch to change image
            const fileUpResponce = await fetch('/fileUpload', {
                method: 'POST',
                body: formData
            });

            //get responce
            const fileUpData = await fileUpResponce.json();
            
            //hide buttins and block inputs
            blockInputs();
            hideButton();
            editButton.classList.remove("hidden");

            //redirect
            window.location.href = `?lang=${urlParams.get('lang')}&id=${lockId}`;
        });


    });

}

//get start data
async function setData(){
    //get inputs and labels
    const lockImage = document.getElementById('lock-image');
    const lockIdContainer = document.getElementById('placeholder-id');
    const lockNameContainer = document.getElementById('name-input');
    const lockAdressContainer = document.getElementById('adress-input');
    const logContainer = document.getElementById('placeholder-log');

    //get logs 
    let logString = lockData.log[lockData.log.length-1]; 
    let dateSubString = '';

    //modify logs for current data format
    if (currentLanguage == 'uk'){
        dateSubString += logString.split('\t')[0][6];
        dateSubString += logString.split('\t')[0][7];
        dateSubString += ".";
        dateSubString += logString.split('\t')[0][4];
        dateSubString += logString.split('\t')[0][5];
        dateSubString += ".";
        dateSubString += logString.split('\t')[0][0];
        dateSubString += logString.split('\t')[0][1];
        dateSubString += logString.split('\t')[0][2];
        dateSubString += logString.split('\t')[0][3];

    }
    else
    {
        dateSubString += logString.split('\t')[0][4];
        dateSubString += logString.split('\t')[0][5];
        dateSubString += ".";
        dateSubString += logString.split('\t')[0][6];
        dateSubString += logString.split('\t')[0][7];
        dateSubString += ".";
        dateSubString += logString.split('\t')[0][0];
        dateSubString += logString.split('\t')[0][1];
        dateSubString += logString.split('\t')[0][2];
        dateSubString += logString.split('\t')[0][3];
    }

    //modify other part of log
    let typeSubString = '';
    if (logString.split('\t')[3] == 'try-open'){
        typeSubString = getTranslation('openCase');
    }
    else{
        if (logString.split('\t')[3] == 'add'){
            typeSubString = getTranslation('addCase');
        }
        else
        {
            typeSubString = getTranslation('removeCase');
        }
    }

    let resurtLogString = getTranslation('date') + dateSubString + " UTC+2 " + logString.split('\t')[1] + getTranslation('typeOfInteruption') + typeSubString;

    //set values for inputs and labels
    lockImage.src = `../img/lock/${lockData.uId}/${lockData._id}.png`;
    lockIdContainer.innerHTML = lockData._id;
    logContainer.innerHTML = resurtLogString;
    lockNameContainer.value = lockData.name;
    lockAdressContainer.value = lockData.adress;
}


//update redirects
function updateHrefs(){
    const ukHref = document.getElementById('uk-redirect');
    const enHref = document.getElementById('en-redirect');

    ukHref.href = `?lang=uk&id=${lockId}`;
    enHref.href = `?lang=en&id=${lockId}`;
}


//start function
async function setup(){
        
    lockData = await getLockData();
    setData();
    makeChosen();
    editButtonAddEvent();    
    updateHrefs();
}


//setup
setup();