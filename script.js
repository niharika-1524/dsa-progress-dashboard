const easyBtn=document.querySelector(".easy-btn");
const mediumBtn=document.querySelector(".medium-btn");
const hardBtn=document.querySelector(".hard-btn");
const easyCount=document.querySelector(".easy-count");
const mediumCount=document.querySelector(".medium-count");
const hardCount=document.querySelector(".hard-count");
const totalCount=document.querySelector(".total-count");
const progressFill=document.querySelector(".progress-fill");
const progressText=document.querySelector(".progress-text");
const overlay=document.querySelector(".achievement-overlay");
const achievementIcon=document.querySelector(".achievement-icon");
const achievementTitle=document.querySelector(".achievement-card h2");
const achievementText=document.querySelector(".achievement-card p");
const badgeText=document.querySelector(".badges");
const bronzeBadge=document.querySelector(".bronze");
const silverBadge=document.querySelector(".silver");
const goldBadge=document.querySelector(".gold");
const resetBtn=document.querySelector(".reset-btn");
let easy = Number(localStorage.getItem("easy")) || 120;
let medium = Number(localStorage.getItem("medium")) || 60;
let hard = Number(localStorage.getItem("hard")) || 10;
let bronzePopupShown = false;
let silverPopupShown = false;
let goldPopupShown = false;
let popTimer;
const GOAL=300;
function showAchievement(icon,title,text){

    achievementIcon.textContent=icon;

    achievementTitle.textContent=title;

    achievementText.textContent=text;
    confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 }
    });

    overlay.classList.remove("hidden");

    setTimeout(()=>{

        overlay.classList.add("hidden");

    },2500);

}
function updateUI(){
    easyCount.textContent=easy;
    mediumCount.textContent=medium;
    hardCount.textContent=hard;
    const total=easy+medium+hard;
    totalCount.textContent=total;
    const progress = Math.min(Math.round((total / GOAL) * 100), 100);
    progressFill.style.width = progress + "%";
    progressText.textContent = progress + "%";
    if(total>=50  ){
        bronzeBadge.textContent="🥉 Bronze ✅"
        bronzeBadge.classList.add("unlocked"); 
        if(!bronzePopupShown){
            showAchievement(

                 "🥉",

                "Achievement Unlocked!",

                "Bronze Badge Earned"

            );
            bronzePopupShown=true;
        }
        
    }
    else{
         bronzeBadge.textContent="🥉 Bronze 🔒";
        bronzeBadge.classList.remove("unlocked"); 
        bronzePopupShown = false;
    }
    if(total>=150 ){
         silverBadge.textContent="🥈 Silver ✅";
         silverBadge.classList.add("unlocked");
         if(!silverPopupShown){
            showAchievement(

              "🥈",

              "Achievement Unlocked!",

              "Silver Badge Earned"

            );
            silverPopupShown=true;
         }
          
    }
    else{
        silverBadge.textContent="🥈 Silver 🔒";
         silverBadge.classList.remove("unlocked");
         silverPopupShown=false;
    }
    if(total>=300 ){
        goldBadge.textContent="🥇 Gold ✅";
        goldBadge.classList.add("unlocked");
        if(!goldPopupShown){
            showAchievement(

                "🥇",

                "Achievement Unlocked!",

                "Gold Badge Earned"

            );
            goldPopupShown=true;
        }   
    }
    else{
        goldBadge.textContent="🥇 Gold 🔒";
        goldBadge.classList.remove("unlocked");
        goldPopupShown=false;
    }
    if(total>=GOAL){
        progressText.textContent="Completed! 🎉";
    }
    localStorage.setItem("easy", easy);
    localStorage.setItem("medium", medium);
    localStorage.setItem("hard", hard);
}
easyBtn.addEventListener("click",function(){
    easy++;
    updateUI();
});
mediumBtn.addEventListener("click",function(){
    medium++;
    updateUI();
});
hardBtn.addEventListener("click",function(){
    hard++;
    updateUI();
});
resetBtn.addEventListener("click",function(){
    easy=0;
    medium=0;
    hard=0;
    updateUI();
})
updateUI();