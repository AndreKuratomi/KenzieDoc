import { getCustomRepository } from "typeorm";
import { BuysRepository } from "../../repositories/buys.repository";

export class ListBuysService {
  async execute() {
    const buysRepository = getCustomRepository(BuysRepository);

    const buysList = await buysRepository.find();

    return buysList;
  }
}
