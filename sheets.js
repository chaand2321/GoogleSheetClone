document.querySelector('.new-sheet').addEventListener('click', createNewSheet);

// It will create new sheet
function createNewSheet(event){
    let newCellStateObject = {};
    for(let i = 1; i<=100; i++){
        for(let j = 65; j<=90; j++){
            let key = String.fromCharCode(j) + i;
            newCellStateObject[key] = {...initialCellState};
        }
    }

    if(activeSheetIndex != -1){
        document.getElementById('s'+(activeSheetIndex+1)).classList.remove('active-sheet');
    }

    sheetsArray.push(newCellStateObject);
    let n = sheetsArray.length;
    activeSheetIndex = n-1;
    activeSheetObject = sheetsArray[activeSheetIndex];

    // sheet menu
    let sheetMenu = document.createElement('div');
    sheetMenu.className = 'sheet-menu active-sheet';
    sheetMenu.id = 's' + n;
    sheetMenu.innerText = 'Sheet ' + n;

    // sheet navigation functionlity on click
    sheetMenu.addEventListener('click', (event) => {
        event.stopPropagation();

        document.getElementById('s'+(activeSheetIndex+1)).classList.remove('active-sheet');
        sheetMenu.classList.add('active-sheet');

        activeSheetIndex = Number(event.target.id.slice(1))-1;
        if(sheetsArray[activeSheetIndex] == activeSheetObject){
            activeCell.focus();
            return;
        }
        activeSheetObject = sheetsArray[activeSheetIndex];
        changeSheet();
    })

    // add sheetMenu to the footer
    document.querySelector('.footer').append(sheetMenu);

    // reflecting the current object data i each and every cell
    changeSheet();
}

// Put the active sheets value in all cells
function changeSheet(){
    // cell style reset
    for(let key in activeSheetObject){
        let cell = document.getElementById(key);
        let thisCell = activeSheetObject[key];

        cell.innerText = thisCell.content;
        cell.style.fontFamily = thisCell.fontFamily_data;
        cell.style.fontSize = thisCell.fontSize_data;
        cell.style.fontWeight = thisCell.isBold? '600':'400';
        cell.style.fontStyle = thisCell.isItalic? 'italic':'normal';
        cell.style.textDecoration = thisCell.isUnderlined? 'underline':'none';
        cell.style.textAlign = thisCell.textAlign;
        cell.style.color = thisCell.color;
        cell.style.backgroundColor = thisCell.backgroundColor;
    }

    // make the header fuctionality default
    resetFunctionality();
}

// reset all active functionality
function resetFunctionality(){
    let activeBg = '#c9c8c8';
    let inactiveBg = '#ecf0f1';
    
    activeCell = false;
    addressBar.innerHTML = 'Null';
    fontFamilyBtn.value = initialCellState.fontFamily_data;
    fontSizeBtn.value = initialCellState.fontSize_data;
    boldBtn.style.backgroundColor = inactiveBg;
    italicBtn.style.backgroundColor = inactiveBg;
    underlineBtn.style.backgroundColor = inactiveBg;
    setAlignmentBg(false, activeBg, inactiveBg);
    colorBtn.value = initialCellState.color;
    bgColorBtn.value = initialCellState.backgroundColor;
    formula.value = '';
}


// Create first sheet
createNewSheet();
// createNewSheet();
// createNewSheet();

// activating the sheet 1
// document.getElementById('s1').click();





//functionalities
function setFont(target){
    if(activeCell){
        let fontInput = target.value;
        console.log(fontInput);
        activeSheetObject[activeCell.id].fontFamily_data = fontInput;
        activeCell.style.fontFamily = fontInput;
        activeCell.focus();
    }
}
function setSize(target){
    if(activeCell){
        let sizeInput = target.value;
        activeSheetObject[activeCell.id].fontSize_data = sizeInput;
        activeCell.style.fontSize = sizeInput+'px';
        activeCell.focus();
    }
}

