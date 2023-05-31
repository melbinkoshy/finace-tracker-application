
let account=JSON.parse(localStorage.getItem('accountDetails'))||{
  username:'',
  balance:0,
  income:{},
  expenses:{}
  }
  

renderGreeting();
//adding event listerner to both the buttons
//adding income
  document.querySelector('.js-add-income-button').addEventListener('click',()=>{
    addIncome();
  })
//adding expense
  document.querySelector('.js-add-expense-button').addEventListener('click',()=>{
    addExpense();
  })
  
  

  function createAccount(){
    const userName=document.querySelector('.js-username-input').value;
    account.username=userName;
    localStorage.setItem('accountDetails',JSON.stringify(account));
    renderGreeting();
  }

  function renderGreeting(){
    
    if(isFirstTimeVisitor()){
      document.querySelector('.js-greeting').innerHTML=`Enter Username: 
      <input class='js-username-input'>
      <button class="js-create-account-button">create account</button>`;
      document.querySelector('.js-create-account-button').addEventListener('click',()=>{
        createAccount();
      })
      renderBalance();
    }
    else{
      document.querySelector('.js-greeting').innerText=`Hey ${account.username}!`;
      renderBalance();
    }
    
  }

  function addIncome(){
  const incomeAmount=document.querySelector('.js-income-amount').value;
  const incomeDescription=document.querySelector('.js-income-description').value;
  account.balance+=Number(incomeAmount)
  account.income[incomeDescription]=Number(incomeAmount);
  localStorage.setItem('accountDetails',JSON.stringify(account));
  console.log(account.income);
  renderBalance();
  document.querySelector('.js-income-description').value='';
  document.querySelector('.js-income-amount').value='';
}


function addExpense(){
  const expenseAmount=document.querySelector('.js-expense-amount').value;
  const expenseDescription=document.querySelector('.js-expense-description').value;
  account.balance-=Number(expenseAmount)
  account.expenses[expenseDescription]=Number(expenseAmount);
  localStorage.setItem('accountDetails',JSON.stringify(account))
  console.log(account.expenses)
  renderBalance();
  document.querySelector('.js-expense-description').value='';
  document.querySelector('.js-expense-amount').value='';
}

function renderBalance(){
  document.querySelector('.js-current-balance').innerText=`current balance: ${account.balance}`;
}

function renderAllIncome(){
  document.querySelector('.js-render-income-expense').innerHTML='';
  for (let key in account.income){
    document.querySelector('.js-render-income-expense').innerHTML+=`<p>${key} : ${account.income[key]}</p>`
  }
}

function renderAllExpense(){
  document.querySelector('.js-render-income-expense').innerHTML='';
  for (let key in account.expenses){
    document.querySelector('.js-render-income-expense').innerHTML+=`<p>${`${key}`} : ${account.expenses[key]}</p>`
  }
}

function reset(){
  localStorage.removeItem("visited");
  localStorage.removeItem('accountDetails');
  account={
    username:'',
    balance:0,
    income:{},
    expenses:{}
    }
  renderGreeting();
  renderAllExpense();
  renderAllIncome();
}

// Check if the user is visiting the site for the first time
function isFirstTimeVisitor() {
  if (localStorage.getItem("visited") === "true") {
    // User has visited before
    return false;
  } else {
    // Set the "visited" flag in local storage to mark the user as visited
    localStorage.setItem("visited", "true");
    
    // User is visiting for the first time
    return true;
  }
}

