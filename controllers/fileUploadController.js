var multer = require('multer');


  exports.fileUploadController = (req, res, next) => {
    console.log(req.file);
      const file = req.file
      console.log(file);
      if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error);
      }
     res.send(file)
    }  