async function getProfileData(){
    const responce = await fetch('/api/user');
    const resData = await responce.json();

    return resData;
}

const getImageOrFallback = (path, fallback) => {
    return new Promise(resolve => {
      const img = new Image();
      img.src = path;
      img.onload = () => resolve(path);
      img.onerror = () => resolve(fallback);
    });
};

async function addProfileOnLoad(){
    const resData = await getProfileData();
    const profileImage = document.getElementsByClassName('profile-img')[0];
    const link = getImageOrFallback(
        `/img/profile/${resData._id}.png`,
        '/img/profile/avatar.png'
        ).then(result =>  profileImage.src = result || result);
    const aHref = document.getElementById('profile-href');
    aHref.href = `/profile?lang=${urlParams.get('lang')}`; 

}

addProfileOnLoad();