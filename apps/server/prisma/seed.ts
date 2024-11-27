import { PrismaClient, ProfessionalType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean the database first
  await prisma.professional.deleteMany({});

  const professionals = [
    {
      type: ProfessionalType.Organization,
      orgOrPracId: '1234567',
      username: 'popularhospital',
      name: 'Popular Hospital',
      ranking: 1,
      photo: 'https://example.com/popular-hospital.jpg',
      category: 'Healthcare',
      subCategory: ['Medicine', 'Surgery', 'Cardiology'],
      rating: 4.7,
      totalAppointment: 50000,
      zone: ['Uttara', 'Dhaka'],
      branch: ['Sector 11', 'Sector 13'],
      areaOfPractice: 'Multi-specialty Hospital',
    },
    {
      type: ProfessionalType.Organization,
      orgOrPracId: '1234568',
      username: 'labaid',
      name: 'Labaid Hospital',
      ranking: 2,
      photo: 'https://example.com/labaid.jpg',
      category: 'Healthcare',
      subCategory: ['Medicine', 'Pediatrics'],
      rating: 4.5,
      totalAppointment: 45000,
      zone: ['Dhanmondi', 'Dhaka'],
      branch: ['Road 4', 'Road 6'],
      areaOfPractice: 'General Hospital',
    },
    {
      type: ProfessionalType.Practitioner,
      orgOrPracId: '1234569',
      username: 'dr.rahman',
      name: 'Dr. Abdul Rahman',
      ranking: 1,
      photo: 'https://example.com/dr-rahman.jpg',
      category: 'Doctor',
      subCategory: ['Cardiology'],
      rating: 4.9,
      totalAppointment: 15000,
      zone: ['Uttara', 'Dhaka'],
      branch: ['Popular Hospital', 'Private Chamber'],
      areaOfPractice: 'Cardiology',
    },
    {
      type: ProfessionalType.Practitioner,
      orgOrPracId: '1234570',
      username: 'dr.sarah',
      name: 'Dr. Sarah Ahmed',
      ranking: 2,
      photo: 'https://example.com/dr-sarah.jpg',
      category: 'Doctor',
      subCategory: ['Medicine', 'Diabetes'],
      rating: 4.8,
      totalAppointment: 12000,
      zone: ['Uttara', 'Dhaka'],
      branch: ['Labaid Hospital'],
      areaOfPractice: 'Internal Medicine',
    },
    {
      type: ProfessionalType.Practitioner,
      orgOrPracId: '1234571',
      username: 'dr.karim',
      name: 'Dr. Karim Uddin',
      ranking: 3,
      photo: 'https://example.com/dr-karim.jpg',
      category: 'Doctor',
      subCategory: ['Eye', 'Surgery'],
      rating: 4.6,
      totalAppointment: 8000,
      zone: ['Uttara', 'Dhaka'],
      branch: ['Vision Care Center'],
      areaOfPractice: 'Ophthalmology',
    },
  ];

  for (const professional of professionals) {
    await prisma.professional.create({
      data: professional,
    });
  }

  console.log('Seed data inserted successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
