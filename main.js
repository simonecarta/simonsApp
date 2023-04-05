$(document).ready(function () {
    
    /**
     * REFERENCES 
     */

    var inputMessage = $(".inputMessage");
    var inputMessageValue = inputMessage.tostring;
    var microphoneIcon = $("i.fa-solid.fa-microphone.fa-lg")
    var sendIcon = $("i.fa-sharp.fa-solid.fa-paper-plane.fa-lg")
    var searchText = $(".chatSearch")
    var chevronDown = $(".fa-solid.fa-chevron-down.fa-sm");
    var chevronDownB =$(".fa-solid.fa-chevron-down.fa-sm");

    /**
     * FUNCTIONS 
     */

    // Changing icon when input's value changes
   inputMessage.keyup(function(){
    if ( inputMessageValue !== "") {
        microphoneIcon.addClass("nv");
        sendIcon.removeClass("nv")
    } else if (inputMessageValue === " "){
        sendIcon.addClass("nv");
    } 
    })

    // Detect new message sent 
        // With icon
        sendIcon.click(function(){
            sendMessage(inputMessage);
        })

        // With enter 
        inputMessage.keypress(function(e) {
            if(e.which == 13){
                sendMessage(inputMessage);
            }
        })

    
    // Main function to send message
    function sendMessage(input){
        // ottieni testo
        var testoMessaggio = input.val().trim();
        
        // Checking content
        if(testoMessaggio != ""){

            //Clone template
            var nuovoMessaggio = $(".template .message.sent").clone();
            
            // Adding text in messages
            nuovoMessaggio.children('.message-text').text(testoMessaggio)

            // Creating date 
            var data = new Date();
            var ora = addZero(data.getHours());
            var minuti = addZero(data.getMinutes());
            var orario = ora + ":" + minuti;
            nuovoMessaggio.children('.message-time').text(orario)

            // Adding new mnessage in active's chat
            $(".right-messages.active").append(nuovoMessaggio)

            // Reset input message 
            inputMessage.val("")

            // Autoreply 
            autoReply()

            // Scroll
            scrollMessaggio()

    }}

    // Function to add zero at minute/hours 
    function addZero (numero){
        if(numero < 10){
            numero = "0" + numero
        }
        return numero
    }

    // Autoreply after 1 second 
    function autoReply (){

        setTimeout(function(){

            // message clone
            var autoResponse = $(".template .received").clone();

            // adding text in messages
            autoResponse.children('.message-text').text("Questa è una risposta automatica");
            
            // actual hours at response
            var data = new Date();
            var ora = addZero(data.getHours());
            var minuti = addZero(data.getMinutes());
            var orario = ora + ":" + minuti;

            autoResponse.children('.message-time').text(orario)

            // adding new mnessage in active's chat
            $(".right-messages.active").append(autoResponse)

            // SCROLL 
            scrollMessaggio()

        },1000)
    }

   // Searching contact
    searchText.keyup(function(){

        // Input's value
        var search = $(this).val().trim().toLowerCase();

        $(".contact").each(function(){
            var nomeContatto = $(this).find("h3").text().toLowerCase();

            // Verify input with names
            if( nomeContatto.includes(search)){
                $(this).show();
            } else {
                $(this).hide()
            }
        })
    })

    // Scroll at last messages
    function scrollMessaggio(){
        var chatScroll = $(".right-messages.active").height();
    
        $(".main-chat").animate({
            scrollTop: chatScroll
        }, 300);
    }

    // Deleting messages 

    // Reference to chevron down
    $(document).on("click", ".fa-solid.fa-chevron-down.fa-sm", chevronDownClick);

    function chevronDownClick(){
        $(this).next().toggle();
    }
    
    // Reference to delete message options
    $(document).on("click", ".deleteMessage", deleteThis);

    function deleteThis(){
        $(this).parents(".message").remove();
    }

    // Navigation between chats
    $(".contact").click(function(){
        var contact = $(this).attr("data-conversazione");

        $('.right-messages').removeClass('active');

        $('.right-messages[data-conversazione="' + contact + '"]').addClass('active');
    })

}); //end doc ready