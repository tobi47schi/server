var multer = require('multer');


  exports.fileUploadController = (req, res, next) => {
    res.send(req.file)

    /** The original name of the uploaded file
        stored in the variable "originalname". **/
    var target_path = 'uploads/' + req.file.originalname;
  
    /** A better way to copy the uploaded file. **/
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    src.on('end', function() { res.render('complete'); });
    src.on('error', function(err) { res.render('error'); });
}  