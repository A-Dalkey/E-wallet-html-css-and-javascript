

document.querySelector("#ewallet-form").addEventListener('submit',
    function (e) {
        e.preventDefault();

        const type = document.querySelector(".add_type").value;
        const desc = document.querySelector(".add_description").value;
        const money = document.querySelector(".add_value").value;

        if (desc.length > 0 && money.length > 0) {

            addItem(type, desc, money);
            cleardata();
        }

    });
// show data in collections

showData()

function showData() {
    let items = getItemsfromLs();

    const collections = document.querySelector('.collections');

    for (let item of items) {
        const newHtml = `
            <div class="item">
                <h3>${item.desc}
    
                    <div class="date">
                        <p>
                         ${item.time}
                        </p>
                    </div>
    
                </h3>
                <div class="money ${item.type === '+' ? 'income' : 'expense'}">
                    <h4>${item.type}$${item.money}</h4>
                </div>
            </div>
          
          `;


        collections.insertAdjacentHTML('afterbegin', newHtml);
    }

}

/// formated time
function getFormatedtime() {
    const now = new Date().toLocaleTimeString('en-us', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const date = now.split(',')[0].split(' ');
    const time = now.split(',')[1];

    return `${date[1]} ${date[0]}, ${time}`
}


// add item value and description
function addItem(type, desc, money) {

    const time = getFormatedtime();
    const newHtml = `
        <div class="item">
            <h3>${desc}

                <div class="date">
                    <p>
                     ${time}
                    </p>
                </div>

            </h3>
            <div class="money ${type === '+' ? 'income' : 'expense'}">
                <h4>${type}$${money}</h4>
            </div>
        </div>
      
      `;

    const collections = document.querySelector('.collections');

    collections.insertAdjacentHTML('afterbegin', newHtml);

    addItemtoLs(type, desc, money, time);

    totalIncome();
    totalExpens();
    showTotalBalance();
}



function cleardata() {
    document.querySelector(".add_type").value = "+";
    document.querySelector(".add_description").value = "";
    document.querySelector(".add_value").value = "";
}

//get from localStorage
function getItemsfromLs() {
    let items = localStorage.getItem('items');
    if (items) {
        items = JSON.parse(items);
    } else {
        items = [];
    }

    return items;
}


/// add to localStorage
function addItemtoLs(type, desc, money, time) {
    let items = getItemsfromLs();
    items.push({ desc, time, type, money, });
    localStorage.setItem('items', JSON.stringify(items));
}




// show total income
totalIncome();

function totalIncome() {
    let items = getItemsfromLs();
    let totalIncome = 0;
    for (let item of items) {
        if (item.type === "+") {
            totalIncome += parseInt(item.money);
        }
    }
    document.querySelector('.total_income h5').innerHTML = `$${totalIncome}`
}


// show total Expens
totalExpens();
function totalExpens() {
    let items = getItemsfromLs();
    let totalExpens = 0;
    for (let item of items) {
        if (item.type === "-") {
            totalExpens += parseInt(item.money);
        }
    }

    console.log(totalExpens);
    document.querySelector('.expenses h5').innerHTML = `$${totalExpens}`

}

// show total balance

showTotalBalance();

function showTotalBalance() {
    let items = getItemsfromLs();
    let balance = 0;
    for (let item of items) {
        if (item.type === "+") {
            balance += parseInt(item.money);
        } else {
            balance -= parseInt(item.money);
        }
    }

    document.querySelector('.balance h4').innerHTML = `$${balance}`;

    document.querySelector('header').className = (balance >= 0) ? 'green' : 'red';


}