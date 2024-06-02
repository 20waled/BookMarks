
var websiteNameInput = document.getElementById("sitename");
var websiteUrlInput = document.getElementById("siteurl");
var webSites;

if (localStorage.getItem("links") !== null) {
    webSites = JSON.parse(localStorage.getItem("links"));
    displayWebsite();
}
else {
    webSites = [];
}

function addWebsite() {
    var sites = {
        siteName: websiteNameInput.value,
        siteUrl: websiteUrlInput.value
    }
    webSites.push(sites);
    localStorage.setItem("links", JSON.stringify(webSites));
    clearForm();
    displayWebsite();
}

function clearForm() {
    websiteNameInput.value = null;
    websiteUrlInput.value = null;
}

function displayWebsite() {
    var x = ``;
    for (var i = 0; i < webSites.length; i++) {
        x += ` <tr>
        <th>${i + 1}</th>
        <th>${webSites[i].siteName}</th>
        <th><button onclick="visitWebsite(${i})" class="btn btn-primary"> <i class="fa fa-eye"></i> Visit</button></th>
        <th><button onclick="deleteWebsite(${i})" class="btn btn-danger"> <i class="fa fa-trash-alt"></i> Delete</button></th>
      </tr>`
    }
    document.getElementById("content").innerHTML = x;
}

function deleteWebsite(deletedIndex) {
    webSites.splice(deletedIndex, 1);
    displayWebsite();
    localStorage.setItem("links", JSON.stringify(webSites));
}

function visitWebsite(i) {
    var urlRegex = /^https?:\/\//;

    if (urlRegex.test(webSites[i].siteUrl)) {
        window.open(webSites[i].siteUrl)
    }
    else {
        window.open("Wrong URL");
    }
}


function validateInputs(element) {
    var regex = {
        sitename: /^[A-Z][a-z]{3,10}$/,
        siteurl: /^https?:\/\//
    }
    if (regex[element.id].test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.replace("d-block", "d-none");
    }
    else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.replace("d-none", "d-block");
        
    }
}
