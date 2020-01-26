import dotenv from "dotenv";
import aws from "aws-sdk";
import fs from "fs-extra";

const init = async () => {
    dotenv.config();

    try {
        aws.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        });
        
        const s3: aws.S3 = new aws.S3();

        fs.readdirSync('./tools/s3/').forEach(async (file) => {
            if (file.indexOf('.md') !== -1) {
                await s3.putObject({
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: file,
                    Body: `./tools/s3/${file}`
                }).promise();

                console.log(`Uploaded file: ${file}`);
            }
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
}

init().then(() => {
    console.log("Files imported successfully" );
}).catch(() => {
    console.log("Error at moment to import files");
});
