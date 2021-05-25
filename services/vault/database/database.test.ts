import { Database } from "./database"
import { PrismaClient, Transaction } from "@prisma/client"
import { Time } from "pkg/time"
const prisma = new PrismaClient()
const db = new Database()
afterAll(async (done) => {
  await db.close()

  await prisma.$disconnect()
  done()
})

beforeEach(async () => {
  await prisma.transaction.deleteMany()
})

describe("transactions", () => {
  describe("setTransaction()", () => {
    describe("when transaction does not exist yet", () => {
      it("saves a new transaction in the database", async () => {
        const transaction = {
          userId: "andreas",
          quantity: 1,
          value: 1.0,
          executedAt: new Time(2020, 1, 1).unix(),
          assetId: "prfl",
        } as Transaction
        const id = await db.setTransaction(transaction)
        expect(id).not.toBeNull()
        const savedTransactions = await prisma.transaction.findMany({
          where: { userId: transaction.userId },
        })
        expect(savedTransactions.length).toBe(1)
        expect(savedTransactions[0]!.createdAt).not.toBeNull()
        expect(savedTransactions[0]!.id).not.toBeNull()
        expect(savedTransactions[0]!.quantity).toEqual(transaction.quantity)
        expect(savedTransactions[0]!.updatedAt).not.toBeNull()
        expect(savedTransactions[0]!.value).toBe(1)
        expect(savedTransactions[0]!.assetId).toEqual(transaction.assetId)
      })
    })
  })
  describe("getTransaction", () => {
    describe("when transaction exists", () => {
      it("returns the found transaction", async () => {
        const newTransaction = {
          userId: "andreas",
          quantity: 1,
          value: 1.0,
          executedAt: new Time(2020, 1, 1).unix(),
          assetId: "prfl",
        }
        await prisma.transaction.create({ data: newTransaction })
        const tx = await prisma.transaction.findFirst({
          where: { userId: newTransaction.userId },
        })
        expect(tx).not.toBeNull()
        const savedTransaction = await db.getTransaction(tx!.id)
        expect(savedTransaction).not.toBeNull()
        expect(savedTransaction!.createdAt).not.toBeNull()
        expect(savedTransaction!.id).not.toBeNull()
        expect(savedTransaction!.quantity).toEqual(newTransaction.quantity)
        expect(savedTransaction!.updatedAt).not.toBeNull()
        expect(savedTransaction!.value).toBe(newTransaction.value)
        expect(savedTransaction!.assetId).toEqual(newTransaction.assetId)
      })
    })
    describe("when transaction does not exist", () => {
      it("returns a miss and no error", async () => {
        const savedTransaction = await db.getTransaction("notexisting")
        expect(savedTransaction).toBeNull()
      })
    })
  })
  describe("getTransactions", () => {
    describe("when transactions exists", () => {
      it("returns the found transactions", async () => {
        const newTransaction = {
          userId: "andreas",
          quantity: 1,
          value: 1.0,
          executedAt: new Time(2020, 1, 1).unix(),
          assetId: "prfl",
        }
        await prisma.transaction.create({ data: newTransaction })
        const savedTransactions = await db.getTransactions(
          newTransaction.userId,
        )
        expect(savedTransactions.length).toBe(1)
        expect(savedTransactions[0]!.createdAt).not.toBeNull()
        expect(savedTransactions[0]!.id).not.toBeNull()
        expect(savedTransactions[0]!.quantity).toEqual(newTransaction.quantity)
        expect(savedTransactions[0]!.updatedAt).not.toBeNull()
        expect(savedTransactions[0]!.value).toBe(newTransaction.value)
        expect(savedTransactions[0]!.assetId).toEqual(newTransaction.assetId)
      })
    })
    describe("when transactions do not exist", () => {
      it("returns a miss and no error", async () => {
        const savedTransactions = await db.getTransactions("notexisting")
        expect(savedTransactions).toEqual([])
      })
    })
  })
})
