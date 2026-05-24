import * as DatabaseService from "@/services/databaseService";

describe("databaseService", () => {
	describe("createDb", () => {
		it("should create cards table", async () => {
			const mockSQLiteDatabase = {
				execAsync: jest.fn(() => Promise.resolve()),
			};

			await DatabaseService.createDb(mockSQLiteDatabase as any);

			expect(mockSQLiteDatabase.execAsync).toHaveBeenCalledWith(
				expect.stringContaining("CREATE TABLE IF NOT EXISTS cards"),
			);
		});
	});
});
