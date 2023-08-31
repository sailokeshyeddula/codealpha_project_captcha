document.addEventListener("DOMContentLoaded", function () {
    const pages = document.querySelectorAll(".page");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const submitButton = document.getElementById("submitButton");
    const currentPageInput = document.getElementById("currentPage");

    let currentPageIndex = 0;

    function showPage(index) {
        pages.forEach((page) => {
            page.style.display = "none";
        });
        pages[index].style.display = "block";
        currentPageIndex = index;
        currentPageInput.value = index + 1;

        if (currentPageIndex === 0) {
            prevButton.style.display = "none";
        } else {
            prevButton.style.display = "block";
        }

        if (currentPageIndex === pages.length - 1) {
            // On the last page, generate and display a new CAPTCHA
            generateCaptcha();
            nextButton.style.display = "none";
            submitButton.style.display = "block";
        } else {
            nextButton.style.display = "block";
            submitButton.style.display = "none";
        }
    }

    function generateCaptcha() {
        var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var captcha = '';
        for (var i = 0; i < 6; i++) {
            captcha += alpha[Math.floor(Math.random() * alpha.length)];
        }
        document.getElementById('capt').value = captcha;
    }
    
    function validateCaptcha() {
        var generatedCaptcha = document.getElementById('capt').value;
        var enteredCaptcha = document.getElementById('captchaInput').value;
    
        if (enteredCaptcha.toLowerCase() === generatedCaptcha.toLowerCase()) {
            return true;
        } else {
            alert('Please enter the correct CAPTCHA code.');
            return false;
        }
    }
    

    prevButton.addEventListener("click", function () {
        if (currentPageIndex > 0) {
            showPage(currentPageIndex - 1);
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentPageIndex < pages.length - 1) {
            // If on the last page, validate the CAPTCHA
            if (currentPageIndex === pages.length - 2) {
                if (!validateCaptcha()) {
                    return; // Do not proceed if CAPTCHA is not valid
                }
            }
            showPage(currentPageIndex + 1);
        }
    });

    submitButton.addEventListener("click", function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
    
        // If on the last page, validate the CAPTCHA
        if (currentPageIndex === pages.length - 1) {
            if (!validateCaptcha()) {
                // Show message to enter valid CAPTCHA
                alert("Please enter the correct CAPTCHA code.");
                return; // Do not proceed if CAPTCHA is not valid
            }
        }
    
        // Proceed with form submission
        document.getElementById("surveyForm").submit();
    });
    

    // Initial setup
    showPage(0);
});
