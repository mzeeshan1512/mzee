const authRoutePrefix = "/auth";
const adminRoutePrefix = "/admin";

const authProtect = {
  register: authRoutePrefix + "/sign-up",
  forgotPassword: authRoutePrefix + "/forgot-password",
  resetPassword: authRoutePrefix + "/reset-password",
  verifyEmail: authRoutePrefix + "/verify-email",
};

const authRoutes = {
  login: authRoutePrefix + "/login",
};

const adminRoutes = {
  dashboard: adminRoutePrefix + "/dashboard",
  about: adminRoutePrefix + "/about",
  services: adminRoutePrefix + "/services",
  contact: adminRoutePrefix + "/contact",
  reviews: adminRoutePrefix + "/reviews-feedbacks",
  logs: adminRoutePrefix + "/logs",
  projects: adminRoutePrefix + "/projects",
  technology: adminRoutePrefix + "/technologies",
  icons: adminRoutePrefix + "/icons"
};

const adminAboutPageRoutes = {
  skills: adminRoutes.about + "/skills",
  experience: adminRoutes.about + "/experience",
  education: adminRoutes.about + "/education",
  courses_certification: adminRoutes.about + "/courses-certifications",
  trainings: adminRoutes.about + "/trainings",
  achievements: adminRoutes.about + "/achievements",
};

const Mode = {
  create: "create",
  edit: "edit",
  list: "list",
};

const publicRoutes = {
  home: "/",
  ...authRoutes,
};

const cookiesName = {
  accessToken: "access_token",
  info: "info",
  refreshToken:"refresh_token",
  redirect:"redirect_uri"
};

const ProtectedRoutes = [
  ...Object.values(authProtect),
  ...Object.values(adminRoutes),
  ...Object.values(adminAboutPageRoutes),
];

export {
  publicRoutes,
  authRoutes,
  authRoutePrefix,
  adminRoutes,
  authProtect,
  ProtectedRoutes,
  cookiesName,
  adminRoutePrefix,
  adminAboutPageRoutes,
  Mode,
};
