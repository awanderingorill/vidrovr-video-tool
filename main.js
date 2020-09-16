jQuery(document).ready(function(){ 

    // TODO: ALLOW FOR SCRUBBING BACKWARDS
    // TODO: FIX BUG THAT HIGHLIGHTS THE INCORRECT VERSION OF THE WORD
    // TODO: IMPLEMENT ANIMATIONS

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
            let tolerance = 0.2;
            if (currentTime >= word.start - tolerance && currentTime <= word.end + tolerance){
                currentWord = word.word;
                $(".words").each(function(i, element) {
                    let content = $(element).text();
                    content = content.replace(currentWord, "<strong>" + currentWord + "</strong>");
                    $(element).html(content);
               });
                // If it's the last word, update the text blurb 
               if (index + 1 === currentWords.length){
                   updateTextBlurb();
               }
               return;
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