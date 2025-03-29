const express = require("express");
const routes = require("./../src/routes");
const db  = require("./../src/db");
const request = require("supertest"); 

const app = express();
app.use(express.json());
app.use("/api", routes);

//mocking the test auth and etc.

jest.mock("./../src/auth", () => (req, res, next) => next());

describe("API tests", () => {
    beforeAll((done) => {
        db.serialize(() => {
            db.run("DELETE FROM history", done);

        });
    });


    test("POST /api/query - this should execute the qeury as well sa save it to the history table", async () => {
        const response = await request(app)
            .post("/api/query")
            .send({question: "total revenue?"})
            .expect(200);

            expect(response.body.result).toBeDefined();

    });


    test("GET /api/history - show correct history", async () => {
        const response = await request(app)
            .get("/api/history")
            .expect(200);

            expect(response.body.history.length).toBeGreaterThan(0);

    });

    test("POST /api/query - adding random query shld return not supported", async () => {
        const response = await request(app)
            .post("/api/query")
            .send({ question: "blah blah blah"})
            .expect(400);

            expect(response.body.error).toBe("query not supported.")
    })

})