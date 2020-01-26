import aws from 'aws-sdk';

import { S3Service } from '../service/s3-service';

let _instance: S3Service = null;

export function getS3() {
    if (!_instance) {
        aws.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        });

        _instance = new S3Service(new aws.S3(), process.env.AWS_S3_BUCKET);
    }

    return _instance;
}
