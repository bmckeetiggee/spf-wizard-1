/*jshint esversion: 6 */
$(document).ready(() => {

    //reusable objects
    const answer = $("#answer");
    const domain = $("#domain");
    const form = $("#form__spf-wizard");

    $('a').on('click', (e) => {
        e.preventDefault();
        return true;
    });

    //make answer sticky
    let answerWrapper = $('.input__answer__wrapper');
    let distance = $('.input__answer').offset().top,
        $window = $(window);

    $window.scroll(function () {
        if ($window.scrollTop() >= distance) {
            $(answerWrapper).addClass('input__sticky');
        }
    });

    // copy answer
    $('.input__answer__copy').on('click', () => {
        answer.select();
        document.execCommand("copy");
        console.log('copied' + answer.value);
    });

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
            yourDomain = "example.com. IN TXT";
        } else {
            yourDomain = $(domain).val() + ". IN TXT";
            //now recordInfo only shows if domain has a value 
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
    const relayIPAddress = $('#relayIPAddress');

    $(relayIPAddress).on('keyup', () => {
        if (relayIPAddress.val >= 1) {
            printAnswer();
        } else {
            return false;
        }
    });

    //        let relayInfo = " ip4:";
    // if (relayIPAddress.val() >= 1) {
    //     relayAnswer = array.map(function (el) {
    //         return ' ip4:' + el;
    //     });
    //     inputAnswers.push(relayAnswer);
    // } else {
    //     relayAnswer = "";
    // }

    // $.each(array, function (i) {
    //     if (relayIPAddress.val() >= 1) {
    //         relayAnswer = relayInfo.concat($(relayIPAddress).val());
    //     } else {
    //         relayAnswer = "";
    //     }
    // });


    //Print Answer to DOM


    const printAnswer = () => {

        //no longer reruns or duplicates value in answer box
        let MXServers = $("input[name=MXServers]:checked").val();
        let IPAddress = $("input[name=IPAddress]:checked").val();
        let Hostnames = $("input[name=hostnames]:checked").val();
        let strict = $("input[name=strict]:checked").val();

        let relayArray = relayIPAddress.val().split(' ');
        let relayArrayAppended = relayArray.map(function (el) {
            return ' ip4:' + el;
            //need this function to ONLY run if has a value >= 1
            //trim any spaces
        });

        let inputAnswers = [
            yourDomain,
            " ",
            '"',
            MXServers,
            IPAddress,
            Hostnames,
            strict,
            relayArrayAppended.join(' '),
            '"'
        ];

        $(answer).val(inputAnswers.join(''));

    };

});