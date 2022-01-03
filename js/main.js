
const inputMoney = document.querySelector('#input-money');
const inputPerson = document.querySelector('#input-person');

const inputHolder = document.querySelector('.person');

const tipBtn = document.querySelectorAll('.container__tip-btn');
const tipCustom = document.querySelector('#tip-custom');


const outputAmount = document.querySelector('#output-amount');
const outputTotal = document.querySelector('#output-total');

const resetBtn = document.querySelector('#reset-btn');

function tipCalculate(x, y) {
    return x * y;
}

function calculateTip() {
    let person = parseFloat(inputPerson.value);
    if (!person) {
        console.log("Entered");
        if (!inputHolder.classList.contains("error")) {
            inputHolder.classList.add("error");
        }
    } else {
        if (inputHolder.classList.contains("error")) {
            inputHolder.classList.remove("error");
        }
        let tipPercentage = 0;
        let flag = 0;
        tipBtn.forEach(btn => {
            if (btn.classList.contains("active")) {
                tipPercentage = parseFloat(btn.innerText.toString().slice(0, -1)) / 100;
                flag = 1;
            }
        });
        if (flag === 0) {
            tipPercentage = parseFloat(tipCustom.value) / 100;
            if (!tipPercentage) {
                return;
            }
        }
        let bill = parseFloat(inputMoney.value);
        render(bill, tipPercentage, person);

    }
}

function render(bill, tipPercentage, person) {
    console.log(tipPercentage+"  "+bill)
    let tip = tipCalculate(bill, tipPercentage);
    tip = Number(Math.round(parseFloat(tip + 'e2')) + 'e-2');

    let total = tipCalculate(tip, person);
    total = Number(Math.round(parseFloat(total + 'e2')) + 'e-2');
    console.log(tip + "  " + total);

    if (!tip) {
        outputAmount.innerText = `$0.00`;
        outputTotal.innerText = `$0.00`;
    } else {
                
        tip = tip.toString();
        total = total.toString();

        if (tip.includes('.')) {
            outputAmount.innerText = `$${tip}`;
        } else {
            outputAmount.innerText = `$${tip}.00`;
        }

        if (total.includes('.')) {
            outputTotal.innerText = `$${total}`;
        } else {
            outputTotal.innerText = `$${total}.00`;
        }
    }


    if (resetBtn.classList.contains("empty")) {
        resetBtn.classList.remove("empty");
    }
}
tipBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        tipBtn.forEach(btn => {
            if (btn.classList.contains("active")) {
                btn.classList.remove("active");
            }
        });
        tipCustom.value = "";
        btn.classList.add("active");


        let tipPercentage = parseFloat(btn.innerText.toString().slice(0, -1)) / 100;
        let bill = parseFloat(inputMoney.value);
        let person = parseFloat(inputPerson.value);
        console.log(person)
        if (!person) {
            console.log("Entered");
            if (!inputHolder.classList.contains("error")) {
                inputHolder.classList.add("error");
            }
        } else {

            render(bill, tipPercentage, person);

            
        }
    });
})

inputMoney.addEventListener('change', () => {
    calculateTip();
});

inputPerson.addEventListener('change', () => {
    calculateTip();
});

tipCustom.addEventListener('change', () => {
    tipBtn.forEach(btn => {
        if (btn.classList.contains("active")) {
            btn.classList.remove("active");
        }
    });
    calculateTip();
    console.log(tipCustom.value);
});


resetBtn.addEventListener('click', () => {
    if (!resetBtn.classList.contains("empty")){
        outputAmount.innerText = `$0.00`;
        outputTotal.innerText = `$0.00`;
        tipBtn.forEach(btn => {
            if (btn.classList.contains("active")) {
                btn.classList.remove("active");
            }
        });
        inputMoney.value = "";
        inputPerson.value = "";
        tipCustom.value = "";
        resetBtn.classList.add("empty");
    }
});