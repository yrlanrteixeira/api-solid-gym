import { Environment } from "vitest";

export default <Environment>{
  name: "prisma",
  transformMode: "web",
  async setup() {
    console.log("Setting up Prisma Test Environment...");

    return {
      teardown() {
        console.log("Tearing down Prisma Test Environment...");
      },
    };
  },
};
