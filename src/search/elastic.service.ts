import { Injectable } from "@nestjs/common";
import { SearchStrategy } from "./strategy.interface";

@Injectable()
export class ElastService implements SearchStrategy {

  search(text: string): Promise<any[]> {
    throw new Error("Method not implemented.");
  }

  index(text: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}