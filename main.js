jQuery(document).ready(function(){ 

    $.getJSON( "metadata.json", function( data ) {
        let words = data.metadata.asr_word;
        words.forEach(word =>
            $(".words").append(word.word + ' '));
    });

    $("#vidrovr-video").bind(
        "timeupdate", 
        function(event){
          onTrackedVideoFrame(this.currentTime);
    });

    function onTrackedVideoFrame(currentTime){
        $("#current").text(currentTime);
    }

});