// bug fix
boldBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleBold();
})
function toggleBold(){
    if(activeCell){
        if(!activeSheetObject[activeCell.id].isBold) {
            activeCell.style.fontWeight = '600';
        }
        else{
            activeCell.style.fontWeight = '400';
        }
        activeSheetObject[activeCell.id].isBold = !activeSheetObject[activeCell.id].isBold;
        activeCell.focus();
    }
}

// bug fix
italicBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleItalic();
})
function toggleItalic(){
    if(activeCell){
        if(!activeSheetObject[activeCell.id].isItalic) {
            activeCell.style.fontStyle = 'italic';
        }
        else{
            activeCell.style.fontStyle = 'normal';
        }
        activeSheetObject[activeCell.id].isItalic = !activeSheetObject[activeCell.id].isItalic;
        activeCell.focus();
    }
}

// bug fix
underlineBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleUnderline();
})
function toggleUnderline(){
    if(activeCell){
        if(!activeSheetObject[activeCell.id].isUnderlined) {
            activeCell.style.textDecoration = 'underline';
        }
        else{
            activeCell.style.textDecoration = 'none';
        }
        activeSheetObject[activeCell.id].isUnderlined = !activeSheetObject[activeCell.id].isUnderlined;
        activeCell.focus();
    }
}


// bug ix
document.querySelectorAll('.color-prop').forEach(e => {
    e.addEventListener('click', (event) => event.stopPropagation());
})
function textColor(target){
    if(activeCell){
        let colorInput = target.value;
        activeSheetObject[activeCell.id].color = colorInput;
        activeCell.style.color = colorInput;
        activeCell.focus();
    }
}
function backgroundColor(target){
    if(activeCell){
        let colorInput = target.value;
        activeSheetObject[activeCell.id].backgroundColor = colorInput;
        activeCell.style.backgroundColor = colorInput;
        activeCell.focus();
    }
}

// bug fix
document.querySelectorAll('.alignment').forEach(e => {
    e.addEventListener('click', (event) => {
        event.stopPropagation();
        let align = e.className.split(' ')[0];
        alignment(align);
    });
})
function alignment(align){
    if(activeCell){
        activeCell.style.textAlign = align;
        activeSheetObject[activeCell.id].textAlign = align;
        activeCell.focus();
    }
}



document.querySelector('.copy').addEventListener('click', (event) => {
    event.stopPropagation();
    if (activeCell) {
        navigator.clipboard.writeText(activeCell.innerText);
        activeCell.focus();
    }
})

document.querySelector('.cut').addEventListener('click', (event) => {
    event.stopPropagation();
    if (activeCell) {
        navigator.clipboard.writeText(activeCell.innerText);
        activeCell.innerText = '';
        activeCell.focus();
    }
})

document.querySelector('.paste').addEventListener('click', (event) => {
    event.stopPropagation();
    if (activeCell) {
        navigator.clipboard.readText().then((text) => {
            formula.value = text;
            activeCell.innerText = text;
        })
        activeCell.focus();
    }
})

downloadBtn.addEventListener("click",(e)=>{
    let jsonData = JSON.stringify(sheetsArray);
    let file = new Blob([jsonData],{type: "application/json"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.json";
    a.click();
});

openBtn.addEventListener("click",(e)=>{
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change",(e)=>{
        let fr = new FileReader();
        let files = input.files;
        let fileObj = files[0];

        fr.readAsText(fileObj);
        fr.addEventListener("load",(e)=>{
            let readSheetData = JSON.parse(fr.result);
            readSheetData.forEach(e => {
                document.querySelector('.new-sheet').click();
                sheetsArray[activeSheetIndex] = e;
                activeSheetObject = e;
                changeSheet();
            })
        });
    });
});

formula.addEventListener('input', (event) => {
    activeCell.innerText = event.target.value;
    activeSheetObject[activeCell.id].content = event.target.value;
})



// try for bug fix
document.querySelector('body').addEventListener('click', () => {
    resetFunctionality();
})

// bug fix
formula.addEventListener('click', (event) => event.stopPropagation());

document.querySelectorAll('.select,.color-prop>*').forEach(e => {
    e.addEventListener('click', event => {
        event.stopPropagation();
    });
})