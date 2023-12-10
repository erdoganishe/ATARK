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
        editError: 'Неплавильно введені дані',
        title: 'SafeSwipe - Профіль',
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
        editError: 'Wrong input data',
        title: 'SafeSwipe - Profile',
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
    
    document.title = getTranslation('title');
    document.getElementById('edit-profile-button').innerHTML = getTranslation('editProfile');
    document.getElementById('email-label').innerHTML = getTranslation('email');
    document.getElementById('login-wrapper').innerHTML = getTranslation('login');
    document.getElementById('password-wrapper').innerHTML = getTranslation('editPassword');
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


function blockInputs(){

    const loginInput = document.getElementById('login-input');
    const emailInput = document.getElementById('email-input');
    const newPasswordInput = document.getElementById('new-password-input');
    const confirmPasswordInput = document.getElementById('confirm-password-input');
    

    loginInput.disabled = true;
    emailInput.disabled = true;
    newPasswordInput.disabled = true;
    confirmPasswordInput.disabled = true;
    
}

function unblockInputs(){

    const loginInput = document.getElementById('login-input');
    const emailInput = document.getElementById('email-input');
    const newPasswordInput = document.getElementById('new-password-input');
    const confirmPasswordInput = document.getElementById('confirm-password-input');

    loginInput.disabled = false;
    emailInput.disabled = false;
    newPasswordInput.disabled = false;
    confirmPasswordInput.disabled = false;
    
}

function showButton(){
    document.getElementById("hidden-wrapper").classList.remove("hidden");
    document.getElementById("save-changes-profile-button").classList.remove("hidden");
}

function hideButton(){
    document.getElementById("hidden-wrapper").classList.add("hidden");
    document.getElementById("save-changes-profile-button").classList.add("hidden");
}

async function setValueForInputs(){
    userData = await getProfileData();
    
    const loginInput = document.getElementById('login-input');
    const emailInput = document.getElementById('email-input');

    emailInput.value = userData.email;
    loginInput.value = userData.username;

    const loginLabel = document.getElementById('profile-name-label');

    loginLabel.innerHTML = userData.username;
}

async function setPlaceholderForInputs(){
    userData = await getProfileData();
    
    const loginInput = document.getElementById('login-input');
    const emailInput = document.getElementById('email-input');

    console.log(userData);
    emailInput.value = "";
    loginInput.value = "";
    emailInput.placeholder = userData.email;
    loginInput.placeholder = userData.username;
}

function editButtonAddEvent(){

    blockInputs();
    const saveChanges = document.getElementById("save-changes-profile-button");
    const editButton = document.getElementById("edit-profile-button");

    editButton.addEventListener('click', async () => {

        showButton();
        unblockInputs();
        editButton.classList.add("hidden");
        setPlaceholderForInputs();

        saveChanges.addEventListener('click', async () => {
            
            const loginInputValue = document.getElementById('login-input').value;
            const emailInputValue = document.getElementById('email-input').value;
            
            const newPasswordInputValue = document.getElementById('new-password-input').value;
            const confirmPasswordInputValue = document.getElementById('confirm-password-input').value;
            
            let putBody = {
            };
            blockInputs();
            hideButton();
            setValueForInputs();
            editButton.classList.remove("hidden");
            if (emailInputValue!=""){
                putBody.email = emailInputValue;
            }
            if (loginInputValue!=""){
                putBody.username = loginInputValue;
            }
            if (newPasswordInputValue==confirmPasswordInputValue){
                if (newPasswordInputValue!=""){
                    putBody.pwd = newPasswordInputValue;
                }   
            }
            else
            {
                alert(getTranslation("editError"));
            }
            
            const userResponce = await fetch('/api/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(putBody)
            });
            const userData = await userResponce.json();
            
            const responce = await fetch('/auth/logout');
            window.location.href = `/login?lang=${urlParams.get('lang')}`; 

        });
    });
}

editButtonAddEvent();
saveChangesAddEventListener();
getStartProfileInfo();
makeChosen();
setValueForInputs();
