import { getCustomRepository } from "typeorm";
import { BuysRepository } from "../../repositories/buys.repository";

export class BuyByIdService {
  async execute(id: string) {
    const buysRepository = getCustomRepository(BuysRepository);

    const buy = await buysRepository.findOne(id);

    console.log(buy);

    if (!buy) {
      throw new Error("This buy does not exist");
    }

    return buy;
  }
}
