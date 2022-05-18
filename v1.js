//Parse get-parameters
const queryString = window.location.search;
const queryParams = new URLSearchParams(queryString);
const connector = queryParams.get("show");
const directory = "v1/" + connector;

//Perform HTTP request to load data xml
const loadDataRequest = new XMLHttpRequest();
loadDataRequest.open("GET", directory + "/data.xml", false);
loadDataRequest.setRequestHeader("Content-Type", "text/xml");
loadDataRequest.send();

//Parse data XML
const data = new DOMParser().parseFromString(loadDataRequest.responseText, "text/xml");
const data_name = data.getElementsByTagName("name")[0].innerHTML;
const data_dimensions = data.getElementsByTagName("dimensions")[0];

const data_width = data_dimensions.getElementsByTagName("width")[0].innerHTML;
const data_height = data_dimensions.getElementsByTagName("height")[0].innerHTML;
const data_dimUnit = data_dimensions.getElementsByTagName("units")[0].innerHTML;

//Find page elements
const elem_pageTitle = document.getElementsByTagName("title")[0];
const elem_connName = document.getElementById("connector_name");
//const elem_imageFront = document.getElementById("connector_image_front");
const elem_dimWidth = document.getElementById("connector_dimension_width");
const elem_dimHeight = document.getElementById("connector_dimension_height");

//Render loaded information
elem_pageTitle.innerHTML = data_name;
elem_connName.innerHTML = data_name;
//elem_imageFront.src = directory + "/front.png";
elem_dimWidth.innerHTML = data_width + data_dimUnit;
elem_dimHeight.innerHTML = data_height + data_dimUnit;

//Show back button if needed
if (queryParams.get("back") == "true") {
    const button = document.getElementById("back_button")
    button.classList.remove("hidden");
    button.onclick = function() {
        history.back();
    }
}