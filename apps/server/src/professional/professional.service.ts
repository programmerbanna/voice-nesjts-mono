import { Injectable } from '@nestjs/common';
import { Professional } from '@prisma/client';
import { CreateProfessionalInput } from 'src/common/dto/professional.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ProfessionalService {
  constructor(private prisma: PrismaService) {}

  /**
   * Retrieves all professionals from the database.
   * @returns {Promise<Professional[]>} promise that resolves to an array of professionals.
   */
  async findAll(): Promise<Professional[]> {
    return this.prisma.professional.findMany();
  }

  /**
   * Searches for professionals based on provided keywords.
   * Expands keywords using predefined synonyms and constructs a query to match professionals.
   * @param {string[]} keywords array of keywords to search professionals by.
   * @returns {Promise<Professional[]>} promise that resolves to an array of professionals matching the keywords.
   */
  async searchByKeyword(keywords: string[]): Promise<Professional[]> {
    // Split the first keyword into individual search terms
    const searchTerms = keywords[0].split(' ');

    // Defining these synonyms for keyword expansion
    const synonyms = {
      practitioner: ['doc', 'medic', 'doctor', 'practitioner'],
      organization: ['clinic', 'medical center', 'hospital', 'organization'],
      best: ['top', 'highest rated', 'best'],
    };

    // Expand keywords using synonyms
    const expandedKeywords = searchTerms.flatMap((keyword) => {
      const expanded = [keyword];
      for (const [key, values] of Object.entries(synonyms)) {
        if (values.includes(keyword.toLowerCase())) {
          expanded.push(key);
        }
      }
      return expanded;
    });

    // Determine if the search is for practitioners or organizations
    const isPractitionerSearch = expandedKeywords.some((kw) =>
      synonyms.practitioner.includes(kw.toLowerCase()),
    );
    const isOrganizationSearch = expandedKeywords.some((kw) =>
      synonyms.organization.includes(kw.toLowerCase()),
    );

    // Construct the base query with expanded keywords
    const baseQuery = {
      OR: expandedKeywords.map((kw) => ({
        OR: [
          { name: { contains: kw, mode: 'insensitive' } },
          { subCategory: { has: kw } },
          { zone: { has: kw } },
          { branch: { has: kw } },
          { areaOfPractice: { contains: kw, mode: 'insensitive' } },
        ],
      })),
    };

    // Apply type filter based on search type
    let typeFilter = {};
    if (isPractitionerSearch) {
      typeFilter = {
        type: 'Practitioner',
      };
    } else if (isOrganizationSearch) {
      typeFilter = {
        type: 'Organization',
      };
    }

    // Execute the query and return the results
    const results = await this.prisma.professional.findMany({
      where: {
        AND: [baseQuery, typeFilter],
      },
      orderBy: {
        rating: 'desc',
      },
    });

    return results;
  }

  /**
   * Creates a new professional.
   * @param {CreateProfessionalInput} createProfessionalInput data to create a new professional.
   * @returns {Promise<Professional>} promise that resolves to the created professional.
   */
  async create(
    createProfessionalInput: CreateProfessionalInput,
  ): Promise<Professional> {
    return this.prisma.professional.create({
      data: {
        type: createProfessionalInput.type,
        orgOrPracId: createProfessionalInput.orgOrPracId,
        username: createProfessionalInput.username,
        name: createProfessionalInput.name,
        ranking: createProfessionalInput.ranking,
        photo: createProfessionalInput.photo,
        category: createProfessionalInput.category,
        subCategory: { set: createProfessionalInput.subCategory },
        rating: createProfessionalInput.rating,
        totalAppointment: createProfessionalInput.totalAppointment,
        zone: { set: createProfessionalInput.zone },
        branch: { set: createProfessionalInput.branch },
        areaOfPractice: createProfessionalInput.areaOfPractice,
      },
    });
  }
}
