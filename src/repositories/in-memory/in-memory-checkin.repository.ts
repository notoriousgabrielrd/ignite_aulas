import { Checkin, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../prisma/checkin-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckinRepository implements CheckInsRepository {
    public items: Checkin[] = []

    async create(data: Prisma.CheckinUncheckedCreateInput) {
        const checkin = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            created_at: new Date(),
            validated_at: data.validated_at ? new Date(data.validated_at) : null
        }

        this.items.push(checkin)
        return checkin
    }
}