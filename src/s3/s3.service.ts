import { Injectable, Inject } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Serviço pra fazer upload no bucket 
@Injectable()
export class S3Service {
    constructor(
        @Inject('S3_CLIENT') private readonly s3Client: S3Client,
    ) {}

    async uploadFile(bucket: string, key: string, file: Buffer) {
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: file,
            ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        return this.s3Client.send(command);
    }
}