$('.upload-btn').on('click', function(){
    $('#upload-input').click();
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
});

$('#upload-input').on('change', function(){
    var files = $(this).get(0).files;
console.log(files);

if(files.length > 0){

    var formData = new FormData();

    for(var i = 0; i< files.length; i++){
        var file = files[i];
        console.log('each files ', file);

        formData.append('uploads[]', file, file.name); 
    }
    makeAjaxCall(formData); 
}

});

function makeAjaxCall(formData){
    $.ajax({
        url:'/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
            console.log('upload successful \n' + data);
        }, 
        xhr: function(){
            var xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', function(evt){
                if(evt.lengthComputable){
                    console.log('event length is computable');

                    var percentComplete = evt.loaded/ evt.total;
                    percentComplete = parseInt(percentComplete * 100);

                    $('.progress-bar').text(percentComplete + '%');
                    $('.progress-bar').width(percentComplete + '%');

                    if(percentComplete === 100){
                        $('.progress-bar').html('Done');
                    }
                }
            }, false);
            return xhr;
        }
    });
}

