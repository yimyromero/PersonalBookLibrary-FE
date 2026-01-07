import { expect, test } from "vitest";
import { isValidPassword } from "../utils/checkPassword";

test("accepts valid passwords", () => {
	expect(isValidPassword("1dkfdj#!")).toBe(true);
	expect(isValidPassword("hdD@3Mkdf")).toBe(true);
});

test("rejects password without number", () => {
	expect(isValidPassword("kmkCml@WYc,")).toBe(false);
});

test("rejects password without a special char", () => {
	expect(isValidPassword("1dIoMiPGk")).toBe(false);
});

test("rejects password with invalid length", () => {
	expect(isValidPassword("!d3kM")).toBe(false);
});
