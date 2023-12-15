import { Injectable } from "@nestjs/common";
import * as Jimp from "jimp";
import * as AWS from "aws-sdk";

@Injectable()
export class ImgcompressService {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: "AKIAYCY7LW3IVD3BX3WJ",
      secretAccessKey: "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",
      region: "ap-south-1",
    });
  }

  async imgCompressAndUpload(imageBuffer: Buffer): Promise<any> {
    try {
      if (!imageBuffer || imageBuffer.length === 0) {
        throw new Error("Invalid image buffer.");
      }
      const image = await Jimp.read(imageBuffer);
      image.quality(80);
      const compressedImageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
      const bucketName = "bairuha-bucket";
      const dirName = "goldmulti/products";
      const params = {
        Bucket: bucketName,
        Key: `${dirName}/${Date.now()}.jpg`,
        Body: compressedImageBuffer,
        ACL: "public-read",
      };
      const data = await this.s3.upload(params).promise();
      return data;
    } catch (error) {
      console.error("Error compressing and uploading image:", error);
      throw error;
    }
  }

  async uploadToS3(file: Express.Multer.File): Promise<string> {
    try {
      const bucketName = "bairuha-bucket";
      const dirName = "goldmulti/products";
      const params = {
        Bucket: bucketName,
        Key: `${dirName}/${file.originalname}`,
        Body: file.buffer,
        ACL: "public-read",
      };
      const data = await this.s3.upload(params).promise();
      return data.Location;
    } catch (error) {
      console.error("Error uploading to S3:", error);
      throw error;
    }
  }
  async deleteFromS3(key: string) {
    try {
      const bucketName = "bairuha-bucket";
      const params = {
        Bucket: bucketName,
        Key: key,
      };
      const image = await this.s3.headObject(params).promise();
      const deleted = await this.s3.deleteObject(params).promise();
      return deleted;
    } catch (err) {
      throw new Error("Failed to Remove Image from S3");
    }
  }
}
