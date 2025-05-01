import { prisma } from '../prisma/client';

export class HistoryService {
  static async createHistory(data: {
    patientId: number;
    diagnosis: string;
    treatment: string;
    doctorNotes: string;
    symptoms: string;
  }) {
    return prisma.history.create({ data });
  }

  static async getHistories(patientId: number) {
    return prisma.history.findMany({ where: { patientId } });
  }

  static async getOne(patientId: number, id: number) {
    return prisma.history.findFirst({
      where: { id, patientId },
    });
  }

  static async updateHistory(patientId: number, id: number, data: any) {
    return prisma.history.updateMany({
      where: { id, patientId },
      data,
    });
  }

  static async deleteHistory(patientId: number, id: number) {
    return prisma.history.deleteMany({
      where: { id, patientId },
    });
  }
}
