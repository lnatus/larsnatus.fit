namespace LNF {
  export namespace Components {
    export class NutritionPlaner {

      private getFormData () : LNF.Model.Nutrition {
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

      private showError() {
        $('#js-lnf-app-nutritionplaner-error').show()
      }

      private getResultTemplate(nutrition: LNF.Model.Nutrition) : string  {
        let targetCalories
        let targetLabel
        let targetNutritionPlan
        let targetHabits = ''
        let targetDisciplin = ''

        switch(nutrition.target){
          case 0:
            targetCalories = nutrition.totalCalories
            targetLabel = "Wohlbefinden verbessern"
            targetNutritionPlan = "A1 oder A2"
            break
          case 1:
            targetLabel = "Muskel- und Kraftaufbau"
            targetCalories = nutrition.bulkCalories
            targetNutritionPlan = "B1 oder B2"
            break
          case 2:
            targetLabel = "Fettreduktion (Abnehmen)"
            targetCalories = nutrition.diatCalories
            targetNutritionPlan = "C1 oder C2"
        }

        switch(nutrition.habits) {
          case 1:
            targetHabits = "Schaue Dir hierbei auch das spezielle Kapitel für Vegetaria an."
            break
          case 2:
            targetHabits = "Schaue Dir hierbei auch das spezielle Kapitel für Veganer an."
            break
          case 3:
            targetHabits = "Schaue Dir hierbei auch das spezielle Kapitel bezüglich Nahrungsunverträglichkeiten an."
            break
        }

        if(nutrition.disciplin == 0 || nutrition.disciplin == 1){
          targetDisciplin = `<h2 class="lnf-branding">Motivation und Disziplin</h2>
                             <p>Da es Dir schwer fallen kann, die nötige Disziplin für eine Ernährungsumstellung an den Tag zu legen,
                             solltest du Dir unbedingt das Kapitel <strong>Motivation und Disziplin</strong> im Ernährungshandbuch anschauen.  </p>`
        }

        return `<div class="lnf-app-trainingsplaner-result">
                  <h2 class="lnf-branding">Kalorien</h2>
                  <p>Dein Grundumsatz liegt aktuell bei <strong>${nutrition.baseMetabolism} kcal/Tag.</strong></p>
                  <p>Die Gesamtkalorien liegen bei deinem aktuellen Aktivitätslevel bei <strong>${nutrition.totalCalories} kcal/Tag</strong></p>
                  <h2 class="lnf-branding">${targetLabel}</h2>
                  <p>
                    Für Deine Zielsetzung <strong>${targetLabel}</strong>, solltest du aktuell <strong>${targetCalories} kcal/Tag</strong> zu dir nehmen.
                    Ideal geeignet wären für dich die Ernährungspläne <strong>${targetNutritionPlan}</strong> aus dem Ernährungshandbuch.
                    ${targetHabits}
                  </p>
                  ${targetDisciplin}
                  <a class="btn btn-lnf" href="app-nutritionplaner.html">Erneut Starten</a>
                </div>`
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

        if(form.isValid()){
          var template = this.getResultTemplate(form)
          $resultContainer.innerHTML = template
          $adContainer.show()
          $formContainer.hide()
          $("html, body").animate({ scrollTop: 0 }, "slow");
        } else {
          this.showError()
        }
      }
    }
  }
}
