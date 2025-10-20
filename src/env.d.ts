/// <reference types="vite/client" />
declare module "*.vue" {
  import type { DefineComponent } from "vue-router";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
