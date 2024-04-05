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
  { label: "home", path: "/" },
  { label: "offers", path: "#offers" },
  { label: "about", path: "#about" },
];

export const PAGE_LIMIT = 5;
