import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import {promisify} from "util";
import stream from "stream";

const pipeline = promisify(stream.pipeline);
const Bucket = process.env.Bucket;
const client = new S3Client({});

export const handler = awslambda.streamifyResponse(async (event, responseStream, _context) => {
     const response = await client.send(
          new GetObjectCommand({ Bucket, Key: decodeURIComponent(event.queryStringParameters.file.replace(/\+/g, ' ')) })
     );
     await pipeline(response.Body.transformToWebStream(), responseStream);
});
