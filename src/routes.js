import Search from "./modules/Search";
import Detail from "./modules/Detail";

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
