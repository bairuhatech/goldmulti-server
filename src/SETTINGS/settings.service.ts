import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Settings } from "./settings.entity";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { CreateSettingsDto } from "./dto/createSettings.dto";
import { UpdateSettingsDto } from "./dto/updateSettings.dto";

@Injectable()
export class SettingsService {
  constructor(
    @Inject("SettingsRepository")
    private readonly SettingsRepository: typeof Settings
  ) {}

  async findAll() {
    try {
      const data = await this.SettingsRepository.findOne({});
      return new DataResponseDto(data, true, "Successfully Fetched");
    } catch (err) {
      return new DataResponseDto([], false, err.message);
    }
  }

  async update(id: number, data: UpdateSettingsDto) {
    try {
      const settings = await Settings.findByPk(id);
      if (!settings)
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      settings.type = data.type;
      settings.isLocation = data.isLocation;
      settings.currency = data.currency;
      settings.adminEmail = data.adminEmail;
      settings.supportInfoEmail = data.supportInfoEmail;
      settings.contactEmail = data.contactEmail;
      settings.contactNumber = data.contactNumber;
      settings.address = data.address;
      const updated = await settings.save();
      return new DataResponseDto(updated, true, "Successfully Updated");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async getAdminEmail() {
    try {
      const settings = await this.SettingsRepository.findOne({});
      return settings.adminEmail;
    } catch (err) {
      console.log("email not found")
      return null;
    }
  }
}
