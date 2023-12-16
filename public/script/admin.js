
//get search parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const availableLanguages = {
    Ukrainian: 'uk',
    English: 'en'
}

//variable for current language
let currentLanguage = 'uk';

//variables for locks and users data
let locksData;
let lockCount;
let userCount;
let currentPage = 0;

//variables for is this page is users or locks
let isUser = false;

//variable for user id
let userId;

//get info from search parameters
if (Object.values(availableLanguages).includes(urlParams.get('lang'))){
    currentLanguage = urlParams.get('lang');
}
if (urlParams.get('id')){
    userId = urlParams.get('id');
    isUser = true;
}

//object for list of translations
const translations = {
    uk: {
        title: 'SafeSwipe - Головна',
        yourLocks: 'Всі замки',
        contactUs: "Зв'язатись з нами",
        ourServices: 'Наші послуги',
        privacyPolicy: 'Політика конфеденційості',
        termsConditions: 'Умови користування',
        noLockCase: 'Ще немає замка',
        noUserCase: 'Ще немає користувача',
        allUsercase: 'Всі користувачі',
        del: 'Видалити'
    },
    en: {
        title: 'SafeSwipe - Main',
        yourLocks: 'All Locks',
        contactUs: 'Contact us',
        ourServices: 'Our Services',
        privacyPolicy: 'Privacy Policy',
        termsConditions: 'Terms & Conditions',
        noLockCase: 'User haven`t this lock yet',
        noUserCase: 'No user yet',
        allUsercase: 'All Users',
        del: 'Remove'
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


//updagte translation
function updateText(){
    document.title = getTranslation('title');
    document.getElementById('your-locks').innerHTML = getTranslation('yourLocks');
    document.getElementById('contact-us').innerHTML = getTranslation('contactUs');
    document.getElementById('our-service').innerHTML = getTranslation('ourServices');
    document.getElementById('private-policy').innerHTML = getTranslation('privacyPolicy');
    document.getElementById('terms-conditions').innerHTML = getTranslation('termsConditions');
    
    const buttons = document.getElementsByClassName('del-button');
    for (let i = 0; i < 8; i++){
        buttons[i].innerHTML = getTranslation('del');
    }
    
}


//add borders to current language flag and updagte text
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


//get locks data from back-end
async function getLocks(){
    console.log(`start of gl `);
    const responce = await fetch(`/lock-mob-by-uid/${userId}`);
    const lockData = await responce.json();
    console.log(`gl\n ${lockData}`);
    return lockData;
}


//get users data from back-end
async function getUsers(){
    const responce = await fetch('/users');
    const usersData = await responce.json();

    return usersData;
}


//set default values for locks on page
function cleanLocks(){

    //get locks
    const locks = document.getElementsByClassName('lock-container');
    
    //set null values
    for (let i = 0; i < 8; i++){
        locks[i].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src = 'img/lock/sample.png';
        locks[i].getElementsByTagName("a")[0].href = '';
        locks[i].getElementsByTagName("div")[0].innerHTML = getTranslation('noLockCase');
    }  

}


//set default values
function cleanUsers(){
    //get all users
    const locks = document.getElementsByClassName('lock-container');
    
    //set null values
    for (let i = 0; i < 8; i++){
        locks[i].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src = 'img/profile/avatar.png';
        locks[i].getElementsByTagName("a")[0].href = '';
        locks[i].getElementsByTagName("div")[0].innerHTML = getTranslation('noUserCase');
    }  
}

//update locks info
function updateLocks(){

    //get locks
    const locks = document.getElementsByClassName('lock-container');
    
    //get delete buttons
    const buttons = document.getElementsByClassName('del-button');

    let countOfLocksOnPage = 8;

    //get count of locks on current page
    if ( (currentPage+1) * 8 > lockCount){
        countOfLocksOnPage = lockCount % 8;
    }

    //update info for locks and delete buttons event
    for (let i = 0; i < countOfLocksOnPage; i++){
        //update lock info
        locks[i].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src = `../img/lock/${locksData[0].uId}/${locksData[i+currentPage*8]._id}.png`;
        locks[i].getElementsByTagName("div")[0].innerHTML = `${locksData[i+currentPage*8].name}`;
        
        //add remove button event
        buttons[i].addEventListener('click', async ()=>{
            
            //fetch to back-end to delete lock
            const lockDelete = await fetch(`/api/lock/${locksData[i+currentPage*8]._id}`, {
                method: 'POST'
            });

            //responce
            const lockDeleted = await lockDelete.json();

            //redirect
            window.location.href = `/admin-panel?lang=${urlParams.get('lang')}&id=${userId}`; 
            
        });
    }  
    
}


//update user info and add remove button event
function updateUsers(){
    //get users and buttons
    const locks = document.getElementsByClassName('lock-container');
    const buttons = document.getElementsByClassName('del-button');
    let countOfLocksOnPage = 8;
    
    //get count of locks on page
    if ( (currentPage+1) * 8 > userCount){
        countOfLocksOnPage = userCount % 8;
    }

    for (let i = 0; i < countOfLocksOnPage; i++){
        //update user info
        locks[i].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src = `../img/profile/${usersData[i+currentPage*8]._id}.png`;
        locks[i].getElementsByTagName("a")[0].href = `/admin-panel?lang=${urlParams.get('lang')}&id=${usersData[i+currentPage*8]._id}`;
        locks[i].getElementsByTagName("div")[0].innerHTML = `${usersData[i+currentPage*8].username}`;

        //add delete buttons event 
        buttons[i].addEventListener('click', async ()=>{

            //fetch to db to delete user
            const userDelete = await fetch(`/api/user/${usersData[i+currentPage*8]._id}`, {
                method: 'POST'
            });

            //responce
            const userDeleted = await userDelete.json();

            //redirect
            window.location.href = `/admin-panel?lang=${urlParams.get('lang')}`; 

        });

    }  
    
}


//add swap page events
function addSwapPagesEvents(){

    //get buttons 
    const PrevPageButton = document.getElementById('button-previous');
    const nextPageButton = document.getElementById('button-next');

    //add previous page event
    PrevPageButton.addEventListener('click', () => {

        //swap page to prev if not last
        if (currentPage*8 - 8 >= 0) {
            currentPage -= 1;
        }
        else
        {

            //check users or locks state
            if (isUser){

                currentPage = (lockCount - lockCount % 8)/8;
            }
            else
            {
                currentPage = (userCount - userCount % 8)/8;
            }
            
        }

        if (isUser){

            //update locks info
            cleanLocks();
            updateLocks();
        }else
        {
            //update users info
            cleanUsers();
            updateUsers();
        }

    });

    //add next page event
    nextPageButton.addEventListener('click', ()=>{

        //check if users or locks case
        if (isUser){
            //swap to next page if not last
            if (currentPage*8 + 8 < lockCount) {
                currentPage += 1;
            }
            //swap to first if last
            else {
                currentPage = 0;
            }
        }
        else
        {
            //swap to next page if not last
            if (currentPage*8 + 8 < userCount) {
                currentPage += 1;
            }
            //swap to first if lasts
            else {
                currentPage = 0;
            }
        }
        

        if (isUser){
            //update locks info
            cleanLocks();
            updateLocks();
        }else
        {
            //update users info
            cleanUsers();
            updateUsers();
        }
    });
}

//add redirects on flags
function updateHrefs(){
    //get flags a
    const ukHref = document.getElementById('uk-redirect');
    const enHref = document.getElementById('en-redirect');
    
    //add redirect
    if (isUser){
        ukHref.href = `?lang=uk&id=${userId}`;
        enHref.href = `?lang=en&id=${userId}`;
    }

}

//start functions
async function setup(){

    //get start data for locks case
    if (isUser){
        locksData = await getLocks();
        console.log(locksData);
        lockCount = locksData.length;
        cleanLocks();
        updateLocks();
    }
    //get start data for users case
    else{

        usersData = await getUsers();
        console.log(usersData);
        console.log(usersData.length);
        userCount = usersData.length;
        cleanUsers();
        updateUsers();
    }

    //other functions
    makeChosen();
    addSwapPagesEvents();
}


//start function
setup();
