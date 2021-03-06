const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function createManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Managers Name:"
        },
        {
            type: "input",
            name: "id",
            message: "Managers ID number:"
        },
        {
            type: "input",
            name: "email",
            message: "Managers email address:"
        },
        {
            type: "input",
            name: "officenumber",
            message: "Managers office number:"
        },
    ]).then(function (data) {
        const newManager = new Manager(data.name, data.id, data.email, data.officenumber)
        addTeamMember(newManager)
    })
}
function createTeam() {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Employee Type:",
            choices: [
                "Engineer",
                "Intern"
            ]
        },
        {
            type: "input",
            name: "name",
            message: "Name:"
        },
        {
            type: "input",
            name: "id",
            message: "ID number:"
        },
        {
            type: "input",
            name: "email",
            message: "Email address:"
        },
    ]).then(function(data){
        if (data.role === "Engineer") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "github",
                    message: "Github Username:"
                },
            ]).then(function (unique){
                const newEngineer = new Engineer(data.name, data.id, data.email, unique.github)
                addTeamMember(newEngineer)
            })
        }else if(data.role === "Intern") {
            inquirer.prompt([
                {
                    type:"input",
                    name:"school",
                    message:"School Name:"
                },
            ]).then(function (unique){
                const newIntern = new Intern(data.name, data.id, data.email, unique.school)
                addTeamMember(newIntern)
            })
        }
    })
}
function finish() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(employees), "utf-8");
    console.log("Export Complete")
}

function addTeamMember(newEmployee) {
    employees.push(newEmployee);
    inquirer.prompt([
        {
            type:"list",
            name:"action",
            message:"Next action:",
            choices:[
                "Add team member",
                "Finish and export team"
            ]
        }
    ]).then(function(response) {
        if (response.action === "Add team member") {
            createTeam();
        }else{
            finish();
        }
    })
}

createManager();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
