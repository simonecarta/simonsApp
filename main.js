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

    // changing icon when input's value changes
   inputMessage.keyup(function(){
    if ( inputMessageValue !== "") {
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

    
    // Main function to send message
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
            var ora = addZero(data.getHours());
            var minuti = addZero(data.getMinutes());
            var orario = ora + ":" + minuti;
            nuovoMessaggio.children('.message-time').text(orario)

            // aggiunta nuovo messaggio al contenitore attivo
            $(".right-messages.active").append(nuovoMessaggio)

            // reset input messaggio 
            inputMessage.val("")

            // risposta automatica utente 
            autoReply()

            // SCROLL
            scrollMessaggio()

    }}

    // function to add zero at minute/hours 
    function addZero (numero){
        if(numero < 10){
            numero = "0" + numero
        }
        return numero
    }

    // Autoreply after 1 second 
    function autoReply (){

        setTimeout(function(){

            // clonazione del messaggio
            var autoResponse = $(".template .received").clone();

            // aggiunta del testo al messaggio
            autoResponse.children('.message-text').text("Questa è una risposta automatica");
            
            // aggiunta dell'ora attuale alla risposta
            var data = new Date();
            var ora = addZero(data.getHours());
            var minuti = addZero(data.getMinutes());
            var orario = ora + ":" + minuti;

            autoResponse.children('.message-time').text(orario)

            // aggiunta nuovo messaggio al contenitore attivo
            $(".right-messages.active").append(autoResponse)

            // SCROLL 
            scrollMessaggio()

        },1000)

    }

   // Searching contact
    searchText.keyup(function(){

        //valore input
        var search = $(this).val().trim().toLowerCase();

        // nome contatto nel loop
        $(".contact").each(function(){
            var nomeContatto = $(this).find("h3").text().toLowerCase();

            // verifica input con nomi contatti
            if( nomeContatto.includes(search)){
                $(this).show();
            } else {
                $(this).hide()
            }
        })
    })

    // Scroll all'ultimo messaggio inserito
    function scrollMessaggio(){
        var chatScroll = $(".right-messages.active").height();
        

        $(".main-chat").animate({
            scrollTop: chatScroll
        }, 300);
    }


    /**
     *  ELIMINAZIONE DEI MESSAGGI
     * 
     * 1) Prendere la referenza della chevron down
     * 2) Creare il menu pop-up in HTML/CSS (info - delete)
     * 3) Bindare al click del menu il show/hide - toggle 
     * 3.1) Prendere la referenza del menu popup 
     * n) Al click di QUELLA cancellare il parente 
     * 
     */


    // Referenza chevron down
    $(document).on("click", ".fa-solid.fa-chevron-down.fa-sm", chevronDownClick)

    // Referenza popup menu
    $(document).on("click", ".popupmenu", popupmenuClick)

    
    
    function chevronDownClick(){
        console.log("chevron")
    }

    function popupmenuClick(){
        console.log("popupmenu")
    }
   
}); //end doc ready