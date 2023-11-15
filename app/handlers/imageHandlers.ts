import { successResponse } from "../utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid'
const S3Client = new S3();
export const imageUploader = async (event: APIGatewayProxyEventV2) => {
    //grab the file name from query string
    const file = event?.queryStringParameters.file;
    //give unique name to the file
    const filename = `${uuid()}__${file}`
    //create s3 params
    const filetype = file.split('.')[1];
    const s3Params = {
        Bucket: process.env.BUCKET_NAME,
        Key: filename,
        ContentType: `image/${filetype}`
    }
    //create signed url
    const url = await S3Client.getSignedUrlPromise("putObject", s3Params)
    //give it back to the client to upload image

    const data = {
        url,
        Key: filename
    }
    console.log(data);
    return successResponse(data);
}