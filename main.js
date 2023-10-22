let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let sumbit=document.getElementById('sumbit');
let mood = 'create';
let tmp; // global

//get total
function getTotal()
{
    if(price.value != '')
    {
        let result =( +price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background= 'green';
    }
    else
    {
        total.innerHTML = '';
        total.style.background='darkred';
    }
}

 //create new product

 let dataPro;  //save data
    if(localStorage.product != null)
    {
    dataPro=JSON.parse(localStorage.product) 
    }
    else 
    {
        dataPro = [];
    }

 submit.onclick = function()
{
    let newPro =  //  variable to new product 
    {
        title:title.value.toLowerCase(), 
        price:price.value , 
        taxes:taxes.value , 
        ads:ads.value , 
        discount:discount.value , 
        total:total.innerHTML , 
        count:count.value , 
        category:category.value.toLowerCase(),
    } 

// make a new object to save thwe data in it
// to check exists data or not >0 
// >1 
if(title.value !=''&&price.value != ''&& category.value !='' ){
    if(mood=='create'){
    if (newPro.count > 1){ // creat no of product= no of count 
        for(let i=0;i< newPro.count;i++){
            dataPro.push(newPro);  // add new item only one  
        }
    } else{ // if count negative or zero
        dataPro.push(newPro);    
     } }
    else{
        dataPro[ tmp ]=newPro;
        mood='create';
        submit.innerHTML ='create ';
        count.style.display='block';

    }
}
    localStorage.setItem('product' , JSON.stringify(dataPro)) //lazm ahawel el array l string 3ashan akhznha f el local storage
    clearDataFromInputs()
    showData()
}
 //clear inputs

function clearDataFromInputs()
{
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value=''; 
}
 //read
function showData()
{
    getTotal()
    let table='';
    for(let i=0 ; i<dataPro.length ; i++)
    {
     table+=` 
        <tr>
            <td>${i} </td>
            <td>${dataPro[i].title} </td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateDate(${i}) " id="update"> update</button></td>
            <td><button onclick="deleteData( ${i} )" id="delete"> delete</button></td>
        </tr>
        `
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length>0){
     btnDelete.innerHTML =`
     <button onclick="deleteAll()">delete All(${dataPro.length})</button>`
    //  delete All(${dataPro.length})  
    }
    else{
        btnDelete.innerHTML = ''; 
    }

}
showData()

// //delete
function deleteData(i){
dataPro.splice(i,1);  //write index of element you want to remove from array only not  locaal storage 
localStorage.product =JSON.stringify(dataPro); //remove but not updata data you must to reload to show the new version 
showData() // updata data after delete
}
// // delete all if exists data 
// // data in local storage and array if i want to deldete must delete both
function deleteAll(){
localStorage.clear()
dataPro.splice(0) // from 0 to end and not updata data 
showData() //updata 

}
//updata
function updateDate(i){

// console.log(i)
title.value = dataPro[i].title;
price.value = dataPro[i].price;
taxes.value = dataPro[i].taxes;
ads.value = dataPro[i].ads;
discount.value = dataPro[i].discount;
getTotal()
count.style.display='none';
category.value = dataPro[i].category;
submit.innerHTML='Update'; //creat new not change 
mood= 'Update';
tmp=i;
scroll({
    top:0,//3lshan 2rf3 2l scroll lfo2
    behavior: 'smooth',// 3lshan ttl3 bora7a
})

 }

//search
let searchMood='title';
  
function getSearchMood(id)
{
    let search = document.getElementById('search');
    if(id=='searchTitle'){
        searchMood='title';
    }else{
        searchMood='category';

    }
    search.placeholder='search By '+ searchMood;
        search.focus()
        search.value='';
        showData()
}

 function searchData(value)
 { 
    let table ='';
    for(let i=0; i < dataPro.length;i++){
         if(searchMood == 'title'){
            if(dataPro[i].title.includes(value.toLowerCase())){
                        table+=`
                        <tr>
                        <td>${i} </td>
                        <td>${dataPro[i].title} </td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateDate(${i}) " id="update"> update</button></td>
                        <td><button onclick="deleteData( ${i} )" id="delete"> delete</button></td>
                    </tr>
                        `;
            }
        }
       else{
              
                 if(dataPro[i].category.includes(value.toLowerCase())){
                    table+=`
                    <tr>
                    <td>${i} </td>
                    <td>${dataPro[i].title} </td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateDate(${i}) " id="update"> update</button></td>
                    <td><button onclick="deleteData( ${i} )" id="delete"> delete</button></td>
                    </tr>
                       `;
               }
}}
 document.getElementById('tbody').innerHTML= table;
 }
