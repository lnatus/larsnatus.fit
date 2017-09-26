namespace LNF {
  export namespace Model {
    export class TrainingResult {
      public restDays: number
      public trainDays: number
      public doCardio: boolean
      public showTimeMessage: boolean


      constructor(restDays: number, doCardio: boolean, showTimeMessage: boolean) {
        this.restDays = restDays
        this.trainDays = 7 - restDays
        this.doCardio = doCardio
        this.showTimeMessage = showTimeMessage
      }
    }
  }
}
