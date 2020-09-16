jQuery(document).ready(function(){ 

    let words = [];
    let currentWord = "";

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
                currentWord = word.word;
                $(".words:contains('"+currentWord+"')").each( function( i, element ) {
                    var content = $(element).text();
                    content = content.replace( currentWord, '<strong>' + currentWord + '</strong>' );
                    $(element).html(content);
               });
                // $(".words").replace(word.word, "<strong> + word.word + </strong>");
                // currentWord = word.word;
                // $(".current-word").html(currentWord);
            }
        })
    }

});