namespace LNF {
  export namespace Components {
    export class TrainingsPlaner {

      private mapping = [
        { bests: [], goods: []},
        { bests: ['Ganzkörperplan A'], goods: []},
        { bests: ['Ganzkörperplan B','Oberkörper-Unterkörperplan A'], goods: ['Ganzkörperplan A', 'Oberkörper-Unterkörperplan B']},
        { bests: ['Push Pull Beine A', 'Push Pull Beine B','3er Split'], goods:['Ganzkörperplan A', 'Ganzkörperplan B']},
        { bests: ['Oberkörper-Unterkörperplan B', '4er Split'], goods: ['Ganzkörperplan B', 'Oberkörper-Unterkörperplan A']},
        { bests: ['Oberkörper-Unterkörperplan B', '5er Split'], goods: []},
        { bests: ['Push Pull Beine B', '6er Split'], goods: ['Push Pull Beine A']}
      ]

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

      private getResultTemplate(result: LNF.Model.TrainingResult) : string {
        let tp = this.mapping[result.trainDays];

        let bestsTemplate = ''
        let goodsTemplate = ''

        for(let best of tp.bests) {
          bestsTemplate += `<li><i class="fa fa-check"></i><span>${best}</span></li>`
        }

        if(tp.goods.length){
          goodsTemplate += `<h3>Alternativen</h3>
          <p>Diese Pläne kämen als Alternative auch in Frage:</p>
          <ul class="lnf-app-trainingsplaner-goods">`
            for(let good of tp.goods) {
              goodsTemplate += `<li><i class="fa fa-bullseye"></i><span>${good}</span></li>`
            }
          goodsTemplate += `</ul>`
        }

        return `<div class="lnf-app-trainingsplaner-result">
                  <h3>Top Pläne</h3>
                  <p>Folgende Trainingspläne aus meinem Trainingshandbuch wären für Dich ideal geeignet:</p>
                  <ul class="lnf-app-trainingsplaner-bests">
                    ${bestsTemplate}
                  </ul>
                  ${goodsTemplate}
                </div>`
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
          const template = this.getResultTemplate(result)
          $container.innerHTML = template
          $('#js-lnf-trainingsplaner-book').show()
          $('#js-lnf-app-trainingsplaner-form').hide()
        } else {
          this.showError()
        }
      }
    }

  }

}
