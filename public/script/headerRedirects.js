function addHrefToHeader(){
    const toProfile = document.getElementById('profile-href');
    toProfile.addEventListener('click', ()=>{
        window.location.href = `/profile?lang=${urlParams.get('lang')}`; 
    });
    const toMain = document.getElementById('to-main-link');
    toMain.href = `/?lang=${urlParams.get('lang')}`; 
 
    const toMainHref = document.getElementById('to-main-href');
    toMainHref.addEventListener('click', ()=>{
        window.location.href = `/main?lang=${urlParams.get('lang')}`; 
    });

}
addHrefToHeader();