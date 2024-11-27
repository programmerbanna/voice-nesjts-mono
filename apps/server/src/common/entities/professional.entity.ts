import { ProfessionalType } from '@prisma/client';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

registerEnumType(ProfessionalType, {
  name: 'ProfessionalType',
});

@ObjectType()
export class Professional {
  @Field(() => ID)
  id: string;

  @Field(() => ProfessionalType)
  type: ProfessionalType;

  @Field()
  orgOrPracId: string;

  @Field()
  username: string;

  @Field()
  name: string;

  @Field()
  ranking: number;

  @Field()
  photo: string;

  @Field()
  category: string;

  @Field(() => [String])
  subCategory: string[];

  @Field()
  rating: number;

  @Field()
  totalAppointment: number;

  @Field(() => [String])
  zone: string[];

  @Field(() => [String])
  branch: string[];

  @Field()
  areaOfPractice: string;
}
