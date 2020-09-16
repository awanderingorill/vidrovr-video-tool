jQuery(document).ready(function(){ 

    // TODO: ALLOW FOR SCRUBBING BACKWARDS
    // TODO: FIX BUG THAT HIGHLIGHTS THE INCORRECT VERSION OF THE WORD
    // TODO: IMPLEMENT ANIMATIONS
    // TODO: FIX BUG THAT SKIPS OVER WORDS
    // TODO: FIX BUG THAT STOPS LOADING WORDS AFTER THIRD ROUND

    let words = [];
    let currentWords = [];
    let currentWord = "";
    let lowerLimit = 0;
    let higherLimit = 50;

    // Fetch data and attach to DOM
    $.getJSON("metadata.json", function(data) {
        words = data.metadata.asr_word;
        currentWords = words.slice(lowerLimit, higherLimit);
        currentWords.forEach(word =>
            $(".words").append(word.word + " "));
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
                    content = content.replace(currentWord, "<strong>" + currentWord + "</strong>");
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
        lowerLimit = lowerLimit + 50;
        higherLimit = higherLimit + 50;
        $.getJSON("metadata.json", function(data) {
            words = data.metadata.asr_word;
            currentWords = words.slice(lowerLimit, higherLimit);
            currentWords.forEach(word =>
            $(".words").append(word.word + " "));
        });
    }

});