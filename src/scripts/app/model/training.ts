namespace LNF {
  export namespace Model {
    export class Training {
      public age: number

      /* 0 = Female; 1 = Male */
      public gender: number
      public size: number
      public weight: number
      public bodyfat: number

      /* 0 = Light; 1 = Moderat; 2 Strong;  */
      public work: number

      /* 0 = Light; 1 = Moderat; 2 Strong;  */
      public activity: number
      public experience: number

      /* 0 = Good; 1 = Moderat; 2 Bad;  */
      public regeneration: number
      public time: number

      constructor(age: number, gender: number,
        size: number, weight: number, bodyfat: number,
        work:number, activity: number, experience: number,
        regeneration: number, time: number) {
          this.age = age
          this.gender = gender
          this.size = size
          this.weight = weight
          this.bodyfat = bodyfat
          this.work = work
          this.activity = activity
          this.experience = experience
          this.regeneration = regeneration
          this.time = time
      }

      public isValid() : boolean {
        return this.gender >= 0 &&
               this.size > 0  &&
               this.weight > 0 &&
               this.bodyfat > 0 &&
               this.work >= 0 &&
               this.activity >= 0 &&
               this.experience >= 0 &&
               this.regeneration >= 0 &&
               this.time >= 0 && this.time <=7
      }
    }
  }
}
