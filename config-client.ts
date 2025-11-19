import { fillDefault, optional } from "./helpers/env-utils";

const client = {
  appName: fillDefault(process.env.appName, "OhMyGPT"),
  appLogo: optional(process.env.appLogo),
  appThemeColor: fillDefault(process.env.appThemeColor, "#22c55e"),
  appSummary: fillDefault(process.env.appSummary, "Ask me any thing you want."),
  exampleInput: fillDefault(process.env.exampleInput, "Ask me any thing."),
};

export default client;
