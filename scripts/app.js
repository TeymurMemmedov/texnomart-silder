sliderData=[
    {
        "id":1,
        "img":"img/slider/1.jpg"
    },
    {
        "id":2,
        "img":"img/slider/2.jpg"
    },
    {
        "id":3,
        "img":"img/slider/3.jpg"
    },
    {
        "id":4,
        "img":"img/slider/4.jpg"
    },
    {
        "id":5,
        "img":"img/slider/5.jpg"
    }
]

//Slides-containerin dinamiklesdirilmesi
let slidesContainer = document.querySelector(".slides-container")
let sliderDots  = document.querySelector(".slider-dots")
let root  = document.documentElement
// slides-container-in widthi slideWidth*slideCount-dur, slideWidth-i css variable-dan götürür, slide sayını da burdan mən ötürürəm.
root.style.setProperty("--slide-count",`${sliderData.length}`);

// Slide-lari doldururuq
function generateSlide(){
    slidesContainer.innerHTML=``;
    for(slide of sliderData){  
        slideHtml = `<div class="slide"><img src="${slide.img}" alt=""></div>`
        slidesContainer.innerHTML+=slideHtml
    }
}
generateSlide()

//Slider-dotslari doldurdum
function generateSliderDots(){
    for (let i = 0; i < sliderData.length; i++) {
        
        sliderDots.innerHTML+=`<span id="${i}" onclick="slideWithDot(event,${i});isSliderOnLeftLimit();isSliderOnRightLimit()"></span>`
    }
    sliderDots.children.item(0).classList.add("active-ball")
}
generateSliderDots()

// Surusdurmenin dinamiklesdirilmesi
// slideAmount slider-in widthdir
let slideAmount = document.querySelector("#slider").clientWidth;
let slidePosition=0
slideStep=1

// Limitleri teyin etmek
const leftLink = document.querySelector(".slider-controls a:nth-child(1)");
const rightLink = document.querySelector(".slider-controls a:nth-child(2)");
// slider sol limitdedirse, unclickable ve boz reng edir, deyilse normal hala qaytarir
function isSliderOnLeftLimit(){
    if(slidePosition==0){
        document.querySelector(".slider-controls a:nth-child(1)").style.pointerEvents = "none";
        document.querySelector(".slider-controls a:nth-child(1) i").style.color = "#abb8c3";
    }
    else{
        document.querySelector(".slider-controls a:nth-child(1)").style.pointerEvents = "auto";
        document.querySelector(".slider-controls a:nth-child(1) i").style.color = "#373a36";
    }
}
// eynile slider sag limitdedirse, unclickable ve boz reng edir, deyilse normal hala qaytarir
function isSliderOnRightLimit(){
    if(slidePosition==-((sliderData.length-(slideStep))*slideAmount)){
        document.querySelector(".slider-controls a:nth-child(2)").style.pointerEvents = "none";
        document.querySelector(".slider-controls a:nth-child(2) i").style.color = "#abb8c3";
    }
    else{
        document.querySelector(".slider-controls a:nth-child(2)").style.pointerEvents = "auto";
        document.querySelector(".slider-controls a:nth-child(2) i").style.color = "#373a36";
    }
}

// slide-i sola surusdurur, ve halhazirda oldugu dot-dan active-ball(yeni ferqlendirici rengi)-i remove edir
// ve hemin active ball classini bir evvelki noqteye teyin edir.
function slideLeft(e){
    // burada gedilmek istenen slide-in koordinati tapilir
    // x = x0 + s mentiqine esasen
    e.preventDefault();
    slidePosition=slidePosition+(slideAmount*slideStep);
    slidesContainer.style.transform=`translateX(${slidePosition}px)`

    sliderDots.children.item(activeDotPosition).classList.remove("active-ball")
    activeDotPosition--;
    sliderDots.children.item(activeDotPosition).classList.add("active-ball")
}

// slide-i saga surusdurur, ve halhazirda oldugu dot-dan active-ball(yeni ferqlendirici rengi)-i remove edir
// ve hemin active ball classini bir novbeti noqteye teyin edir.
function slideRight(e){
    // burada gedilmek istenen slide-in koordinati tapilir
    // x = x0 + s mentiqine esasen
    e.preventDefault();
    slidePosition=slidePosition-(slideAmount*slideStep)
    slidesContainer.style.transform=`translateX(${slidePosition}px)`

    sliderDots.children.item(activeDotPosition).classList.remove("active-ball")
    activeDotPosition++;
    sliderDots.children.item(activeDotPosition).classList.add("active-ball")
}


// slider-controllara tiklandiqda muvafiq olaraq slideLeft yaxud slideRight funksiyasi cagirilir,
// daha sonra sag ve sol limitde olub-olunmadigi yoxlanir, buna uygun oxlarin click statusu tenzimlenir


// Indi ise slider-dotslar
// activeDotPosition hal hazirda necenci slideda oldugumuzu gosterir(0-dan sayir)
activeDotPosition=0

// newDotPosition parametri ise, tiklanan, gedilmek istenen slide-in nomresini bildirir, ve sliderDotsdaki
// span-lere tiklandiqda arqument kimi oturulur, bu funskiya cagirilir
function slideWithDot(e,newDotPosition){
    // burada gedilmek istenen slide-in koordinati tapilir
    // x = x0 + s mentiqine esasen
    e.preventDefault();
    slidePosition=slidePosition+(slideAmount*(activeDotPosition-newDotPosition));
    slidesContainer.style.transform=`translateX(${slidePosition}px)`

    //burada ise active-ball classi getdiyimiz slide-a oturulur, artiq o ferqlenir
    sliderDots.children.item(activeDotPosition).classList.remove("active-ball")
    sliderDots.children.item(newDotPosition).classList.add("active-ball")
    // ve son olaraq hedefe catdigimiz ucun active dotsa yeni qiymetini teyin edirik
    activeDotPosition=newDotPosition
    
}
