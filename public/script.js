
let calendar= document.getElementById('calendar');
let curr= null;
let currentEventDate= new Date().toLocaleDateString('en-US');
const allDays= ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const incMonth= ()=>{
    curr++;
    show();
}
const decMonth=()=>{
    curr--;
    show();

}

const show= ()=>{
    renderData();
    calendar.innerHTML='';
    let date= new Date();
    if(curr!=null){
        date.setMonth(curr);
    }
    else{
        curr= date.getMonth();
    }
    let year= date.getFullYear();
    let month = date.getMonth();
    document.getElementById('month-year').innerHTML= months[month]+" "+year;
    let nfDays= new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
    let fstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    fstDay= (fstDay+"").split(" ");
    fstDay= fstDay[0];
    let emptydays = allDays.indexOf(fstDay);
    for(let i=0;i< emptydays;i++){
        calendar.innerHTML+= `<div class="block bg-inherit p-6 m-2 w-20"></div>`;
    }
    for(let i= 1;i<=nfDays;i++){
        let id = (month+1)+"/"+i+"/"+year;
        let newdiv= document.createElement("div");
        newdiv.innerHTML= i+"";
        newdiv.id= id;
        newdiv.className = "text-center block rounded-lg bg-white p-6 shadow-lg m-2 w-20";
        newdiv.addEventListener('click',getEvents);
        calendar.appendChild(newdiv);
        // calendar.innerHTML+= `<div id=${id} onclick='getEvents(this);' class="text-center block rounded-lg bg-white p-6 shadow-lg m-2 w-20">${i}</div>`;
    }
}


const getEvents =  (e)=>{
    currentEventDate= e.target.id;
    renderData();
}

const renderData= ()=>{
    let msg= document.getElementById("message");
    msg.innerHTML= "Hey! Events for "+currentEventDate;
    let el= document.getElementById('EventsList');
    el.innerHTML="";
    let events= localStorage.getItem(currentEventDate);
    if(events!=null){
        events= events.split("#@#");
        for(let i=0;i<events.length;i++){
            if(events[i]!=''){
                let div= document.createElement("div");
                div.innerHTML= events[i];
                div.className = "text-white bg-slate-600 p-2 m-2 text-lg";
                el.appendChild(div);

            }
        }
    }

}

const addEvent = ()=>{
    let edata= document.getElementById("inputEvent").value;
    if(localStorage.getItem(currentEventDate)==null){
        localStorage.setItem(currentEventDate,edata+"#@#");
    }
    else{
        localStorage.setItem(currentEventDate, localStorage.getItem(currentEventDate)+edata+"#@#");
    }
    renderData();
}


show();