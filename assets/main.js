const answer = document.getElementById("answer");
const domain = document.getElementById("domain");
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

    //auto insert domain name in #answer
    let yourDomain = "example.com";
    let recordInfo = ". IN TXT";
    $("#domain").keyup(x => {
        if (x.originalEvent.key === "Backspace" && yourDomain.length === 1) {
            yourDomain = "example.com";
        } else {
            yourDomain = $("#domain").val();
        }
        $("#answer")
            .text(yourDomain)
            .append(recordInfo);
    });

    $("#answer").text(yourDomain);

});

//MX Servers
$(document).ready(() => {
    let MXServers = " v=spf1 mx";
    let disallowMXServers = " v=spf1";
    //Yes
    $("input[name=MXServers]").on("change", function() {
        if ($(this).val() == "yes" && $(this).is(":checked")) {
            $("#answer").append(MXServers);
        } else if ($(this).val() == "no" && $(this).is(":checked")) {
            $("#answer").append(disallowMXServers);
        }
    });
});

// const answerText = domain.value + "" + 'IN TXT "v=spf1"';

// //populate answer box
// function submitForm() {
//     if (domain.value != undefined) {
//         answer.innerHTML = answerText;
//     }
//     // answer.innerHTML = domain.value + "." + " " + "IN TXT";
// }
