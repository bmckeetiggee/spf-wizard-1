const answer = document.getElementById("answer");
const domain = document.getElementById("domain");
const allowMXServers = document.getElementById("allowMXServers");
const disallowMXServers = document.getElementById("disallowMXServers");
const form = document.getElementsByClassName("form__spf-wizard");

function getMXServersValue() {
    if ((allowMXServers.checked = true)) {
        // return allowMXServers.value;
        console.log("it worked");
        // else if ((disallowMXServers.checked = true)) {
        //     return disallowMXServers.value;
        // }
    }
}

function submitForm() {
    answer.innerHTML = domain.value + "." + " " + "IN TXT";
}
