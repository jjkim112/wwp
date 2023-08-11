import { GameData } from "./UserGamesData.model";

export class Game {
  datas: GameData;
  readonly gameId: string; //토너먼트 아이디
  readonly pubId: string; //지점 아이디

  constructor(datas: GameData, gameId: string, pubId: string) {
    this.datas = datas;
    this.gameId = gameId;
    this.pubId = pubId;
  }

  get toMap() {
    return {
      datas: this.datas.toMap,
      gameId: this.gameId,
      pubId: this.pubId,
    };
  }

  static fromData(data: any): Game {
    try {
      const datas = data["datas"];
      const gameId = data["gameId"];
      const pubId = data["pubId"];

      return new Game(datas, gameId, pubId);
    } catch (error) {
      var errorGameData = new GameData(new Date(0), 0, "", 0, 0);
      console.log(`[UserGames Model] fromData e: ${error}`);
      return new Game(errorGameData, "", "");
    }
  }
}

export interface GamePlayerThumb {
  id: string;
  prize: number;
  rank: number;
}
