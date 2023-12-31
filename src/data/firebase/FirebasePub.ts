import { Firestore, QueryDocumentSnapshot } from "firebase/firestore";
import { Pub } from "../../domain/Pub.model";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Game, GamePlayerThumb } from "../../domain/Game.model";

export class FirebasePub {
  static getWholePubData = async (): Promise<Pub[]> => {
    const firestore = firebase.firestore();
    const pubCol = firestore.collection("wwp_pubs");
    const pubDocsData = await pubCol.get();

    let tempList: Pub[] = [];

    for (var oneDoc of pubDocsData.docs) {
      tempList.push(Pub.fromData(oneDoc.data()));
    }

    return tempList;
  };

  static getWholeGamesData = async (pubId: string): Promise<Game[]> => {
    const firestore = firebase.firestore();
    const pubGameCol = firestore
      .collection("wwp_pubs")
      .doc(pubId)
      .collection("games");
    const gameDocsData = await pubGameCol.get();

    let tempList: Game[] = [];

    for (var oneDoc of gameDocsData.docs) {
      tempList.push(Game.fromData(oneDoc.data()));
    }

    return tempList;
  };

  static addNewPub = async (
    newPubId: string,
    inputData: any
  ): Promise<boolean> => {
    try {
      const firestore = firebase.firestore();
      const newPubDoc = firestore.collection("wwp_pubs").doc(newPubId);
      const newPubDocData = await newPubDoc.get();
      if (!newPubDocData.exists) {
        await newPubDoc.set(inputData);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(`[FirebasePub] addNewPub e: ${error}`);
      return false;
    }
  };

  static addNewGame = async (
    pubId: string,
    newId: string,
    inputData: any
  ): Promise<boolean> => {
    try {
      const firestore = firebase.firestore();
      const newGameDoc = firestore
        .collection("wwp_pubs")
        .doc(pubId)
        .collection("games")
        .doc(newId);
      const newGameDocData = await newGameDoc.get();
      if (!newGameDocData.exists) {
        await newGameDoc.set(inputData);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(`[FirebasePub] addNewGame e: ${error}`);
      return false;
    }
  };

  static updatePub = async (
    pubId: string,
    updateData: any
  ): Promise<boolean> => {
    try {
      const firestore = firebase.firestore();
      const updatePubDoc = firestore.collection("wwp_pubs").doc(pubId);
      const updatePubDocData = await updatePubDoc.get();
      if (updatePubDocData.exists) {
        await updatePubDoc.update(updateData);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(`[FirebasePub] updatePub e: ${error}`);
      return false;
    }
  };
}
