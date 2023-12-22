// Java script code
let form = document.getElementById("form")
form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateFunction();

    const emailValue = document.querySelector('[name = "E-mail"]').value; 
    const passwordValue = document.querySelector('[name = "Password"]').value 

    // Store  localStorage
    localStorage.setItem("email", emailValue);
    localStorage.setItem("password", passwordValue);

    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    alert(`Email: ${storedEmail} \nPassword: ${storedPassword}`);

});
var inputs = document.querySelectorAll(".inputField");

var correctPassword;
function validateFunction() {

    inputs.forEach(input => {
        const inputValue = input.value;
        console.log(inputValue, "value1");
        const inputName = input.getAttribute("name")

        const smallElement = input.parentElement.querySelector("small")

        const showError = (errorMessage) => {
            isInValid(input);
            smallElement.innerText = errorMessage
        }
        const showVaild = () => {
            isValid(input)
            smallElement.innerText = "";
        }

        if (inputValue === "") {
            showError(`${inputName} cannot blank`)
        }
        else {
            switch (inputName) {
                case "E-mail":
                    const emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                    if (!emailRegx.test(inputValue)) {
                        showError(`you have invaild email address`)
                    } else {
                        showVaild()
                    }
                    break;
                case "Password":
                    // const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$/
                    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])(?=.{6,12}$)");
                    if (!regex.test(inputValue)) {
                        showError(`${inputName}must be 1 uppercase,1 lowecase, 1number and special characters and limit 6 to 8 letter`)
                    } else {
                        showVaild();
                        correctPassword = inputValue
                    }
                    break;
                case "confirm Password ":
                    if (correctPassword !== inputValue) {
                        showError(`${inputName} not equal to password`)
                    } else {
                        showVaild()
                    }
                    break;
                default:
                    showVaild()

            }
        }
    })
}
document.getElementById("reset").addEventListener('click', (e) => {
    var smallTags = document.querySelectorAll(".small");
    smallTags.forEach(smallTag => {
        smallTag.classList.remove("is-invalid");
        smallTag.classList.remove("is-valid");
        smallTag.innerText = "";
        localStorage.clear();
    })
});
// is-invalid function
function isInValid(input) {
    input.classList.add("is-invalid");
}
// is-valid function
function isValid(input) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
}

