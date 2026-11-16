import { makeAutoObservable } from "mobx";

export class NewToDoState {
  private _name: string = ``;

  constructor() {
    makeAutoObservable(this);
  }

  get name() {
    return this._name;
  }

  changeName({ newName }: { newName: string }) {
    this._name = newName;
  }
}
