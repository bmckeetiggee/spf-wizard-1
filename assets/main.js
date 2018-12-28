/*jshint esversion: 6 */
$(document).ready(() => {

    //reusable objects
    const answer = $("#answer");
    const domain = $("#domain");
    const form = $("#form__spf-wizard");
    const inputs = 'input[name=MXServers], input[name=IPAddress], input[name=hostnames], input[name=strict]';

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
        // console.log('copied' + answer.value);
    });

    //Auto insert domain name
    let domainNameText = $('.domainName');
    let domainNamePlaceHolder = "your domain";
    let domainName = "";

    $(domain).keyup(x => {
        if ($(domain).val() === "") {
            $(domainNameText).text(domainNamePlaceHolder);
        } else {
            domainName = $(domain).val();
            $(domainNameText).text(domainName);
        }
    });
    $(domainNameText).text(domainNamePlaceHolder);

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


    //Event Handlers
    $(inputs).on("click", () => {
        printAnswer();
    });

    const relayIPAddress = $('#relayIPAddress');
    $(relayIPAddress).on('keyup', () => {
        printAnswer();
    });

    const relayHostnames = $('#relayHostnames');
    $(relayHostnames).on('keyup', () => {
        printAnswer();
    });

    $('#relayDomains').on('keyup', () => {
        printAnswer();
    });




    //Print Answer to DOM

    const printAnswer = () => {

        //no longer reruns or duplicates value in answer box
        let MXServers = $("input[name=MXServers]:checked").val();
        let IPAddress = $("input[name=IPAddress]:checked").val();
        let Hostnames = $("input[name=hostnames]:checked").val();
        let strict = $("input[name=strict]:checked").val();


        let inputAnswers = [
            yourDomain,
            " ",
            '"v=spf1 ',
            MXServers,
            IPAddress,
            Hostnames,
            strict,
            '"'
        ];


        //relay IP address
        let relayArray = $(relayIPAddress).val().split(' ');

        const hasDot = (address) => {
            return address.includes('.');
        };
        const hasColon = (address) => {
            return address.includes(':');
        };

        let relayArrayIPv6 = relayArray
            .filter(hasColon)
            .map(function (el) {
                return ' ip6:' + el;
            })
            .join(' ');

        let relayArrayIPv4 = relayArray
            .filter(hasDot)
            .map(function (el) {
                return ' ip4:' + el;
            })
            .join(' ');

        if ($(relayIPAddress).val() == 0) {
            //nothing
        } else {
            inputAnswers
                .splice(6, 0, relayArrayIPv4, relayArrayIPv6)
        }



        //relay hostnames
        let relayHostnamesArray = $(relayHostnames).val().split(' ');
        let relayHostnamesArrayAppended = relayHostnamesArray
            .map(function (el) {
                return ' a:' + el; //need regex that toggles ip4 or ip6 if colons are used
            })
            .join(' ');

        if ($(relayHostnames).val() == 0) {
            //nothing
        } else {
            inputAnswers.splice(7, 0, relayHostnamesArrayAppended);
        }

        //relay domains
        let relayDomainsArray = $('#relayDomains').val().split(' ');
        let relayDomainsArrayAppended = relayDomainsArray
            .map(function (el) {
                return ' include:' + el; //need regex that toggles ip4 or ip6 if colons are used
            })
            .join(' ');

        if ($('#relayDomains').val() == 0) {
            //nothing
        } else {
            inputAnswers.splice(8, 0, relayDomainsArrayAppended);
        }


        $(answer).val(inputAnswers.join(''));

    };

});