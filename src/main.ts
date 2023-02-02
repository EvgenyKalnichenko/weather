import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { defineRule } from "vee-validate";
import * as rules from "@vee-validate/rules";

Object.keys(rules)
  .filter((k) => k !== "default")
  .forEach((rule) => {
    // @ts-ignore
    defineRule(rule, rules[rule]);
    //   console.log(rule);
  });

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());

app.mount("#app");
