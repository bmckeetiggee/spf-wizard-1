/*jshint esversion: 6 */
$(document).ready(() => {

    $('a').on('click', (e) => {
        e.preventDefault();
        return true;
    });

    //make answer sticky
    let distance = $('.input__answer').offset().top,
        $window = $(window);

    $window.scroll(function () {
        if ($window.scrollTop() >= distance) {
            $('.answer__wrapper').addClass('input__sticky');
        }
    });

    // copy answer
    copyAnswer = document.getElementsByClassName('answer__copy');

    $(copyAnswer).on('click', () => {
        $(answer).focus();
        document.execCommand("copy");
    });


    //reusable objects
    const answer = document.getElementById("answer");
    const domain = document.getElementById("domain");
    const form = document.getElementsByClassName("form__spf-wizard");

    //Auto insert domain name into #domainName
    let domainNamePlaceHolder = "your domain,";
    let domainName = "";

    $(domain).keyup(x => {
        if (x.originalEvent.key === "Backspace" && $(domain).val() === "") {
            $("#domainName").text(domainNamePlaceHolder);
        } else {
            domainName = $(domain).val();
            $("#domainName").text(domainName);
        }
    });


    // $("#domainName").text(domainNamePlaceHolder); //is this necessary?

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

    $(domain).keyup(x => {
        if (x.originalEvent.key === "Backspace" && yourDomain.length === 1) {
            yourDomain = "example.com";
        } else {
            yourDomain = $(domain).val();
        }
        printAnswer();
    });


    //MX Servers, IP Address, Hostnames, and Strict inputs
    const inputs = 'input[name=MXServers], input[name=IPAddress], input[name=hostnames], input[name=strict]';
    //Event Handler for inputs
    $(inputs).on("click", () => {
        printAnswer();
    });

    // auto insert IP relay in answer box
    let relayIPAddress = $('#relayIPAddress');
    let relayInfo = " ip4:";

    $(relayIPAddress).on('keyup', () => {
        printAnswer();
    });


    //Print Answer to DOM


    // const printAnswer = () => {

    //no longer reruns or duplicates value in answer box
    let MXServers = $("input[name=MXServers]:checked").val();
    let IPAddress = $("input[name=IPAddress]:checked").val();
    let Hostnames = $("input[name=hostnames]:checked").val();
    let strict = $("input[name=strict]:checked").val();
    let array = relayIPAddress.val().split(',');

    // if (relayIPAddress.val() >= 1) {
    //     relayAnswer = array.map(function (el) {
    //         return ' ip4:' + el;
    //     }).join();
    // } else {
    //     relayAnswer = "";
    // }

    // console.log(relayAnswer);

    // $.each(array, function (i) {
    //     if (relayIPAddress.val() >= 1) {
    //         relayAnswer = relayInfo.concat($(relayIPAddress).val());
    //     } else {
    //         relayAnswer = "";
    //     }
    // });

    let recordInfo = "\\. IN TXT";

    let inputAnswers = jQuery.makeArray(yourDomain,
        recordInfo,
        " ",
        '\"',
        MXServers,
        IPAddress,
        Hostnames,
        strict,
        '\"');

    console.table(inputAnswers);

    // $(answer).val(inputAnswers.join(''));
    // };

});