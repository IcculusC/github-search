import Search from "./modules/search";
import Detail from "./modules/detail";

export default [
  {
    component: Search,
    exact: true,
    path: "/"
  },
  {
    component: Detail,
    path: "/repo/:owner/:name"
  },
  {
    component: Search
  }
];
