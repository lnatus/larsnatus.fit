namespace LNF {
  export namespace Model {
    export class TrainingResult {
      public restDays: number
      public trainDays: number
      public doCardio: boolean
      public time: number

      public isBusy() : boolean {
        return (7 - this.restDays > this.time)
      }

      constructor(restDays: number, doCardio: boolean, time: number) {
        this.restDays = restDays
        this.trainDays = 7 - restDays
        this.doCardio = doCardio
        this.time = time
      }
    }
  }
}
