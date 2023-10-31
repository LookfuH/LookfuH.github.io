var charElement = {
    CharName: 1,

    //strength
    cStr: 2,
    sStr: 3,

    //intellgents
    cInt: 4,
    sInt: 5,

    //dexterity
    cDex: 6,
    sDex: 7,

    //wisdom
    cWis: 8,
    sWis: 9,
 
    //Consistuition
    cCon: 10,
    sCon: 11,

    //Charisma
    cChar: 12,
    sChar: 13,
}

var tourlistxhttp = new XMLHttpRequest();
var tourItemTag = "ThemeEntityAbridgedData";
var tourListTag = "ThemeData";

var tour1XML = null;
var tourListXML = null;
var numXMLs = -1;

//creates charatersheet from xml
var characterSheet = new XMLHttpRequest();
tourlistxhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        tourListXML = this.responseXML;
        numXMLs = tourListXML.getElementsByTagName(tourListTag).length;
        generateTourList();
    }
}

tourlistxhttp.open("GET", "./xml/themes.xml", true);
tourlistxhttp.send();

// gets a list of all items in the specified tour
function getTourItems(ind, func) {
    var tour1xhttp = new XMLHttpRequest();
    tour1xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            func(this.responseXML.getElementsByTagName(tourItemTag));
        }
    }

    tour1xhttp.open("GET", "./xml/tour/" + ind + ".xml", true);
    tour1xhttp.send();
}

// retrieves the tour at the specified index (not specific to the tour, but to the array of tours)
function getTourData(ind, element) {
    return tourListXML.getElementsByTagName(tourListTag)[ind].childNodes[element].innerHTML;;
}





function Roll(){
    return Math.floor(Math.random() * 20);
}

function CharacterInfo(){
    
}



