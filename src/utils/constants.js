export const ROUTES = {
  admin: [
    "overview",
    "supervisors",
    "supervisors/:id",
    "interns",
    "interns/:id",
    "teams",
    "absences",
    "offers",
    "demands",
    "projects",
  ],
  supervisor: ["overview", "interns", "teams", "absences", "projects"],
  intern: ["overview", "absences"],
};
export const routes = [
  { label: "home", path: "home" },
  { label: "offers", path: "home" },
  { label: "about", path: "home" },
];

export const PAGE_LIMIT = 5;
