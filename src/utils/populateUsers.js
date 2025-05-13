import Chance from "chance";

const roles = [
  "Front-end Developer",
  "Back-end Developer",
  "Software Engineer Lead",
  "Project Manager",
  "Platform Engineer",
];
const employmentTypes = ["On Site", "Remote", "Freelance"];

export const populateUserCompact = (user) => {
  const seeder = new Chance(user.email);

  return {
    ...user,
    join_date: seeder.date({ year: 2021 }).toISOString().split("T")[0],
    dob: seeder.birthday({
      string: true,
      year: seeder.year({ min: 1980, max: 2000 }),
    }),
    role: seeder.pickone(roles),
    employment_type: seeder.pickone(employmentTypes),
    phone: seeder.phone({ country: "us", mobile: true }),
  };
};

export const populateUserFull = (user) => {
  const seeder = new Chance(user.email);

  return {
    ...user,
    join_date: seeder.date({ year: 2021 }).toISOString().split("T")[0],
    dob: seeder.birthday({
      string: true,
      year: seeder.year({ min: 1980, max: 2000 }),
    }),
    role: seeder.pickone(roles),
    employment_type: seeder.pickone(employmentTypes),
    phone: seeder.phone({ country: "us", mobile: true }),
    nationality: seeder.country({ full: true }),
    working_start: `${seeder.hour({ twentyfour: true })}:00`,
    working_end: `${seeder.hour({ twentyfour: true }) + 8}:00`,
    salary_per_month: seeder.integer({ min: 500, max: 5000 }) * 1000,
    paid_leave_remaining: seeder.integer({ min: 0, max: 24 }),
    supervisor_name: `${seeder.first()} ${seeder.last()}`,
  };
};
