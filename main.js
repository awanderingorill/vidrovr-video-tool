jQuery(document).ready(function(){ 

    let words = [];
    let currentWord = '';

    $.getJSON( "metadata.json", function( data ) {
        words = data.metadata.asr_word;
        words.forEach(word =>
            $(".words").append(word.word + ' '));
    });

    $("#vidrovr-video").bind(
        "timeupdate", 
        function(event){
          onTrackedVideoFrame(this.currentTime);
    });

    function onTrackedVideoFrame(currentTime){
        words.forEach((word) => {
            if (currentTime >= word.start && currentTime <= word.end){
                $(".current-word").html(word.word);
            }
        })
    }

});