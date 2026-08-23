import { describe, expect, it } from "vitest";
import { mockContacts } from "../data/mockContacts";
import { filterContacts } from "./filterContacts";

describe("filterContacts", () => {
  it("filters contacts by search term", () => {
    const result = filterContacts(
      mockContacts,
      "Amelia",
      "all",
    );

    expect(result).toHaveLength(1);
    expect(result[0].fullName).toBe("Amelia Stone");
  });

  it("filters contacts by lifecycle stage", () => {
    const result = filterContacts(
      mockContacts,
      "",
      "customer",
    );

    expect(result).toHaveLength(1);
    expect(result[0].stage).toBe("customer");
  });

  it("combines search and stage filters", () => {
    const result = filterContacts(
      mockContacts,
      "Northstar",
      "qualified",
    );

    expect(result).toHaveLength(1);
    expect(result[0].company).toBe("Northstar Capital");
  });
});