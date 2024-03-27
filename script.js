import { dragElement } from "./interactive.js";

const windowEl = document.getElementById("window");
const terminalEl = document.getElementById("terminal");
const commandInputContainer = document.querySelector(".prompt-container");
let commandInputEl;

// enable window dragging
dragElement(document.getElementById("window"));

const promptLabelCaret = "λ :: ~ >>";

// valid commands and responses
const commandList = {
    help: [
        "help -> list available commands",
        "about -> about myself",
        "skills -> my skills",
        "clear -> clear the terminal",
        "exit -> exit the terminal",
    ],

    about: [
        "👋 I'm Yasir Ahmed, aka 0x902.",
        "✨ I'm a first-year student from Sri Lanka.",
        "🧑‍💻 I'm currently studying computer science.",
        "☕ I have a strong passion for coding and design.",
    ],

    skills: [
        "I'm proficient in,",
        "🌐 Html, CSS and Javascript",
        "🖌️ Figma, Photoshop, Blender",
        "⌨️ C, Java, Python",
        "🗄️ MySQL, Firbase",
    ],

    invalid: ["Invalid command", `Type "help" to see available commands.`],
};

function initializeTerminal() {
    const now = new Date();
    const nowString = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()} | ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    const initCommands = [
        ":: starting session...",
        `:: session started -> ${nowString}`,
    ];

    let delay = 0;
    initCommands.forEach((output) => {
        setTimeout(() => {
            const div = document.createElement("p");
            div.classList.add("general-output");
            div.textContent = output;

            terminalEl.append(div);
        }, (delay += 1200));
    });
}

function showWelcomeMessage() {
    setTimeout(() => {
        const welcomeMessage = `:: Type "help" to see available commands.`;

        const p = document.createElement("p");
        p.classList.add("welcome");
        p.textContent = welcomeMessage;

        terminalEl.append(p);
    }, 4200);
}

function showPrompt() {
    setTimeout(() => {
        commandInputContainer.classList.remove("hidden");
        commandInputEl = commandInputContainer.querySelector("#command-input");
        commandInputEl.focus();

        // maintain focus on input element
        commandInputEl.onblur = function () {
            var blurEl = this;
            setTimeout(() => {
                blurEl.focus();
            }, 10);
        };

        commandInputEl.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                executeCommand(commandInputEl.value);
            }
        });
    }, 4200);
}

function executeCommand(command) {
    // display the entered command
    displayPrompt(command);
    commandInputEl.value = "";

    switch (command) {
        case "clear":
            terminalEl.textContent = "";
            break;
        case "exit":
            windowEl.remove();
        default:
            if (commandList[command]) {
                displayOutput(command, "success");
            } else {
                displayOutput("invalid", "error");
            }
    }
}

function displayPrompt(command) {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="prompt-container">
        <label for="command-input" id="prompt">${promptLabelCaret} ${command}</label>
        <input
            id="command-input"
            type="text"
            autocomplete="off"
            autocapitalize="off"
            autofocus
            disabled
        />
    </div>
    `;
    terminalEl.append(div);
}

function displayOutput(command, type) {
    const promptResult = document.createElement("div");

    promptResult.classList.add("prompt-result");
    promptResult.classList.add(type);
    commandList[command].forEach((output) => {
        const p = document.createElement("p");
        p.textContent = output;
        promptResult.append(p);
    });

    terminalEl.append(promptResult);
    promptResult.scrollIntoView();
}

initializeTerminal();
showWelcomeMessage();
showPrompt();
