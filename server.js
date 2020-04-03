const express = require('express')
const fileUploader = require('express-fileupload')
const app = new express()
const cors = require('cors')

app.use(fileUploader())
app.use(cors())

app.get('/getProfileImage/:upload/:fileName', (req, res) => {

    try {
        console.log(req.params)
        let filePath = req.params.upload + '/' + req.params.fileName;
        console.log('GetImage', filePath)
        return res.sendFile(`${__dirname}/` + filePath);
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
});
console.log('watching')
app.post('/upload', (req, res) => {

    var file = req.files.file;

    console.log('Selected File ', file)
    if (!req.files)
        return res.status(400).json({ msg: 'File Not Selected' })
    console.log('NUll ? ', file == null)
    file.name = file.md5 + '.png'
    console.warn(`${__dirname}\\uploads\\${file.name}`)
    file.mv(`${__dirname}\\uploads\\${file.name}`, err => {
        if (err) {
            console.log(err);
            return res.status(500).json({ msg: 'file directory not exists' })
        }
        console.warn('-->UploadedFile : ', file);
        return res.status(200).json({ fileName: file.name, filePath: '/uploads/' + `${file.name}` })

    });

});

app.listen(5000, () => console.log('Server running on port 5000'))