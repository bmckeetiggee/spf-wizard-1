const answer = document.getElementById("answer");
const domain = document.getElementById("domain");
const allowMXServers = document.getElementById("allowMXServers");
const disallowMXServers = document.getElementById("disallowMXServers");
const form = document.getElementsByClassName("form__spf-wizard");

//Add IP Address
$(document).ready(() => {
  //Auto insert domain name into #domainName
  let domainNamePlaceHolder = "your domain,";
  let domainName = "";
  $("#domain").keyup(x => {
    if (x.originalEvent.key === "Backspace" && $("#domain").val() === "") {
      $("#domainName").text(domainNamePlaceHolder);
    } else {
      domainName = $("#domain").val();
      $("#domainName").text(domainName);
    }
  });

  $("#domainName").text(domainNamePlaceHolder);

  /*let foo = $("#answer").html();
  const main = ["@ IN TXT", ' "v=spf1', '"'];
    $("#relayIPAddress").keypress(x => {
    main.splice(2, 0, "test");
    console.log(x.originalEvent.key);
    /*$("#answer").text(x.originalEvent.key);
    console.log(main);
    $("#answer").text(main.join(" "));
  });
  $("#answer").text(main.join(" "));*/
});

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
