import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const firebaseConfig = {

  databaseURL: "https://list-it-5987e-default-rtdb.europe-west1.firebasedatabase.app/",

};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const shoppingListInDb = ref(database, "shoppingList");

const inputField = document.getElementById("input-field");
const addBtn = document.getElementById("add-btn");
const shoppingListEl = document.getElementById("shoppingList")


addBtn.addEventListener("click", function(){

    let inputValue = inputField.value;

    push(shoppingListInDb, inputValue);

    clearInput()

});


onValue(shoppingListInDb,function(snapshot){


    if (snapshot.exists()){

        let itemsArray = Object.entries(snapshot.val())

        clearShoppingList()

        for(let i = 0; i<itemsArray.length; i++){
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemVAlue = currentItem[1]
            appendItemsToShoppingList(currentItem)
        }
    }else{
        shoppingListEl.innerHTML = "No items were added !!!"
    }

    
})

function clearShoppingList(){
    shoppingListEl.innerHTML=""
}

function clearInput(){
    inputField.value = ""
}


function appendItemsToShoppingList(item){
    
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function(){

        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)

        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
}

