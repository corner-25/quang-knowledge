import { execSync } from 'child_process';

const seedFiles = [
  'prisma/seed.ts',
  'prisma/seed2.ts',
  'prisma/seed3.ts',
  'prisma/seed4.ts',
  'prisma/seed5.ts',
  'prisma/seed6.ts',
  'prisma/seed7.ts',
  'prisma/seed8.ts',
  'prisma/seed9.ts',
];

async function runAllSeeds() {
  console.log('🌱 Running all seed files...\n');

  for (const seedFile of seedFiles) {
    console.log(`\n📝 Running ${seedFile}...`);
    try {
      execSync(`npx tsx ${seedFile}`, {
        stdio: 'inherit',
        env: process.env
      });
      console.log(`✅ ${seedFile} completed successfully`);
    } catch (error) {
      console.error(`❌ Error running ${seedFile}:`, error);
      process.exit(1);
    }
  }

  console.log('\n🎉 All seed files completed successfully!');
}

runAllSeeds();
