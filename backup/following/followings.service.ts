import { User } from "../user/user.entity";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { CreateFollowingDto } from "./dto/create-following.dto";
import { Following } from "./following.entity";
import { FollowingDto } from "./dto/following.dto";
import { UpdateFollowingDto } from "./dto/update-following.dto";

@Injectable()
export class FollowingsService {
  constructor(
    @Inject("FollowingsRepository")
    private readonly followingsRepository: typeof Following
  ) {}

  async findAll() {
    const followings = await this.followingsRepository.findAll<Following>();
    return followings.map((following) => new FollowingDto(following));
  }

  async findOne(id: number) {
    const following = await this.followingsRepository.findByPk<Following>(id, {
      include: [User],
    });
    if (!following) {
      throw new HttpException("No following found", HttpStatus.NOT_FOUND);
    }
    return new FollowingDto(following);
  }

  async create(userId: string, data: CreateFollowingDto) {
    const following = new Following();
    following.user_id = data.user_id;
    following.profile_id = data.profile_id;

    return following.save();
  }
}
