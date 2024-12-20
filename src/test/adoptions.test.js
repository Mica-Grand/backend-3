import request from "supertest";
import { expect } from "chai";
import app from "../app.js"
import {
    adoptionsService,
    petsService,
    usersService,
} from "../services/index.js";

describe("Adoptions API Tests", () => {
    let userId, petId, adoptionId;

    before(async () => {

        const user = await usersService.create({
            first_name: "Test",
            last_name: "User",
            email: "test@example.com",
            password: "XXXXXXXXXXXX"
        });
        userId = user._id;

        const pet = await petsService.create({ 
            name: "TestPet",
            specie: "cat", 
            adopted: false 

        });
        petId = pet._id;
    });

    after(async () => {
        await usersService.delete(userId);
        await petsService.delete(petId);
        if (adoptionId) await adoptionsService.delete(adoptionId);
    });

    describe("GET /api/adoptions", () => {
        it("should return all adoptions", async () => {
            const res = await request(app).get("/api/adoptions");
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal("success");
            expect(res.body.payload).to.be.an("array");
        });
    });

    describe("GET /api/adoptions/:aid", () => {
        it("should return an adoption by ID", async () => {
            const adoption = await adoptionsService.create({
                owner: userId,
                pet: petId,
            });
            adoptionId = adoption._id;

            const res = await request(app).get(`/api/adoptions/${adoptionId}`);
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal("success");
            expect(res.body.payload).to.have.property("_id", adoptionId.toString());
        });

        it("should return 404 if adoption is not found", async () => {
            const res = await request(app).get("/api/adoptions/invalidId123");
            expect(res.status).to.equal(404);
            expect(res.body.status).to.equal("error");
            expect(res.body.error).to.equal("Adoption not found");
        });
    });

    describe("POST /api/adoptions/:uid/:pid", () => {
        it("should create an adoption", async () => {
            const res = await request(app).post(`/api/adoptions/${userId}/${petId}`);
            console.log(`Creating adoption... owner ${userId}, pet ${petId} `); //sone stos valores los que no trae en el test y por eo no puede crear la adoption
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal("success");
            expect(res.body.message).to.equal("Pet adopted");

            const user = await usersService.getUserById(userId);
            const petIds = user.pets.map(pet => pet._id.toString());
            expect(petIds).to.include(petId.toString());
            const pet = await petsService.getPetById(petId);
            expect(pet.adopted).to.be.true;
            console.log("Pet owner after adoption:", pet.owner);
            expect(pet.owner.toString()).to.equal(userId.toString());
        });

        it("should return 404 if user is not found", async () => {
            const res = await request(app).post(
                `/api/adoptions/1114d19258d4903adddca664/${petId}`
            );
            expect(res.status).to.equal(404);
            expect(res.body.status).to.equal("error");
            expect(res.body.error).to.equal("user Not found");
        });

        it("should return 404 if pet is not found", async () => {
            const res = await request(app).post(
                `/api/adoptions/${userId}/1114d19258d4903adddca664`
            );
            expect(res.status).to.equal(404);
            expect(res.body.status).to.equal("error");
            expect(res.body.error).to.equal("Pet not found");
        });

        it("should return 400 if pet is already adopted", async () => {
            await petsService.update(petId, { adopted: true, owner: userId });
            const res = await request(app).post(`/api/adoptions/${userId}/${petId}`);
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal("error");
            expect(res.body.error).to.equal("Pet is already adopted");
        });
    });
});
