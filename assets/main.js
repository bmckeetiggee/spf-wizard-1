const answer = document.getElementById("answer");
const domain = document.getElementById("domain");

function submitForm() {
    if (domain.value != undefined) {
        answer.innerHTML = domain.value + "" + 'IN TXT "v=spf1"';
    }
    // answer.innerHTML = domain.value;
}
