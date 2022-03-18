let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-list");
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
function render(leads) {
    let listitems = "";
    for (let i = 0; i < leads.length; i++) {
        listitems +=
            `<li>
                <a target = '_blank' href = '${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>`
    }
    ulEl.innerHTML = listitems;
}

deleteBtn.addEventListener("click", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    render(myLeads);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
});


tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){   
        console.log(tabs)
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})


