var new_num = 40; // global variable
jQuery(document).ready(function(){ 

    $.getJSON( "metadata.json", function( data ) {
        let words = data.metadata.asr_word;
        // console.log(words);
        words.forEach(word =>
            $(".words").append(word.word + ' '));

        // $.each( data, function( key, val ) {
        //   items.push( "<li id='" + key + "'>" + val + "</li>" );
        // });
       
        // $( "<ul/>", {
        //   "class": "my-new-list",
        //   html: items.join( "" )
        // }).appendTo( "body" );
      });

});