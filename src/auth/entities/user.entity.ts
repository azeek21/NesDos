import { User } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
export class userEntity {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  id: number;
}

export class logoutEntity {
  @ApiProperty()
  success: true;
}
