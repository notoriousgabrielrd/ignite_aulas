import { Checkin, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../prisma/checkin-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckinRepository implements CheckInsRepository {
    public items: Checkin[] = []

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfDay = dayjs(date).startOf('date')
        const endOfDay = dayjs(date).endOf('date')

        const checkinOnSameDate = this.items.find(checkIn => {
            const checkinDate = dayjs(checkIn.created_at)
            const isOnSameDate = checkinDate.isAfter(startOfDay) && checkinDate.isBefore(endOfDay)

            return checkIn.user_id === userId && isOnSameDate
        })

        if (!checkinOnSameDate) return null

        return checkinOnSameDate
    }

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