namespace LNF {
  export namespace Components {
    export class TrainingsPlaner {

      private getFormData () {
        const age = +$('#inputAge').val()
        const gender = +$('#inputGender').val()
        const size = +$('#inputSize').val()
        const weight = +$('#inputWeight').val()
        const bodyfat = +$('#inputBodyFat').val()
        const work = +$('#inputWork').val()
        const activity = +$('#inputActivity').val()
        const experience = +$('#inputExperience').val()
        const regeneration = +$('#inputRegeneration').val()
        const time = +$('#inputTime').val()

        return new LNF.Model.Training(
          age, gender, size, weight,
          bodyfat, work, activity,
          experience, regeneration, time
        )
      }

      private showError(){
        $('#js-lnf-app-trainingsplaner-error').show();
      }

      private evaluate(form: LNF.Model.Training) {
        let doCardio = false
        let showTimeMessage = false
        let restDays = 0

        // AGE
        if(form.age >= 30 && form.age < 40) {
          restDays += 1
        } else if(form.age > 40) {
          restDays += 2
        }

        //BODYFAT - WORK - ACTIVITY WOMEN
        if(form.gender == 0) {
          doCardio = form.bodyfat > 20
          if(form.work == 1 || form.work == 2) {
            restDays += 1
          }
          if(form.activity == 1 || form.activity == 2) {
            restDays += 1
          }
        //BODYFAT - WORK - ACTIVTY MEN
        } else {
          doCardio = form.bodyfat > 15
          if(form.work == 2) {
            restDays += 1
          }
          if(form.activity == 2) {
            restDays += 1
          }
          if(form.work == 1 && form.work == 1){
            restDays += 1
          }
        }

        // EXPERIENCE
        if(form.experience > 10) {
          restDays +=1
        }

        // REGENERATION
        if(form.regeneration == 1){
          restDays += 1
        } else if(form.regeneration == 2){
          restDays += 2
        }

        //TIME
        showTimeMessage = (7 - restDays > form.time)
        return new LNF.Model.TrainingResult(restDays, doCardio, showTimeMessage)
      }

      public init () {
        $('#js-lnf-app-trainingsplaner-error button').click(() => {
          $('#js-lnf-app-trainingsplaner-error').hide()
        })
      }

      public run () {
        const $container = $('#js-lnf-app-trainingsplaner-result')[0];
        const form = this.getFormData()

        if(form.isValid()){
          const result = this.evaluate(form)
          console.log(result)
        } else {
          this.showError()
        }

        const result = `<div>
                          Result goes here...
                        </div>`

      }
    }

  }

}
