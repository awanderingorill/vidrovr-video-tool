jQuery(document).ready(function(){ 

    // TODO: ALLOW FOR SCRUBBING BACKWARDS
    // TODO: FIX BUG THAT HIGHLIGHTS THE INCORRECT VERSION OF THE WORD
    // TODO: IMPLEMENT ANIMATIONS

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
        currentWords.forEach((word, index) => {
            if (currentTime >= word.start && currentTime <= word.end){
                currentWord = word.word;
                $(".words").each(function(i, element) {
                    var content = $(element).text();
                    content = content.replace(currentWord, '<strong>' + currentWord + '</strong>');
                    $(element).html(content);
               });
                // If it's the last word, update the text blurb 
               if (index + 1 === currentWords.length){
                   updateTextBlurb();
               }
            }
        })
    }

    // Update text blurb
    function updateTextBlurb(){
        $(".words").empty();
        lowRange = lowRange + 50;
        highRange = highRange + 50;
        $.getJSON("metadata.json", function(data) {
            words = data.metadata.asr_word;
            currentWords = words.slice(lowRange, highRange);
            currentWords.forEach(word =>
            $(".words").append(word.word + ' '));
        });
    }

});