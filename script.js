const terminalEl = document.getElementById("terminal")
const promptContainerEl = document.querySelector(".prompt-container")

dragElement(document.getElementById("window"));

const commandList = {
    help : `
    help -> list available commands
    about -> about me
    projects -> projects list
    `,
    about : "I'm Yasir Ahmed"
}


function initializeTerminal() {
    const now = new Date()
    const nowString = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()} | ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    const initOutputs = [":: starting session...", `:: session started -> ${nowString}`]

    let delay = 0
    
    initOutputs.forEach(output => {
        setTimeout(() => {
            const outputEl = document.createElement("p")
            outputEl.classList.add("general-output")
            outputEl.textContent = output

            terminalEl.append(outputEl)
        }, delay += 1200)
    })
}

function showWelcomeMessage(executeCommand) {
    setTimeout(() => {
        const welcomeMessage = `:: Type "help" to see available commands.`
    
        const outputEl = document.createElement("p")
        outputEl.classList.add("welcome")
        outputEl.textContent = welcomeMessage
    
        terminalEl.append(outputEl)
    }, 4200)
}

function showPrompt() {
    setTimeout(() => {
        promptContainerEl.classList.remove("hidden")
        const commandInputEl = promptContainerEl.querySelector("#command-input")
        commandInputEl.focus()

        commandInputEl.onblur = function(e) {
            var blurEl = this;
            setTimeout(() => {
                blurEl.focus()
            },10)
        }

        commandInputEl.addEventListener("keydown", (e) => {
            if(e.key === "Enter") {
                executeCommand(commandInputEl.value)
            }
        })
    }, 4200)
}

function executeCommand(command) {
    if(commandList[command]) {
        const outputEl = document.createElement("p")
        outputEl.classList.add("prompt-result")
        outputEl.textContent = commandList[command]

        terminalEl.append(outputEl)
    }
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

initializeTerminal()
showWelcomeMessage()
showPrompt()