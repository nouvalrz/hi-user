import Chance from "chance";

export const roles = [
  "Front-end Developer",
  "Back-end Developer",
  "Software Engineer Lead",
  "Project Manager",
  "Platform Engineer",
  "UI/UX Designer",
  "DevOps"
];

export const employmentTypes = ["On Site", "Remote", "Freelance", "Full Time", "Outsource"];

const techPrefixes = [
  'Cloud', 'AI', 'Data', 'Code', 'Dev', 'Cyber', 'Net', 'Auto', 'Sync', 'Bot', 'Smart', 'Neo'
];

const techSuffixes = [
  'ify', 'X', 'Pro', 'Hub', 'Lab', 'Core', 'Flow', 'Stack', 'Works', 'Edge', 'Box', 'Mate'
];

export const populateUserCompact = (user) => {
  const seeder = new Chance(user.email); // seed by email for consitency

  return {

    join_date: seeder.date({ year: 2021 }).toISOString().split("T")[0],
    dob: seeder.birthday({
      string: true,
      year: seeder.year({ min: 1980, max: 2000 }),
    }),
    role: seeder.pickone(roles),
    employment_type: seeder.pickone(employmentTypes),
    phone: seeder.phone({ country: "us", mobile: true }),
    ...user,
  };
};

export const populateUserFull = (user) => {
  const seeder = new Chance(user.email); // seed by email for consitency

  return {

    join_date: seeder.date({ year: 2021 }).toISOString().split("T")[0],
    dob: seeder.birthday({
      string: true,
      year: seeder.year({ min: 1980, max: 2000 }),
    }),
    role: seeder.pickone(roles),
    employment_type: seeder.pickone(employmentTypes),
    phone: seeder.phone({ country: "us", mobile: true }),
    nationality: seeder.country({ full: true }),
    working_start: `${String(seeder.hour({ twentyfour: true })).padStart(2, "0")}:00`,
    working_end: `${String(seeder.hour({ twentyfour: true })).padStart(2, "0")}:00`,
    salary_per_month: seeder.integer({ min: 500, max: 5000 }),
    paid_leave_remaining: seeder.integer({ min: 0, max: 15 }),
    supervisor_name: `${seeder.first()} ${seeder.last()}`,
    project_completed: seeder.integer({ min: 10, max: 30 }),
    projects: Array.from({ length: seeder.integer({ min: 2, max: 6 }) }).map(() => {
      return {
        name: `${seeder.pickone(techPrefixes)} ${seeder.pickone(techSuffixes)}`,
        progress: seeder.integer({ min: 40, max: 95 })
      }
    }),
    today_active_time: seeder.integer({ min: 55, max: 90 }),
    today_worked: seeder.integer({ min: 240, max: 540 }),
    ...user,
  };
};
