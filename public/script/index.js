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
        nfcTitle: 'Що таке NFC технологія?',
        nfcParagraph: 'Майже всі сучасні смартфони та розумні годинники оснащені технологією NFC. Усвідомлюєте ви це чи ні, але сканер NFC вашого телефону, швидше за все, активний прямо зараз. Однак не хвилюйтеся, оскільки чіп NFC у вашому телефоні є пасивним сканером, який нічого не робить, доки ви не піднесете його в межах кількох дюймів від іншого пристрою або мітки NFC. Як і багато функцій вашого смартфона, він спокійно сидить у фоновому режимі, поки не знадобиться, але його також можна використовувати для розблокування широкого спектру цікавих функцій, які можуть полегшити ваше життя.',
        lockTitle: 'NFC замки',
        lockParagraph: 'NFC також можна використовувати для зберігання цифрових ключів, які можуть розблокувати все, від вхідних дверей до готельного номера. Для вашого будинку вам знадобиться сумісний розумний замок; однак багато зчитувачів, які використовуються в офісних кампусах і готелях, вже використовують NFC. Це означає, що незабаром ви можете замінити картку безпеки на роботі на смартфон або розумний годинник, а якщо ви зупинитеся в одній із підтримуваних мереж готелів, ви зможете отримати ключ від номера прямо на свій пристрій, не підходячи нікуди до стійки реєстрації.',
        getStarted: 'Розпочати',
        registration: 'Авторизуватись',
        login: 'Реєстрація',
        contactUs: "Зв'язатись з нами",
        ourServices: 'Наші послуги',
        privacyPolicy: 'Політика конфеденційості',
        termsConditions: 'Умови користування'
    },
    en: {
        nfcTitle: 'What NFC technology is?',
        nfcParagraph: ' Nearly all of today’s smartphones and smartwatches are equipped with NFC technology. Whether you realize it or not, your phone’s NFC scanner is likely active right now. Don’t worry, though, as the NFC chip in your phone is a passive scanner that does nothing until you hold it within a couple of inches of another NFC device or tag. Like many features of your smartphone, it quietly sits in the background until it’s needed, but it can also be used to unlock a wide range of cool features that can make your life easier. ',
        lockTitle: 'NFC locks',
        lockParagraph: 'NFC can also be used to store digital keys that can unlock everything from your front door to your hotel room. For your home, you’ll need a compatible smart lock; however, many of the readers used in office campuses and hotels already use NFC. This means that you may soon be replacing your security card at work with your smartphone or smartwatch, and if you’re staying at one of the supported hotel chains, you’ll be able to have your room key delivered straight to your device without needing to go anywhere near the front desk.',
        getStarted: 'Get Started',
        registration: 'Login',
        login: 'Register',
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
    document.getElementById('nfc-title').innerHTML = getTranslation('nfcTitle');
    document.getElementById('nfc-paragraph').innerHTML = getTranslation('nfcParagraph');
    document.getElementById('lock-title').innerHTML = getTranslation('lockTitle');
    document.getElementById('lock-paragraph').innerHTML = getTranslation('lockParagraph');
    document.getElementById('get-started').innerHTML = getTranslation('getStarted');
    document.getElementById('to-login-button').innerHTML = getTranslation('login');
    document.getElementById('to-registration-button').innerHTML = getTranslation('registration');
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
    const regButton = document.getElementById('to-login-button');
    
    regButton.addEventListener('click', ()=>{
        window.location.href = `/registration?lang=${urlParams.get('lang')}`; 
    });

    const loginButton = document.getElementById('to-registration-button');
    
    loginButton.addEventListener('click', ()=>{
        window.location.href = `/login?lang=${urlParams.get('lang')}`; 
    });
}

makeChosen();
addHrefToButtons();