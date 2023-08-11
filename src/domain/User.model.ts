import { Game } from "./UserGames.model";

export class User {
  readonly id: string;
  nickname: string;
  games: Game[];

  constructor(id: string, nickname: string, games: Game[]) {
    this.id = id;
    this.nickname = nickname;
    this.games = games;
  }

  get toMap() {
    return {
      id: this.id,
      nickname: this.nickname,
      games: this.games.map((v) => v.toMap),
    };
  }

  static fromData(data: any): User {
    try {
      const id: string = data["id"];
      const nickname: string = data["nickname"];
      const games: Game[] = (data["games"] as Game[]).map((v, _) => {
        return Game.fromData(v);
      });

      return new User(id, nickname, games);
    } catch (error) {
      console.log(`[User Model] fromData e: ${error}`);
      return new User("", "", []);
    }
  }
}
