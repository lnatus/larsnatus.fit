namespace LNF {
  export namespace Components {
    export class NutritionPlaner {

      private getFormData () {
        const age = +$('#inputAge').val()
        const gender = +$('#inputGender').val()
        const size = +$('#inputSize').val()
        const weight = +$('#inputWeight').val()
        const activity = +$('#inputActivity').val()
        const habits = +$('#inputHabits').val()
        const target = +$('#inputTarget').val()
        const disciplin = +$('#inputDisciplin').val()

        return new LNF.Model.Nutrition(
          age, gender, size, weight,
          activity, habits, target, disciplin
        )
      }

      public init () {
        $('#js-lnf-app-nutritionplaner-error button').click(() => {
          $('#js-lnf-app-nutritionplaner-error').hide()
        })
      }

      public run() {
        const $resultContainer = $('#js-lnf-app-nutritionplaner-result')[0];
        const $adContainer =  $('#js-lnf-nutritionplaner-book')
        const $formContainer = $('#js-lnf-app-nutritionplaner-form')

        const form = this.getFormData()

        console.log(form)

        if(form.isValid()){
          //TODO
        }
      }
    }
  }
}
