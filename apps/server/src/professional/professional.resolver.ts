import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfessionalService } from './professional.service';
import { Professional } from 'src/common/entities/professional.entity';
import { CreateProfessionalInput } from 'src/common/dto/professional.dto';

/**
 * Resolver for handling GraphQL operations related to professionals.
 */
@Resolver(() => Professional)
export class ProfessionalResolver {
  /**
   * Constructor to inject the ProfessionalService.
   */
  constructor(private readonly professionalService: ProfessionalService) {}

  /**
   * Query to retrieve all professionals.
   * @returns {Promise<Professional[]>} promise that resolves to an array of professionals.
   */
  @Query(() => [Professional])
  async getProfessionals() {
    return this.professionalService.findAll();
  }

  /**
   * Query to search professionals by a keyword.
   * @param {string} keyword to search professionals by.
   * @returns {Promise<Professional[]>} promise that resolves to an array of professionals matching the keyword.
   */
  @Query(() => [Professional])
  async searchProfessionals(@Args('keyword') keyword: string) {
    return this.professionalService.searchByKeyword([keyword]); // Convert keyword to an array
  }

  /**
   * Mutation to add a new professional.
   * @param {CreateProfessionalInput} createProfessionalInput of the professional to be added.
   * @returns {Promise<Professional>} promise that resolves to the created professional.
   */
  @Mutation(() => Professional)
  async createProfessional(
    @Args('createProfessionalInput')
    createProfessionalInput: CreateProfessionalInput,
  ) {
    return this.professionalService.create(createProfessionalInput);
  }
}
