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
    document.getElementById("save-changes-lock-button").classList.remove("hidden");
}

function hideButton(){
    document.getElementById("save-changes-lock-button").classList.add("hidden");
}

function editButtonAddEvent(){
    blockInputs();
    const saveChanges = document.getElementById("save-changes-lock-button");
    const editButton = document.getElementById("edit-lock-button");

    editButton.addEventListener('click', async ()=>{

        showButton();
        unblockInputs();
        editButton.classList.add("hidden");

        saveChanges.addEventListener('click',()=>{
            
            const newName = document.getElementById('name-input').value;
            const newAdress = document.getElementById('adress-input').value;
            
            blockInputs();
            hideButton();
            editButton.classList.remove("hidden");
        });


    });

}

makeChosen();
editButtonAddEvent();