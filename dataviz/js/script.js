// ### SPLIT STRING FUNCTION ### //
function splitString(stringToSplit, separator) {
    var arrayOfStrings = stringToSplit.split(separator);

    return arrayOfStrings[1]
}

// ### CHANGE MAIN TITLE CONTENT ### //
function changeMainTitle(string) {
    document.querySelector(".title-wrapper span").innerHTML = string
}

// ### ADD CONTENT TO TITLE WRAPPER ### //
function addToTitleWrapper(string, color) {
    document.querySelector(".title-wrapper").innerHTML += string
    document.querySelector(".title-wrapper span").style.color = color
    document.querySelector(".title-wrapper span").setAttribute("class", "noFill")
    document.querySelector(".title-wrapper span").style.textShadow = '-1px 0 ' + color + ', 0 1px ' + color +', 1px 0 ' + color +', 0 -1px ' + color
}
