namespace LNF {
  export namespace Model {
    export class Nutrition {
      public age: number

      /* 0 = Female; 1 = Male */
      public gender: number
      public size: number
      public weight: number

      /* 0 = Light; 1 = Moderat; 2 Strong;  */
      public activity: number

      /* 0 = All; 1 = Vegetarian; 2 Vegan; 3 Other  */
      public habits: number

      /* 0 = Health; 1 = Muscle; 2 Diat;  */
      public target: number

      /* 0 = Bad; 1 = Light; 2 Moderat; 3 Good  */
      public disciplin: number

      constructor(age: number, gender: number,
        size: number, weight: number, activity: number, habits: number,
        target: number, disciplin: number) {
          this.age = age
          this.gender = gender
          this.size = size
          this.weight = weight
          this.activity = activity
          this.habits = habits
          this.target = target
          this.disciplin = disciplin
      }

      public isValid() : boolean {
        return this.gender >= 0 &&
               this.size > 0  &&
               this.weight > 0 &&
               this.activity >= 0 &&
               this.habits >= 0 &&
               this.target >= 0 &&
               this.disciplin >= 0
      }
    }
  }
}
