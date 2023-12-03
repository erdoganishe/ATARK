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
        email: 'Електронна пошта',
        editProfile: 'Редагувати профіль',
        login: 'Логін',
        editPassword: 'Змінити пароль ',
        avatar: 'Аватар',
        saveChanges: 'Зберегти зміни',
        logOut: 'Вийти з аккаунта',
        previousPassword: 'Попередній пароль',
        newPassword: 'Новий пароль',
        confirmPassword: 'Підтвердіть новий пароль',
        contactUs: "Зв'язатись з нами",
        ourServices: 'Наші послуги',
        privacyPolicy: 'Політика конфеденційості',
        termsConditions: 'Умови користування'
    },
    en: {
        email: 'E-mail',
        editProfile: 'Edit profile',
        login: 'Login',
        editPassword: 'Edit password',
        avatar: 'Avatar',
        saveChanges: 'Save changes',
        logOut: 'Log Out',
        previousPassword: 'Previous password',
        newPassword: 'New password',
        confirmPassword: 'Confirm new password',
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
    document.getElementById('edit-profile-button').innerHTML = getTranslation('editProfile');
    document.getElementById('email-label').innerHTML = getTranslation('email');
    document.getElementById('login-wrapper').innerHTML = getTranslation('login');
    document.getElementById('password-wrapper').innerHTML = getTranslation('editPassword');
    document.getElementById('old-password-input').placeholder = getTranslation('previousPassword');
    document.getElementById('new-password-input').placeholder = getTranslation('newPassword');
    document.getElementById('confirm-password-input').placeholder = getTranslation('confirmPassword');
    document.getElementById('avatar-wrapper').innerHTML = getTranslation('avatar');
    document.getElementById('save-changes-profile-button').innerHTML = getTranslation('saveChanges');
    document.getElementById('log-out-profile-button').innerHTML = getTranslation('logOut');
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

async function saveChangesAddEventListener(){
    resData = await getProfileData();
    const saveChangesButton = document.getElementById('save-changes-profile-button');
    saveChangesButton.addEventListener('click', async () => {
        jsonData = { "uId": `${resData._id}`, "isProfile": true 
    }
    const myFiles = document.getElementById('myFiles').files[0];

    const formData = new FormData();

    formData.append('file', myFiles);
    formData.append('jsonData', JSON.stringify(jsonData));
    const fileUpResponce = await fetch('/fileUpload', {
      method: 'POST',
      body: formData
    });
    const fileUpData = await fileUpResponce.json();
    console.log(fileUpData);
    });
}

async function getStartProfileInfo(){
    resData = await getProfileData();
    profileImage = document.getElementById('profile-img');


    const link = getImageOrFallback(
        `/img/profile/${resData._id}.png`,
        '/img/profile/avatar.png'
        ).then(result =>  profileImage.src = result || result);

    
    
}

async function getProfileData(){
    const responce = await fetch('/api/user');
    const resData = await responce.json();

    return resData;
}

saveChangesAddEventListener();
getStartProfileInfo();
makeChosen();
