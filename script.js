var opened = false
var first_open = true
var cooldown = false
var previous_page = 1
var current_page = 1
var pages = 8

const images = [];
for (let i = 1; i <= 10; i++) {
    images.push(`pages/${i}.png`);
}

var mishaidle = document.getElementById("mishaidleCutscene");
cooldown = true
setTimeout(() => {
    mishaidle.style.opacity = '1'
}, 500);
setTimeout(() => {
    cooldown = false
}, 700);

function openCutscene(){

    var opencut = document.getElementById("firstOpenCutscene");
    var x = document.getElementById("openCutscene");
    var x2 = document.getElementById("closeCutscene");

    var leftb = document.getElementById("leftbutton");
    var rightb = document.getElementById("rightbutton");
    if (cooldown == true) {
        return
    }
    if (first_open) {
        cooldown = true
        setTimeout(() => {
            cooldown = false
        }, 4350);
    } else {
        cooldown = true
        setTimeout(() => {
            cooldown = false
        }, 1200);
    }
    
    var book_openclose = new Audio("sfx/open_close-book.ogg");
    book_openclose.play();
    book_openclose.currentTime=0;

    if (opened) {
        if (current_page == 1) {
            x2.play()
            x2.style.display = "block"
            x.style.display = "none"
            setTimeout(() => {
                opened = false
            }, 1000);
            leftb.style.display = 'none'
            rightb.style.display = 'none'
            
            page_image.style.opacity = '0'
            setTimeout(() => {
                page_image.style.display = 'none'
            }, 300);
        }
    } else {
        if (first_open) {
            first_open = false
            x.play()
            opencut.play()
            opencut.style.display = "block"
            x2.style.display = "none"

            var firstopen = new Audio("sfx/misha open book.mp3");
            firstopen.loop = false;
            firstopen.play();
            firstopen.currentTime=0;

            setTimeout(() => {
                
                x.style.display = "block"
                opencut.style.display = "none"
                opened = true

                page_image.style.display = 'block'
                page_image.style.opacity = '0'
                setTimeout(() => {
                    page_image.src = images[current_page-1]
                    page_image.style.opacity = '1'
                    page_image.load()
                
                    leftb.style.display = 'block'
                    rightb.style.display = 'block'
                    console.log(images[current_page-1])
                }, 100);
    
                leftb.style.display = 'block'
                rightb.style.display = 'block'
            }, 4350);
            
            return
        }
        x.play()
        x2.style.display = "none"
        x.style.display = "block"
        setTimeout(() => {
            opened = true
        }, 1000);
        
        page_image.style.display = 'block'
        page_image.style.opacity = '0'
        setTimeout(() => {
            page_image.src = images[current_page-1]
            page_image.style.opacity = '1'
            page_image.load()

            leftb.style.display = 'block'
            rightb.style.display = 'block'
            console.log(images[current_page-1])
        }, 900);
    }
}
function flipPage(rightSw){

    var page = document.getElementById("flipstartpageCutscene");
    var page_middle = document.getElementById("flipmiddlepageCutscene");
    var page_end = document.getElementById("flipendpageCutscene");

    var back_page = document.getElementById("back_flipstartpageCutscene");
    var back_page_middle = document.getElementById("back_flipmiddlepageCutscene");
    var back_page_end = document.getElementById("back_flipendpageCutscene");

    if (cooldown == true) {
        return
    }
    cooldown = true
    setTimeout(() => {
        cooldown = false
    }, 1000);

    if (opened) {
        previous_page = current_page
        if (rightSw == true) {
            if (current_page >= pages) { return }

            var page_flip = new Audio("sfx/Page_turn1.ogg");
            page_flip.loop = false;
            page_flip.play();
            page_flip.currentTime=0;

            if (current_page <= 1) {
                page.play()
                page.style.display = "block"
                page_middle.style.display = "none"
            } else if (current_page == pages-1) {
                page_end.play()
                page_middle.style.display = "none"
                page_end.style.display = "block"
            } else {
                page_middle.play()
                page.style.display = "none"
                page_middle.style.display = "block"
                page_end.style.display = "none"
            }
            
            current_page += 1
        } else {
            if (current_page <= 1) { return }

            var page_flip2 = new Audio("sfx/Page_turn2.ogg");
            page_flip2.play();
            page_flip2.currentTime=0;

            if (current_page <= 2) {
                back_page.style.display = "block"
                back_page.play()
                page.style.display = "none"
                page_middle.style.display = "none"
                setTimeout(() => {
                    back_page.style.display = "none"
                    page_end.style.display = "none"
                }, 1000);
            } else if (current_page == pages) {
                back_page_end.style.display = "block"
                back_page_end.play()
                setTimeout(() => {
                    back_page_end.style.display = "none"
                    page_end.style.display = "none"
                    page_middle.style.display = "block"
                }, 1000);
            } else {
                back_page_middle.style.display = "block"
                back_page_middle.play()
                page.style.display = "none"
                page_end.style.display = "none"
                page_middle.style.display = "block"
                setTimeout(() => {
                    back_page_middle.style.display = "none"
                }, 1000);
            }
            current_page -= 1
        }
        changePage()
    }
}
function fadeOutSound(audiosnippetId, pageid) {
    var sound = document.getElementById(audiosnippetId);
    var fadePoint = sound.duration;
    var fadeAudio = setInterval(function () {

        sound.volume -= 0.1;

        if (sound.volume <= 0.1) {
            clearInterval(fadeAudio);
        }
    }, 50);
    setTimeout(() => {
        fadeInSound('ambience_sfx', pageid)
    }, 500);
}
function fadeInSound(audiosnippetId, soundsrc) {
    var sound = document.getElementById(audiosnippetId);

    sound.pause()
    sound.currentTime = 0
    sound.src = soundsrc
    sound.volume = 0
    sound.play()

    var fadePoint = 0; 
    var fadeAudio = setInterval(function () {

        sound.volume += 0.01;

        if (sound.volume >= 0.9) {
            clearInterval(fadeAudio);
        }
    }, 75);

}
function changePage(){
    var page_image = document.getElementById("page_image");

    page_image.style.display = 'none'
    page_image.style.opacity = '0'
    page_image.style.display = 'block'
    setTimeout(() => {
        page_image.poster = images[current_page-1]
        page_image.style.display = 'block'
        page_image.style.opacity = '1'
        page_image.load()
        
    }, 425);

    var pd = data.pagedata

    if (pd[current_page].sfx === pd[previous_page].sfx) {
        return
    }
    fadeOutSound('ambience_sfx', pd[current_page].sfx)
}