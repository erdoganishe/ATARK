

//get search parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const availableLanguages = {
    Ukrainian: 'uk',
    English: 'en'
}


//variable for language
let currentLanguage = 'uk';

//get current 
if (Object.values(availableLanguages).includes(urlParams.get('lang'))){
    currentLanguage = urlParams.get('lang');
}


//object fro list of all translation
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
        termsConditions: 'Умови користування',
        toAdmin: 'Панель адміністратора'
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
        termsConditions: 'Terms & Conditions',
        toAdmin: 'Administartion panel'
    }
};


//get a tanslation of object field for current language
function getTranslation(key) {
    return translations[currentLanguage][key] || key;
}


//swap language
function switchLanguage (){
    if (currentLanguage == 'uk'){
        currentLanguage = 'en';
    }
    else
    {
        currentLanguage = 'uk';
    }
}


//set translation for all 
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
    document.getElementById('to-admin-page').innerHTML = getTranslation('toAdmin');

}


//set border for active language flag and update text
function makeChosen() {
    
    //get flags from html page
    var languageButtons = document.getElementsByClassName("flag-img");

    //set border for current language flag
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


//add click event for save changes button
async function saveChangesAddEventListener(){

    //get profile info from back-end
    resData = await getProfileData();
    
    //get save changes button from html 
    const saveChangesButton = document.getElementById('save-changes-profile-button');

    //add event listener for click
    saveChangesButton.addEventListener('click', async () => {
        //
        jsonData = { "uId": `${resData._id}`, "isProfile": true}

        //get file and text fileds to fetch
        const myFiles = document.getElementById('myFiles').files[0];

        const formData = new FormData();

        formData.append('file', myFiles);
        formData.append('jsonData', JSON.stringify(jsonData));

        //fetch changes to back-end
        const fileUpResponce = await fetch('/fileUpload', {
        method: 'POST',
        body: formData
        });
        const fileUpData = await fileUpResponce.json();
        console.log(fileUpData);
    });
}


//get start info of profile
async function getStartProfileInfo(){

    //get profile data from backend
    resData = await getProfileData();

    const profileImage = document.getElementById('profile-img');
    const link = getImageOrFallback(
        `/img/profile/${resData._id}.png`,
        '/img/profile/avatar.png'
        ).then(result =>  profileImage.src = result || result);

    //set href to admin panel 
    const toAdminButton = document.getElementById('to-admin-page');
    
    toAdminButton.addEventListener('click', ()=>{
        window.location.href = `/admin-panel?lang=${urlParams.get('lang')}`; 
    });

    //hide admin panel if no admin
    if (resData.roles.Admin != 5150){
        toAdminButton.classList.add("hidden");
    }
    
}


//get profile data from back-end
async function getProfileData(){
    const responce = await fetch('/api/user');
    const resData = await responce.json();

    return resData;
}


//block inputs when changes not permited
function blockInputs(){

    //get inputs
    const loginInput = document.getElementById('login-input');
    const emailInput = document.getElementById('email-input');
    const newPasswordInput = document.getElementById('new-password-input');
    const confirmPasswordInput = document.getElementById('confirm-password-input');
    
    //block inputs
    loginInput.disabled = true;
    emailInput.disabled = true;
    newPasswordInput.disabled = true;
    confirmPasswordInput.disabled = true;
    
}

//unblock inputs when changes are permited
function unblockInputs(){

    //get inputs
    const loginInput = document.getElementById('login-input');
    const emailInput = document.getElementById('email-input');
    const newPasswordInput = document.getElementById('new-password-input');
    const confirmPasswordInput = document.getElementById('confirm-password-input');

    //unblock inputs
    loginInput.disabled = false;
    emailInput.disabled = false;
    newPasswordInput.disabled = false;
    confirmPasswordInput.disabled = false;
    
}


//show buttons when they are active
function showButton(){
    document.getElementById("hidden-wrapper").classList.remove("hidden");
    document.getElementById("save-changes-profile-button").classList.remove("hidden");
}


//hide buttons when they are inactive
function hideButton(){
    document.getElementById("hidden-wrapper").classList.add("hidden");
    document.getElementById("save-changes-profile-button").classList.add("hidden");
}


//set start value for profile inputs
async function setValueForInputs(){

    //get user data
    userData = await getProfileData();
    
    //get profile inputs
    const loginInput = document.getElementById('login-input');
    const emailInput = document.getElementById('email-input');
    const loginLabel = document.getElementById('profile-name-label');

    //set values for those inputs
    emailInput.value = userData.email;
    loginInput.value = userData.username;
    loginLabel.innerHTML = userData.username;
}


//set placeholders for profile inputs
async function setPlaceholderForInputs(){

    //get user data
    userData = await getProfileData();
    
    //get profile inputs
    const loginInput = document.getElementById('login-input');
    const emailInput = document.getElementById('email-input');

    //set null default value
    emailInput.value = "";
    loginInput.value = "";

    //set placeholdes value
    emailInput.placeholder = userData.email;
    loginInput.placeholder = userData.username;

}


//add event listener for click to chande button
function editButtonAddEvent(){

    //block inputs
    blockInputs();

    //get buttons
    const saveChanges = document.getElementById("save-changes-profile-button");
    const editButton = document.getElementById("edit-profile-button");

    //add event listener
    editButton.addEventListener('click', async () => {

        //show and unblock elements
        showButton();
        unblockInputs();

        //hide edit button
        editButton.classList.add("hidden");
        
        //set placeholders and null values
        setPlaceholderForInputs();

        //add event to save changes button
        saveChanges.addEventListener('click', async () => {
            
            //get input values
            const loginInputValue = document.getElementById('login-input').value;
            const emailInputValue = document.getElementById('email-input').value;
            const newPasswordInputValue = document.getElementById('new-password-input').value;
            const confirmPasswordInputValue = document.getElementById('confirm-password-input').value;
            
            //variable for request body
            let putBody = {
            };

            //block and hide elements again 
            blockInputs();
            hideButton();
            setValueForInputs();
            editButton.classList.remove("hidden");
            
            //set request body it`s value
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
                //if wrong data for body
                alert(getTranslation("editError"));
            }
            
            //fetch changes to db
            const userResponce = await fetch('/api/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(putBody)
            });

            //get responce
            const userData = await userResponce.json();
            
            //log out after changes
            const responce = await fetch('/auth/logout');
            window.location.href = `/login?lang=${urlParams.get('lang')}`; 

        });

    });

}

//start functions
editButtonAddEvent();
saveChangesAddEventListener();
getStartProfileInfo();
makeChosen();
setValueForInputs();
