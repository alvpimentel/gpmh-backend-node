import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';

@Module({
  providers: [
    S3Service,
    {
      provide: 'S3_CLIENT',
      useFactory: (): S3Client => {
        if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
          throw new Error('AWS não configurada no .env');
        }

        const config: S3ClientConfig = {
          region: process.env.AWS_REGION || 'sa-east-1',
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
        };

        return new S3Client(config);
      },
    },
  ],
  exports: [S3Service],
})
export class S3Module {}