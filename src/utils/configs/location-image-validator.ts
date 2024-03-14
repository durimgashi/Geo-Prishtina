import { HttpStatus, ParseFilePipeBuilder } from "@nestjs/common"
import { diskStorage } from "multer";

export const multerConfig = {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
            const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('')

            return callback(null, `${randomName}${file.originalname}`)
        }
    }),
    fileFilter: (req, file, callback) => { 
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const ext = file.originalname.split('.').pop().toLocaleLowerCase()

        if (allowedExtensions.includes(ext)) {
            return callback(null, true)
        }
        return callback(new Error('Invalid file type'), false)
    }
}

export const locationImagePipe = 
    new ParseFilePipeBuilder()
    .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    })