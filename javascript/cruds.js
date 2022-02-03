//take element from inputs to access them.
let flag=-1;
function read_data()
{
let title=document.getElementById('title'); 
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
}
read_data();
//total
let div_price=[price,taxes,ads,discount]
for(let i=0;i<div_price.length;i++)
{
   div_price[i].onkeyup=function()
   {
       if(price.value!='')
       {
           let result=+price.value + +taxes.value
           + +ads.value + -discount.value;
           total.innerHTML=result;
           total.style.background='green';
       }
       else
       {
           total.innerHTML='';
           total.style.background='rgb(129, 14, 6)';
       }
   }
}

//create
//save localstorage
let products=[]
if(localStorage.product!=null)
{

    products=JSON.parse(localStorage.getItem('product'));
}

submit.onclick=function()
{
let new_product=
{
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
};
if(new_product.title!=''&&new_product.price!=''&&new_product.category!=''&&new_product.count<=100)
{

    if(submit.innerText=='Create')
    {
        
        if(new_product.count>1)
        {
            for (i=0;i<new_product.count;i++)
            {
                
                products.push([new_product,products.length]);
            }
            
        }
        else
        {
            products.push([new_product,products.length]);
            
        }
    }
    else
    {
        total.style.background='rgb(129, 14, 6)';
        
        products[flag][0]=new_product;
        submit.innerText='Create';
        flag=-1;
        count.style.display='block';
        
    }
    clearDate();
    localStorage.product=JSON.stringify(products);
    add_data_in_table(products);

}

}
//clear inputs

function clearDate()
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
read=[];
//read in table
function add_data_in_table(p)
{
    read=``;
    table=document.getElementById('table');
    for(let i=0;i<p.length;i++)
    {
        read+=
        `
        <tr>
        <td>${p[i][1]}</td>
        <td>${p[i][0].title}</td>
        <td>${p[i][0].price}</td>
        <td>${p[i][0].taxes}</td>
        <td>${p[i][0].ads}</td>
        <td>${p[i][0].discount}</td>
        <td>${p[i][0].total}</td>
        <td>${p[i][0].category}</td>
        <td><button id="update"onclick='update_date(${i})'>update</button></td>
        <td><button id="delete"onclick='deleteData_onebyone(${i})'>delete</button></td>
    </tr>
        `
    }
    table.innerHTML=read;
    let Delete_all=document.getElementById('delete_all_data');
    if(products.length>0)
    {
        Delete_all.innerHTML=`
        <button onclick='delete_all()'>Delete All(${products.length})</button>
        `
    }
    else
    {
        Delete_all.innerHTML='';
    }

}
//DeleteAll();

//delete
delete_var=document.getElementById('delete_all_data');
function deleteData_onebyone(i)
{
    products.splice(i,1);
    for(i=0;i<products.length;i++)
    {
        products[i][1]=i;
    }
    localStorage.product=JSON.stringify(products);
    add_data_in_table(products);
}
//delete_all

function delete_all()
{
  localStorage.clear();
  products.splice(0);
add_data_in_table(products)

}
function show_data(obj)
{

title.value=obj.title;
price.value=obj.price;
taxes.value=obj.taxes;
ads.value=obj.ads;
discount.value=obj.discount;
total.innerHTML=obj.total;
count.style.display='none'; 
category.value=obj.category;
let update=document.getElementById('submit');
update.innerText='Update';
}

//update

function update_date(i)
{
    flag=i;
    let obj=products[i][0];
    //deleteData_onebyone(i);
    show_data(obj);
    read_data();
    scroll({
        top:0,
        behavior:'smooth'
    })
    total.style.background='green';

}
//count

//search
let search_title=document.getElementById('searchTitle');
let search_category=document.getElementById('searchcategory');

let search_block=document.getElementById('search');
let mood='title';
search_title.onclick=function()
{
    mood='title';
    search_block.value='';
    add_data_in_table(products);
    search_block.placeholder='Search By Title';
    search_block.focus();
    
}
search_category.onclick=function()
{
    mood='category';
    search_block.value='';
    add_data_in_table(products);
    search_block.placeholder='Search By Category';
    search_block.focus();
}

search_block.onkeyup=function()
{
    search_t=search_block.value.toString().toLowerCase();
    let new_product=[];
    a=0;
    let s,obj;
    for( i=0;i<products.length;i++)
    {
        if(mood=='title')s=products[i][0].title.toString();
        else s=products[i][0].category.toString();
        if(s.includes(search_t))
        {
            new_product.push(products[i]);
        }
    }
    add_data_in_table(new_product);
}    


//clean data


add_data_in_table(products)