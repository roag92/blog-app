export class BucketObject {
    constructor(
        public Key: string,
        public LastModified: string,
        public ETag: string,
        public Size: number,
        public StorageClass: string
    ) {}
}
