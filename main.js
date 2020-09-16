jQuery(document).ready(function(){ 

    let words = [];
    let currentWords = [];
    let currentWord = "";
    let lowRange = 0;
    let highRange = 50;

    // Fetch data and attach to DOM
    $.getJSON("metadata.json", function(data) {
        words = data.metadata.asr_word;
        currentWords = words.slice(lowRange, highRange);
        currentWords.forEach(word =>
            $(".words").append(word.word + ' '));
    });

    // Create event listener for video
    $("video").bind(
        "timeupdate", 
        function(event){
          highlightCurrentWord(this.currentTime);
    });

    // Highlight current word
    function highlightCurrentWord(currentTime){
        let lastWordIndex = currentWords.length - 1;
        currentWords.forEach((word) => {
            if (currentTime >= word.start && currentTime <= word.end){
                currentWord = word.word;
                $(".words:contains('"+currentWord+"')").each( function( i, element ) {
                    var content = $(element).text();
                    content = content.replace( currentWord, '<strong>' + currentWord + '</strong>' );
                    $(element).html(content);
               });
               if (currentWord === currentWords[lastWordIndex].word) {
                    lowRange = lowRange + 50;
                    highRange = highRange + 50;
                    $.getJSON("metadata.json", function(data) {
                        words = data.metadata.asr_word;
                        currentWords = words.slice(lowRange, highRange);
                        currentWords.forEach(word =>
                            $(".words").append(word.word + ' '));
                    });
                }
            }
        })
    }

    // Update text blurb
    function updateTextBlurb(){
        console.log("hello");
    }

});