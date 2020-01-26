import { S3 } from "aws-sdk";
import { Post } from "../model/blog";
import { BucketObject } from "../model/object";

export class S3Service {

    constructor(private s3: S3, private bucket: string) {}

    async listObjects(): Promise<Post[]> {
        const data: any = await this.s3.listObjectsV2({Bucket: this.bucket, MaxKeys: 10}).promise();

        if (!data) {
            return [];
        }

        const posts: Post[] = [];

        data.Contents.forEach((bucketObject: BucketObject, index: number) => {
            posts.push(
                new Post(
                    index+1,
                    bucketObject.Key,
                    `https://${this.bucket}.s3.amazonaws.com/${bucketObject.Key}`
                )
            );
        });

        return posts;
    }
}
