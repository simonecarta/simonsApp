$(document).ready(function () {
    
    // reference input message
    var inputMessage = $(".inputMessage");
    var inputMessageValue = inputMessage.tostring;
    var microphoneIcon = $("i.fa-solid.fa-microphone.fa-lg")
    var sendIcon = $("i.fa-sharp.fa-solid.fa-paper-plane.fa-lg")


    // changing icon when input's value changes
   inputMessage.keyup(function(){
    if ( inputMessageValue != "") {
        microphoneIcon.addClass("nv");
        sendIcon.removeClass("nv")
    } else if (inputMessageValue === " "){
        sendIcon.addClass("nv");
    } 
    })

    // detect new message sent 

    //with icon
    sendIcon.click(function(){
        sendMessage(inputMessage);
    })


    //with enter 
    inputMessage.keypress(function(e) {
        if(e.which == 13){
            sendMessage(inputMessage);
        }
    })


    /**
     * FUNCTIONS 
     */


    function sendMessage(input){
        // ottieni testo
        var testoMessaggio = input.val().trim();
        
        
        // controllo contenuto
        if(testoMessaggio != ""){
            //clone template
            var nuovoMessaggio = $(".template .message.sent").clone();
            
            //aggiunta testo al messaggio
            nuovoMessaggio.children('.message-text').text(testoMessaggio)

            //creazione e inserimento ora attuale
            var data = new Date();
            var ora = data.getHours();
            var minuti = data.getMinutes();
            var orario = ora + ":" + minuti;
            nuovoMessaggio.children('.message-time').text(orario)

            // aggiunta nuovo messaggio al contenitore attivo
            $(".right-messages.active").append(nuovoMessaggio)

            // reset input messaggio 
            inputMessage.val("")

    }}


}); //end doc ready