import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "policies/create",
    pathMatch: "full",
  },
  {
    path: "policies/create",
    loadComponent: () =>
      import(
        "./features/policies/pages/policy-form/policy-form"
      ).then((component) => component.PolicyForm),
  },
  {
    path: "policies/list",
    loadComponent: () =>
      import(
        "./features/policies/pages/policy-list/policy-list"
      ).then((component) => component.PolicyList),
  },
  {
    path: "**",
    redirectTo: "policies/create",
  },
];