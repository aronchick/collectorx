const request = require("supertest");
const app = require("../index");
var expect = require('chai').expect
describe("GET /", () => {
    it("respond with default webpage", (done) => {
        request(app)
            .get("/")
            .expect(200)
            .expect("Content-Type", /text\/html/)
            .end((err, res) => {
                    if (err)
                        done(err);
                    expect(res.text).to.contain('Capture');
                });
        done();
    })
});